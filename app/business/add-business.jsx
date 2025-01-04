import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/Colors";
import BlInput from "../../components/Custom/BlInput";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useUser } from "@clerk/clerk-expo";
import Picker from "@ouroboros/react-native-picker";


export default function AddBusiness({ edit, data }) {
  const inputs = {
    name: edit ? data?.name : "",
    address: edit ? data?.address : "",
    contact: edit ? data?.contact : "",
    website: edit ? data?.website : "",
    about: edit ? data?.about : "",
    category: edit ? data?.category : "Category",
    image: edit ? data?.imageUrl : null,
  };

  const { user } = useUser();
  const router = useRouter();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState(inputs.name);
  const [address, setAddress] = useState(inputs.address);
  const [contact, setContact] = useState(inputs.contact);
  const [website, SetWebsite] = useState(inputs.website);
  const [about, setAbout] = useState(inputs.about);
  const [category, setCategory] = useState(inputs.category);
  const [loading, setLoading] = useState(false);

  const getCategoryList = async () => {
    try {
      setCategoryList([]);
      const q = query(collection(db, "Category"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCategoryList((prev) => [
          ...prev,
          {
            id: doc.id,
            value: doc.data().name,
            text: doc.data().name,
          },
        ]);
      });
    } catch (error) {
      console.log("Error in get category list", error);
    }
  };

  const uploadImage = async () => {
    try {
      if (image) {
        const formData = new FormData();
        const file = {
          uri: image.uri,
          type: image.mimeType,
          name: image.fileName,
        };

        formData.append("file", file);
        formData.append("upload_preset", "Business-listing");
        formData.append("cloud_name", "deh1dtd2k");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/deh1dtd2k/image/upload",
          {
            method: "post",
            body: formData,
          }
        );
        const uploadedImage = await res.json();
        return uploadedImage.secure_url;
      }
    } catch (error) {
      console.log("Error in Upload image", error);
    }
    return data?.imageUrl || null;
  };

  const onAddNewBusiness = async (uploadedImageUrl) => {
    try {
      const resp = await setDoc(doc(db, "Business", Date.now().toString()), {
        name: name,
        address: address,
        contact: contact,
        about: about,
        website: website,
        category: category,
        imageUrl: uploadedImageUrl,
        username: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
      });
      router.back();
      ToastAndroid.show("New Business Added", ToastAndroid.TOP);
    } catch (error) {
      console.log("Error in add business", error);
    }
  };

  const onEditBusiness = async (uploadedImageUrl) => {
    try {
      const docRef = doc(db, "Business", data.id);
      const updateData = setDoc(docRef, {
        name: name,
        address: address,
        contact: contact,
        about: about,
        website: website,
        category: category,
        imageUrl: uploadedImageUrl,
        username: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
      });

      router.back();
      ToastAndroid.show("Business Edited", ToastAndroid.TOP);
    } catch (error) {
      console.log("Error in Edit business", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const uploadedImageUrl = await uploadImage();
      if (edit) {
        await onEditBusiness(uploadedImageUrl);
      } else {
        await onAddNewBusiness(uploadedImageUrl);
      }
    } catch (error) {
      console.log("Erro in add or edit Business", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    !edit &&
      navigation.setOptions({
        headerTitle: "Add Business",
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
      });
    getCategoryList();
  }, []);

  const onImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets?.[0]);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>
        {edit ? "Edit your business" : "Create new busines"}
      </Text>
      <Text style={{ fontSize: 12, fontFamily: "outfit", color: Colors.gray }}>
        {!edit && "Fill the all details in order to create new business"}
      </Text>
      {!image && !edit ? (
        <TouchableOpacity onPress={onImagePicker}>
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={{ width: 100, height: 100, marginTop: 40 }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onImagePicker}>
          <Image
            source={{ uri: edit ? data?.imageUrl : image?.uri }}
            style={{ width: 100, height: 100, marginTop: 40, borderRadius: 15 }}
          />
        </TouchableOpacity>
      )}

      <View>
        <BlInput
          placeholder={"Name"}
          value={name}
          onchange={(value) => setName(value)}
        />
        <BlInput
          placeholder={"Address"}
          value={address}
          onchange={(value) => setAddress(value)}
        />
        <BlInput
          placeholder={"Contact"}
          value={contact}
          onchange={(value) => setContact(value)}
        />
        <BlInput
          placeholder={"Website"}
          value={website}
          onchange={(value) => SetWebsite(value)}
        />
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#fff",
            borderColor: Colors.gray,
            marginTop: 10,
          }}
        >
          <Picker
            onChanged={(value) => setCategory(value)}
            options={[
              { value: "", text: "Category" }, 
              ...categoryList, 
            ]}
            style={{
              borderWidth: 1,
              borderColor: "#a7a7a7",
              borderRadius: 5,
              padding: 10,
              backgroundColor: "#fff",
            }}
            textAlign="left"
            value={category}
            component={() => (
              <Text style={{ color: category ? "#000" : "#a7a7a7", padding: 6 }}>
                {category}
              </Text>
            )}
          />
        </View>

        <BlInput
          placeholder={"About"}
          value={about}
          onchange={(value) => setAbout(value)}
          height={100}
          multiline
          numberOfLines={4}
        />
        {loading ? (
          <ActivityIndicator
            color={Colors.Primary}
            style={{ marginTop: 30 }}
            size={"large"}
          />
        ) : (
          <TouchableOpacity
            disabled={loading}
            onPress={() => handleSubmit()}
            style={{
              backgroundColor: Colors.Primary,
              padding: 10,
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontFamily: "outfit-medium",
              }}
            >
              {edit ? "Edit Business" : "Create New Business"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

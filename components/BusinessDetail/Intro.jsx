import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useUser } from "@clerk/clerk-expo";
import AddBusiness from "../../app/business/add-business";

export default function Intro({ data }) {
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const { user } = useUser();

  const deleteBusiness = async () => {
    await deleteDoc(doc(db, "Business", data?.id));
    router.back();
    ToastAndroid.show("Business Deleted", ToastAndroid.LONG);
  };

  const onDelete = () => {
    Alert.alert(
      "Do you want to delete it?",
      "If you click on the delete button, it will be permanently deleted.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: deleteBusiness },
      ]
    );
  };
  
  // console.log(data);
  
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        {user?.primaryEmailAddress?.emailAddress === data?.userEmail && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="edit" size={38} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <Image
        source={{ uri: data?.imageUrl }}
        style={{ width: "100%", height: 340 }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          marginTop: -20,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: "#fff",
        }}
      >
        <View>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
            {data?.name || "Business Name"}
          </Text>
          <Text
            style={{ fontFamily: "outfit", fontSize: 12, color: Colors.gray }}
          >
            {data?.address || "Business Address"}
          </Text>
        </View>
        {user?.primaryEmailAddress?.emailAddress === data?.userEmail && (
          <TouchableOpacity onPress={onDelete}>
            <Ionicons name="trash" size={24} color={Colors.Primary} />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          <AddBusiness edit={true} data={data} />
        </View>
      </Modal>
    </View>
  );
}

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useUser } from "@clerk/clerk-expo";

export default function Review({ data }) {
  const [rating, setRating] = useState(0);
  const [input, setInput] = useState("");

  const { user } = useUser();

  const onSubmit = async (value) => {
    const docRef = doc(db, "Business", data.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: input,
        username: user?.fullName,
        userImage: user?.imageUrl,
        email: user?.primaryEmailAddress?.emailAddress,
      }),
    });

    ToastAndroid.show("Comment Added", ToastAndroid.TOP);
  };

  return (
    <View style={{ padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 18 }}>Review</Text>
      <View>
        <Rating
          imageSize={20}
          count={7}
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          value={input}
          onChangeText={(value) => setInput(value)}
          numberOfLines={4}
          placeholder="Write Your Review"
          style={{
            borderWidth: 1,
            borderRadius: 10,
            textAlignVertical: "top",
            colorL: Colors.gray,
            padding: 10,
          }}
        />
        <TouchableOpacity
          disabled={!input}
          onPress={() => onSubmit(input)}
          style={{
            backgroundColor: Colors.Primary,
            padding: 10,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{ textAlign: "center", fontFamily: "outfit", color: "#fff" }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {data.reviews &&
          data?.reviews?.map((review, index) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                padding: 10,
                borderColor: Colors.gray,
                borderWidth: 1,
                borderRadius: 15,
                marginTop: 10,
              }}
              key={index}
            >
              <Image
                source={{ uri: review.userImage }}
                style={{ width: 50, height: 50, borderRadius: 99 }}
              />
              <View style={{ display: "flex", gap: 5 }}>
                <Text style={{ fontFamily: "outfit-medium", fontSize: 14 }}>
                  {review.username}
                </Text>
                <Rating
                  imageSize={20}
                  startingValue={review.rating}
                  readonly
                  style={{ alignItems: "flex-start" }}
                />
                <Text
                  style={{
                    fontFamily: "outfit",
                    fontSize: 12,
                  }}
                >
                  {review.comment}
                </Text>
              </View>
            </View>
          ))}
      </View>
    </View>
  );
}

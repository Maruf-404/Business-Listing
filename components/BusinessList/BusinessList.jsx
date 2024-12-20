import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";


export default function BusinessList({ data }) {

  const router = useRouter()


  return (
    <TouchableOpacity
      style={{
        margin: 10,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}

      onPress={() => router.push("/businessdetail/" + data.id)}
    >
      <Image
        source={{ uri: data.imageUrl }}
        width={120}
        height={120}
        borderRadius={15}
      />
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 16 }}>
          {data.name}
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 12, color: Colors.gray }}
        >
          {data.address}
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          <Image
            source={require("../../assets/images/star.png")}
            style={{ width: 15, height: 15 }}
          />
          <Text style={{ fontSize: 12, fontFamily: "outfit" }}>4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

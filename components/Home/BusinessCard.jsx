import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessCard({ data }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + data.id)}
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: data.imageUrl }}
        width={220}
        height={130}
        borderRadius={15}
      />
      <View style={{ marginTop: 5, gap: 5 }}>
        <Text style={{ fontSize: 14, fontFamily: "outfit-bold" }}>
          {data.name}
        </Text>
        <Text style={{ fontSize: 9, fontFamily: "outfit", color: Colors.gray }}>
          {data.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Image
              source={require("../../assets/images/star.png")}
              style={{ width: 15, height: 15 }}
            />
            <Text style={{ fontSize: 12, fontFamily: "outfit" }}>4.5</Text>
          </View>
          <Text
            style={{
              fontFamily: "outfit",
              backgroundColor: Colors.Primary,
              padding: 3,
              borderRadius: 5,
              color: "#fff",
              fontSize: 10,
            }}
          >
            {data.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

import { View, Text } from "react-native";
import React from "react";

export default function About({ data }) {
  return (
    <View style={{ padding: 20, backgroundColor: "#fff",  }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 18 }}>About</Text>
      <Text style={{ fontFamily: "outfit", lineHeight: 25 }}>
        {data?.about}
      </Text>
    </View>
  );
}

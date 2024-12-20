import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function CategoryItem({ data, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(data)}>
      <View
        style={{
          padding: 12,
          marginLeft: 10,
          borderRadius: 99,
          backgroundColor: Colors.iconBg,
        }}
      >
        <Image source={{ uri: data.icon }} style={{ width: 40, height: 40 }} />
      </View>
      <Text style={{ fontSize: 12, fontFamily: "outfit", textAlign: "center" }}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );
}

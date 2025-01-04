import { View, Text, Image } from 'react-native'
import React from 'react'

export default function UserIntro({data}) {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: data?.imageUrl }}
        style={{ width: 100, height: 100, borderRadius: 99 }}
      />
      <Text style={{ fontSize: 16, fontFamily: "outfit-bold" }}>
        {data.fullName}
      </Text>
      <Text style={{ fontSize: 12, fontFamily: "outfit" }}>
        {data?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
}
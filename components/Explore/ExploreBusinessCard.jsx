import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function ExploreBusinessCard({data}) {

    const router = useRouter()

  return (
    <TouchableOpacity
    onPress={() => router.push("/businessdetail/"+ data.id)}
      style={{
        backgroundColor: "#fff",
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        marginTop: 15,
      }}
    >
      <Image
        source={{ uri: data?.imageUrl }}
        style={{
          width: "100%",
          height: 180,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15
        }}
      />
      <View style={{padding: 10}} >
        <Text style={{ fontSize: 18, fontFamily: "outfit-bold" }}>
          {data?.name}
        </Text>
        <Text style={{ fontFamily: "outfit", color: Colors.gray }}>
          {data?.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
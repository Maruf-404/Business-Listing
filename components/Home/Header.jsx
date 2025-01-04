import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import Feather from "@expo/vector-icons/Feather";

const home = () => {
  const { user } = useUser();

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 10,
        color: "#fff",
        backgroundColor: Colors.Primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around"
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ height: 45, width: 45, borderRadius: 99 }}
        />
        <View>
          <Text>Welcome to,</Text>
          <Text style={{ fontSize: 19, fontFamily: "outfit-medium" }}>
            {user.fullName}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Image
            source={require("../../assets/images/applogo.png")}
            style={{ width: 140, height: 110, objectFit: "contain" }}
          />
        </View>
      </View>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function ProfileMenu() {
  const router = useRouter();
  const { signOut } = useAuth();
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("../../assets/images/add.png"),
      path: "/business/add-business",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("../../assets/images/business-and-trade.png"),
      path: "/business/my-business",
    },
    {
      id: 3,
      name: "Share",
      icon: require("../../assets/images/share_1.png"),
      path: "share",
    },
    {
      id: 1,
      name: "Logout",
      icon: require("../../assets/images/logout.png"),
      path: "logout",
    },
  ];

  const onMenuClick = (item) => {
    if (item.path == "logout") {
      signOut();
      return;
    }
    if (item.path == "share") {
      Share.share({
        message: "Download the business listing app developed by maruf khan",
      });
      return;
    }

    router.push(item.path);
  };

  return (
    <View style={{ marginTop: 50 }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              margin: 10,
              borderRadius: 15,
              backgroundColor: "#fff",
              gap: 10,
              borderWidth: 1,
              borderColor: Colors.Primary,
              flex: 1,
            }}
          >
            <Image source={item?.icon} style={{ width: 50, height: 50 }} />
            <Text style={{ fontSize: 16, fontFamily: "outfit", flex: 1 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

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
      <Text
        style={{
          fontFamily: "outfit-medium",
          marginTop: 15,
          Color: Colors.gray,
          textAlign: "center",
        }}
      >
        Developed By Maruf @ 2024
      </Text>
    </View>
  );
}

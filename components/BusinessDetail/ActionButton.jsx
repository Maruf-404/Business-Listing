import {
  View,
  Text,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
  VirtualizedList,
  Share,
} from "react-native";
import React from "react";

export default function ActionButton({ data }) {
  const getItem = () => actionButtonMenu;
  const getItemCount = () => actionButtonMenu.length;

  const actionButtonMenu = [
    {
      id: 1,
      name: "Phone",
      icon: require("../../assets/images/call.png"),
      url: "tel:" + data?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("../../assets/images/pin.png"),
      url: "https://www.google.com/maps/search/?api=1&query=" + data?.address,
    },
    {
      id: 3,
      name: "Web",
      icon: require("../../assets/images/web.png"),
      url: data?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("../../assets/images/share.png"),
      url:
        data.name +
        "\n address:" +
        data.address +
        "\n Find more on business listing app developed by maruf",
    },
  ];

  const onPressHandler = (item) => {
    if (item.name == "Share") {
      Share.share({
        message: item?.url,
      });
    }
    Linking.openURL(item?.url);
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {actionButtonMenu?.map((item, index) => (
        <TouchableOpacity
          style={{}}
          onPress={() => onPressHandler(item)}
          key={index}
        >
          <Image source={item?.icon} style={{ width: 50, height: 50 }} />
          <Text
            style={{
              fontFamily: "outfit-medium",
              // textAlign: "center",
              marginTop: 3,
            }}
          >
            {item?.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

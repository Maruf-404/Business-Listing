import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import { query, collection, getDocs } from "firebase/firestore";
import { Colors } from "../../constants/Colors";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSliderList = async () => {
    try {
      setLoading(true);
      setSliderList([]);
      const q = query(collection(db, "Slider"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setSliderList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (error) {
      console.log("Error in slider", error);
    }
  };

  useEffect(() => {
    getSliderList();
  }, []);

  return (
    <View>
      <Text
        style={{
          paddingLeft: 20,
          fontSize: 20,
          fontFamily: "outfit-bold",
          paddingTop: 20,
          marginBottom: 5,
        }}
      >
        #Special for you
      </Text>

      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.Primary}
          style={{ marginTop: "10%" }}
        />
      ) : (
        <FlatList
          horizontal={true}
          data={sliderList}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 20 }}
          renderItem={({ item, index }) => (
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: 300,
                height: 160,
                marginRight: 15,
                borderRadius: 20,
              }}
            />
          )}
        />
      )}
    </View>
  );
}

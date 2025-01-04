import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { Colors } from "../../constants/Colors";
import BusinessCard from "./BusinessCard";
import { useRouter } from "expo-router";

export default function Business() {
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const getBusinessList = async () => {
    try {
      setLoading(true);
      setBusinessList([]);
      const q = query(collection(db, "Business"), limit(10));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
      setLoading(false);
    } catch (error) {
      console.log("Error in businssList", error);
    }
  };

  useEffect(() => {
    getBusinessList();
  }, []);

  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 15,
          flexDirection: "row",
          marginLeft: 20,
          marginRight: 15,
          fontFamily: "outfit",
        }}
      >
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 16, marginBottom: 10 }}
        >
          Popular Business
        </Text>
        <TouchableOpacity onPress={() => router.push("/explore")}>
          <Text style={{ fontFamily: "outfit", color: Colors.Primary }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color={Colors.Primary} size={"large"} />
      ) : (
        <FlatList
          data={businessList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <BusinessCard key={index} data={item} />
          )}
        />
      )}
    </View>
  );
}

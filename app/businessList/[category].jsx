import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { db } from "../../config/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import BusinessList from "../../components/BusinessList/BusinessList";
import { Colors } from "../../constants/Colors";

export default function BusinessListBycategory() {
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
      headerStyle: {
        backgroundColor: Colors.Primary,
      },
    });
    getBusinessList();
  }, [category]);

  const getBusinessList = async () => {
    try {
      setLoading(true);
      setBusinessList([]);
      const q = query(
        collection(db, "Business"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
      setLoading(false);
    } catch (error) {
      console.log("Error in get business list", error);
    }
  };

  return (
    <View>
      {businessList?.length > 0 && !loading ? (
        <FlatList
          data={businessList}
          onRefresh={getBusinessList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessList data={item} key={index} />
          )}
        />
      ) : loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.Primary}
          style={{ marginTop: "60%" }}
        />
      ) : (
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            color: Colors.gray,
            textAlign: "center",
            marginTop: "50%",
          }}
        >
          No Business Found
        </Text>
      )}
    </View>
  );
}

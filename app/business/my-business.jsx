import { View, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useUser } from "@clerk/clerk-expo";
import ExploreBusinessCard from "../../components/Explore/ExploreBusinessCard";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "expo-router";

export default function Mybusiness() {
  const [myBusinessList, setMyBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const navigation = useNavigation();

  const getMyBusiness = async () => {
    try {
      setLoading(true);
      setMyBusinessList([]);
      const q = query(
        collection(db, "Business"),
        where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setMyBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
      setLoading(false);
    } catch (error) {
      console.log("Error in get my business", error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Business",
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.Primary,
      },
    });
    user && getMyBusiness();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {loading ? (
        <ActivityIndicator
          color={Colors.Primary}
          size={"large"}
          style={{ marginTop: 30 }}
        />
      ) : (
        <FlatList
          onRefresh={getMyBusiness}
          refreshing={loading}
          data={myBusinessList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ExploreBusinessCard key={index} data={item} />
          )}
        />
      )}
    </View>
  );
}

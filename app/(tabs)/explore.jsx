import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/Firebase";
import ExploreBusinessCard from "../../components/Explore/ExploreBusinessCard";

const explore = () => {
  const [businesList, setBusinessList] = useState([]);
  const [allBusinesses, setAllBusinesses] = useState([]); // Store all businesses
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getBusinessByCategeory = async (category) => {
    try {
          setLoading(true);
          setBusinessList([]);
          const q = category
            ? query(
                collection(db, "Business"),
                where("category", "==", category)
              )
            : query(collection(db, "Business"));
          const querySnapshot = await getDocs(q);
          const businesses = [];
          querySnapshot.forEach((doc) =>
            businesses.push({ id: doc.id, ...doc.data() })
          );
          setBusinessList(businesses);
          if (!category) {
            setAllBusinesses(businesses);
          }
          setLoading(false);
    } catch (error) {
      console.log("Error in explore get business", error);
      
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());

    const searchData = allBusinesses.filter((business) => {
      const name = business.name.toLowerCase();
      const about = business.about?.toLowerCase() || "";
      const category = business.category.toLowerCase();

      return (
        name.includes(query) ||
        about.includes(query) ||
        category.includes(query)
      );
    });

    setBusinessList(searchData);
    setLoading(false);
  };

  useEffect(() => {
    getBusinessByCategeory();
  }, []);

  return (
    <ScrollView style={{ padding: 30 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        Explore More
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
          marginTop: 10,
          backgroundColor: "#fff",
          gap: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: Colors.Primary,
          padding: 5,
          marginBottom: 15,
        }}
      >
        <Feather name="search" size={24} color={Colors.Primary} />
        <TextInput
          autoComplete="off"
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(value) => handleSearch(value)}
          style={{ fontFamily: "outfit", fontSize: 16 }}
        />
      </View>
      <Category
        explore={true}
        onCategorySelect={(category) => getBusinessByCategeory(category)}
      />
      {!loading && businesList.length > 0 ? (
        businesList.map((business) => (
          <ExploreBusinessCard key={business.id} data={business} />
        ))
      ) : (
        <ActivityIndicator
          color={Colors.Primary}
          size={"large"}
          style={{ marginTop: 30 }}
        />
      )}

      <View style={{ height: 200 }}></View>
    </ScrollView>
  );
};

export default explore;

const styles = StyleSheet.create({});

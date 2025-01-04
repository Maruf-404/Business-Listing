import { View, Text, FlatList, ActivityIndicator, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { Colors } from "../../constants/Colors";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category({ explore = false, onCategorySelect }) {
  const [CategoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getCategory = async () => {
    try {
      setLoading(true);
      setCategoryList([]);
      const q = query(collection(db, "Category"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setCategoryList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (error) {
      console.log("Error in category", error);
    }
  };

  const onCtageoryPress = (item) => {
    if (explore) {
      onCategorySelect(item.name);
    } else {
      router.push(`/businessList/` + item.name);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <View>
      {!explore && (
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
            style={{
              fontFamily: "outfit-bold",
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Category
          </Text>
          <TouchableOpacity  onPress={() => router.push("/explore")} >
            <Text style={{ fontFamily: "outfit", color: Colors.Primary }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {loading ? (
        <ActivityIndicator
          color={Colors.Primary}
          size={"large"}
          style={{ marginTop: 30 }}
        />
      ) : (
        <FlatList
          data={CategoryList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginLeft: 10 }}
          renderItem={({ item, index }) => (
            <CategoryItem
              data={item}
              key={index}
              onCategoryPress={onCtageoryPress}
            />
          )}
        />
      )}
    </View>
  );
}

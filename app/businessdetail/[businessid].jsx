import { View, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { db } from "../../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Review from "../../components/BusinessDetail/Review";

export default function BusinesDetail() {
  const [businessDetail, setBusinessDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const { businessid } = useLocalSearchParams();

  useEffect(() => {
    getBusinessDetail();
  }, []);

  const getBusinessDetail = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "Business", businessid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBusinessDetail({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No Such Document");
      }
      setLoading(false);
    } catch (error) {
      console.log("Error in get business detail", error);
    }
  };

  return (
    <ScrollView nestedScrollEnabled={true}>
      {!businessDetail && loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.Primary}
          style={{ marginTop: "70%" }}
        />
      ) : (
        <View>
          <Intro data={businessDetail} />
          <ActionButton data={businessDetail} />
          <About data={businessDetail} />
          <Review data={businessDetail} />
        </View>
      )}
    </ScrollView>
  );
}

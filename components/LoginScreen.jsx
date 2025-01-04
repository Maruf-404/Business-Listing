import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

WebBrowser.maybeCompleteAuthSession()
export default function LoginScreen() {
    useWarmUpBrowser()
    
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
              await startOAuthFlow({
                redirectUrl: Linking.createURL("/dashboard", {
                  scheme: "businesslisting",
                }),
              });

            if (createdSessionId) {
                setActive({ session: createdSessionId })
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error('OAuth error', err)
        }
    }, [])

  return (
    <View>
      <View style={{ display: "flex", alignItems: "center", marginTop: 100 }}>
        <Image
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000"    
          }}
          source={require("../assets/images/login.jpeg")}
        />
      </View>
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your Ultimate{" "}
          <Text style={{ color: Colors.Primary }}>
            Community Business Directory
          </Text>
          App
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "outfit",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.gray,
          }}
        >
          Find your favorite business near you and post your on business to
          community
        </Text>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
         <Text style={{fontFamily: "outfit", color: "#fff", textAlign: "center"}}>Let's get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -30,
  },
  btn: {
    backgroundColor: Colors.Primary,
    padding: 15,
    borderRadius: 99,
    marginTop: 15,
  }
});

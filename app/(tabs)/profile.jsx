import { Text, View } from 'react-native'
import React from 'react'
import { useUser } from "@clerk/clerk-expo";
import UserIntro from '../../components/Profile/UserIntro';
import ProfileMenu from '../../components/Profile/ProfileMenu';

const profile = () => {
  const {user} = useUser()
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 30, fontFamily: "outfit-bold" }}>profile</Text>
       <UserIntro data={user} />
       <ProfileMenu data={user}/>
    </View>
  );
}

export default profile


import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../components/Home/Header"
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import Business from '../../components/Home/Business'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/Firebase'


const home = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)



  return (
    <ScrollView>
     <Header />
     <Slider/>
     <Category/>
     <Business/>
    </ScrollView>
  )
}

export default home

const styles = StyleSheet.create({})
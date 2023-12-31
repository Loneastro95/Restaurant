import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-paper';
import { doc, getDocs, collection, deleteDoc, updateDoc } from "firebase/firestore";

import { db } from "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const User = ({navigation}) => {

  const [profileInfo, setProfileInfo] = useState([])
  const handleProfileInfo = async () => {
    try {
      const authUser = getAuth().currentUser;
  
      if (authUser) {
        const querySnapshot = await getDocs(collection(db, "test" + authUser.email));
  
        const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setProfileInfo(newData);
      }
    } catch (error) {
      alert('error');
      console.error("Error fetching profileInfo: ", error);
    }
  };
  
  useEffect(() => {
    handleProfileInfo();
  }, []);

  useEffect(() => {
    console.log(profileInfo)
    if (profileInfo && profileInfo.length > 0) {
      console.log(profileInfo[0].Name);
    } else {
      console.log("Profile information not available");
    } // Log the updated profileInfo
  }, [profileInfo]);

  const d = new Date();
  const x = Math.floor(Math.random() * 9000) + 1000; 

  return (
    <View style={styles.container}>
      <View style={styles.thanks}>
        <ImageBackground>
        <Text style={{color: "#fff",alignSelf: "center", fontSize: 35 }}>Thank You</Text>
        </ImageBackground>
      </View>
      <View style={styles.top}>

        <Text style={styles.name}>Hey { profileInfo.length > 0 ? <View>{profileInfo[0].Name}</View>: <View></View>}</Text>
        <Text style={styles.name}>Your Order is Confirmed!</Text>
        <Text style={styles.name}>Ref No. : BB{x}</Text>
        <Text style={styles.name}>Date: {d.getDate()}:{d.getMonth() + 1}:{d.getFullYear()}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}> <Text style={styles.okay}>Okay</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  top: {
    width: '85%',
    height: 300,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'red',
  },
  food: {
    borderRadius: 150,
    width: 250,
    height: 250,
    marginLeft: 40,
  },
  main: {
    marginTop: 40
  },
  name: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 'normal',
    marginLeft: 30,
    marginTop: 20,
  },
  small: {
    flexDirection: 'row',
    marginLeft: 30,
    marginBottom: 20
  },
  smalltext: {
    color: ' red',
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 'normal',
    marginRight: 40,
  },
  price: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 600,
  },
  discription: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    marginLeft: 30,
    lineHeight: 18,
  },
  add: {
    backgroundColor: 'red',
    width: 80,
    height: 36,
    color: '#FFF',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginLeft: 200,
  },
  img: {
    width: 60,
    height: 60
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
    marginTop: 20
  },
  okay: {
    backgroundColor: "red",
    width: 80,
    height: 36,
    color: "#FFF",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 40,
    alignSelf: 'flex-end',
    
    marginTop: 85,
    paddingVertical: 5
  },
  thanks: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 100,
    justifyContent: "center",
    
  }
  
});

export default User;
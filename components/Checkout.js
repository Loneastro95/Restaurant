import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
} from "react-native";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebase";

const Checkout = () => {
//   const { cart, total, count } = route.params;
//   console.log(cart);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <ImageBackground
          source={require("../assets/healthy-organic-tofu-rice-buddha-bowl-with-veggies.jpg")}
          style={styles.backgroundImg}
        >
          <Text style={styles.menu}>CheckOut Info.</Text>
        </ImageBackground>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "start",
  },
  top: {
    width: "100%",
    height: 250,
    
  },
  backgroundImg: {
    width: 390,
    height: 210,
    textAlign: "center",
  },
  menu: {
    color: "white",
    fontFamily: "Inter",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: 'bold',
    lineHeight: "normal",
    marginTop: 90,
    alignSelf: 'center'
  },
  list: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 20,
    backgroundColor: "#fff",
    width: 300,
    height: 132,
    justifyContent: "space-between",
  },
  img: {
    width: 100,
    height: 130,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#000",
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "red",
  },
  cross: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 30,
    alignSelf: 'end',
    color: "red",
  },
  input: {
    backgroundColor: "white",
    height: 50,
    width: 250,
    paddingLeft: 10,
    borderRadius: 20,
    color: "#777",
    fontSize: 14,
    marginBottom: 10
  },
});

export default Checkout
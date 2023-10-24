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
import { addDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebase";

const Cart = ({ navigation, route }) => {
  const { cart, total, count } = route.params;
  console.log(cart);

  const [profile, setProfile] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");

  

  const checkOut = async () => {
    try {
      const authUser = getAuth().currentUser;
      if (authUser) {
        const docRef = await addDoc(collection(db, "Cart" + authUser.uid), {
          owner_uid: authUser.uid,
          Name: cart.Name,
          Price: total,
          Amount: count,
          Buyer: profile,
          Number: number,
          Address: address,
        });

        console.log("Document written with ID: ", docRef.id);
        navigation.navigate("User");
      } else {
        console.error("User not authenticated");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <ImageBackground
          source={require("../assets/healthy-organic-tofu-rice-buddha-bowl-with-veggies.jpg")}
          style={styles.backgroundImg}
        >
          <Text style={styles.menu}>Cart</Text>
        </ImageBackground>
      </View>
      <View style={styles.list}>
        <Image style={styles.img} source={cart.image} />
        <View style={{ marginLeft: 10, marginTop: 20 }}>
          <Text style={styles.name}>
            <Text>Name: </Text>
            {cart.Name}
          </Text>
          <Text style={styles.price}>
            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
              Amount:{" "}
            </Text>
            {count}
          </Text>
          <Text style={styles.price}>
            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
              Total:{" "}
            </Text>
            R{total}
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}>
          Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Name..."
          value={profile}
          onChangeText={(text) => setProfile(text)}
        />
        <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}>
          Address
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Address..."
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}>
          Phone No.
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Numbers..."
          value={number}
          onChangeText={(text) => setNumber(text)}
        />
      </View>

      <TouchableOpacity onPress={checkOut }><Text style={styles.add}>CheckOut</Text></TouchableOpacity>
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
    height: 259,
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
    fontWeight: "bold",
    lineHeight: "normal",
    marginTop: 90,
    alignSelf: "center",
  },
  list: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 20,
    backgroundColor: "#fff",
    width: 310,
    height: 142,
    // justifyContent: "space-between",
  },
  img: {
    width: 100,
    height: 130,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginTop: 10,
  },
  cross: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "red",
    marginTop: 120,
    height: 30,
    width: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    width: 250,
    paddingLeft: 10,
    borderRadius: 20,
    color: "#777",
    fontSize: 14,
    marginBottom: 10,
  },
  add: {
    backgroundColor: "red",
    width: 160,
    height: 36,
    color: "#FFF",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginLeft: 100,
    marginTop: 10,
    paddingVertical: 5
  },
});

export default Cart;

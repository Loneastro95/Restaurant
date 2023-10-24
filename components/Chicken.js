import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebase";

const Chicken = ({ navigation, route }) => {
  const { data } = route.params;

  console.log(data)
  const [heart, setHeart] = useState(false);

  const [count, setCount] = useState(1);

  const handleHeart = () => {
    setHeart(!heart);
  };




  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.img}
            source={require("../assets/icons8-left-arrow-100.png")}
          />
        </TouchableOpacity>
        {heart ? (
          <>
            <TouchableOpacity onPress={handleHeart}>
              <Image
                source={require("../assets/icons8-heart-49.png")}
                style={styles.mic}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={handleHeart}>
              <Image
                source={require("../assets/icons8-heart-50.png")}
                style={styles.mic}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={StyleSheet.top}>
        <Image style={styles.food} source={data.image} />
      </View>
      <View style={styles.main}>
        <Text style={styles.name}>{data.Name}</Text>
        <View style={styles.small}>
          <Text style={styles.smalltext}>Is simply dummy text of </Text>
          <Text style={styles.price}>R{ parseInt(data.Price) *count}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.discription}>{data.Description}</Text>
          <View style={{ width: 150, height: 100,  backgroundColor: '#000'}}>
           
        
            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => setCount(Math.max(count - 1, 1))}>
              <Text style={styles.plus} >-</Text>  
              </TouchableOpacity>
                <Text style={styles.count} >{count}</Text>
                <TouchableOpacity style={styles.plus}  onPress={() => setCount(count + 1)}>
               <Text  style={styles.plus} >+</Text> 
              </TouchableOpacity>
            </View>  
            <TouchableOpacity style={styles.count1} onPress={() => setCount(1)}>
              <Text style={styles.count1}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity   onPress={() => navigation.navigate("Cart" , {cart:data , count: count, total: parseInt(data.Price) *count})}>
              <Text style={styles.add}>Add Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  food: {
    borderRadius: 150,
    width: 250,
    height: 250,
    marginLeft: 40,
  },
  main: {
    marginTop: 40,
  },
  name: {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: 20,
    fontStyle: "normal",
    marginLeft: 30,
    marginTop: 20,
  },
  small: {
    flexDirection: "row",
    marginLeft: 30,
    marginBottom: 20,
  },
  smalltext: {
    color: " red",
    fontFamily: "Inter",
    fontSize: 13,
    fontStyle: "normal",
    marginRight: 40,
  },
  price: {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: 18,
    fontStyle: "normal",
  },
  discription: {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",

    marginLeft: 30,
  },
  add: {
    backgroundColor: "red",
    width: 80,
    height: 36,
    color: "#FFF",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginLeft: 200,
    marginTop: 10,
    paddingVertical: 5
  },
  img: {
    width: 60,
    height: 60,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
    marginTop: 20,
  },
  plus: {
    color: 'red',
    fontSize: 20,
    fontWeight: 700,
  },
  count: {
    color: 'white',
    fontSize: 24,
    fontWeight: 800,
  },
  count1: {
    color: 'white',
    fontSize: 24,
    fontWeight: 800,
    marginLeft: 20
  }
});

export default Chicken;

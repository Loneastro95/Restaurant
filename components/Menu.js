import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { AntDesign } from '@expo/vector-icons';
import { signOut } from "firebase/auth";

const Menu = ({ navigation }) => {

  const [menu, setMenu] = useState([]);
  const [sides, setSides] = useState([]);

  const fetchMenu = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "menu"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMenu(newData);
      console.log(newData);
    } catch (error) {
      alert('error')
      console.error("Error fetching menu: ", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchSides = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "sides"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSides(newData);
      console.log(newData);
    } catch (error) {
      alert('error')
      console.error("Error fetching menu: ", error);
    }
  };

  useEffect(() => {
    fetchSides();
  }, []);
  
   const handleSignout = () => {
    signOut(auth)
   }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <ImageBackground
          source={require("../assets/healthy-organic-tofu-rice-buddha-bowl-with-veggies.jpg")}
          style={styles.backgroundImg}
        >
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={{width: 60, height: 60, backgroundColor: "#fff", marginLeft: 10, marginTop: 10, alignItems: "center", justifyContent: "center", borderRadius: 40}}>
                    <AntDesign name="user" size={40} color="black" />
                    </TouchableOpacity>
          <Text style={styles.menu}>Menu</Text>
        </ImageBackground>
      </View>


      <ScrollView>
        <View style={styles.main}>

          <Text style={styles.text}>Main Category</Text>
          <View style={styles.category}>
            <ScrollView horizontal={true}>
            {menu.map((menu) => (
                <TouchableOpacity onPress={() => navigation.navigate("Chicken" , {data:menu})}>
                  <Card style={styles.card}>
                    <ImageBackground
                      resizeMode="cover"
                      style={styles.img1}
                      source={menu.image}
                    />
                    <Text>{menu.id}</Text>
                    <Text style={styles.paragraph}>{menu.Name}</Text>
                    <Text style={styles.paragraph}>{menu.Price}</Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        
        <View style={styles.main}>
          <Text style={styles.text}>Sides Category</Text>
          <View style={styles.category}>
            <ScrollView horizontal={true}>
            {sides.map((sides) => (
                <TouchableOpacity onPress={() => navigation.navigate("Lamb" , {data:sides})}>
                  <Card style={styles.card}>
                    <ImageBackground
                      resizeMode="cover"
                      style={styles.img1}
                      source={sides.image}
                    />
                    <Text>{sides.id}</Text>
                    <Text style={styles.paragraph}>{sides.Name}</Text>
                    <Text style={styles.paragraph}>{sides.Price}</Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <View style={styles.nav_bar_div}>
            <View style={styles.nav_div}>

                <View style={styles.single_nav_btn_div}>
                    <TouchableOpacity style={styles.nav_btn}>
                        <Image source={require("../assets/icons8-user-51.png")} style={styles.nav_btn_imgs} />
                    </TouchableOpacity>
                    <Text style={styles.nav_btn_text}>Home</Text>
                </View>
                
                <View style={styles.single_nav_btn_div}>
                    <TouchableOpacity style={styles.nav_btn}>
                        <Image source={require("../assets/icons8-search-50.png")} style={styles.nav_btn_imgs} />
                    </TouchableOpacity>
                    <Text style={styles.nav_btn_text}>Products</Text>
                </View>
                
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "start",
    backgroundColor: "#000",
    flex: 1
  },
  top: {
    width: "100%",
    height: 259,
    
  },
  backgroundImg: {
    width: 390,
    height: 250,
    textAlign: "center",
  },
  menu: {
    color: "white",
    fontFamily: "Inter",
    fontSize: 32,
    fontStyle: "normal",
    marginLeft: 140,
    marginTop: 60,
  },
  main: {
    marginLeft: 10,
    height: 240,
    backgroundColor: "black",
  },
  text: {
    marginLeft: 50,
    marginTop: 15,
    color: "white",
    fontFamily: "Inter",
    fontSize: 18,
    fontStyle: "normal",

    borderColor: "black",

    borderBottomColor: "red",
    borderWidth: 1,
    marginBottom: 10,
  },
  category: {
    flexDirection: "row",
  },
  card: {
    height: 160,
    width: 150,
    backgroundColor: "black",
    paddingLeft: 30,
    margin: 5,
  },
  img1: {
    width: 120,
    height: 100,
  },
  scroll: {
    width: 330,
  },
  paragraph: {
    color: "white",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",

    marginTop: 10,
  },
  nav_div: {
    flexDirection: 'row',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Menu;

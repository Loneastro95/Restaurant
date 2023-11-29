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
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebase";

const Admin = () => {
//   const [order, setOrder] = useState([]);
//   const [authUser, setAuthUser] = useState(null);

//   useEffect(() => {
//     const auth = getAuth();
    
//     const fetchData = async () => {
//       try {
//         const user = await onAuthStateChanged(auth);
//         if (user) {
          
//           setAuthUser(user);
          
//           const querySnapshot = await getDocs(collection(db, "Cart" + user.uid));
//           const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//           setOrder(newData);
//           console.log(newData);
//         } else {
         
//           setAuthUser(null);
//           setOrder([]);
//         }
//       } catch (error) {
//         alert('error')
//         console.error("Error fetching order: ", error);
//       }
//     };

//     fetchData();

    
//     return () => {
     
//     };
//   }, []); 

    return(
        <View style={styles.container}>
      <View style={styles.top}>
        <ImageBackground
          source={require("../assets/healthy-organic-tofu-rice-buddha-bowl-with-veggies.jpg")}
          style={styles.backgroundImg}
        >
          <Text style={styles.menu}>Menu</Text>
        </ImageBackground>
        </View>

        <View style={styles.main}>
            <Text>List Of Orders</Text>
            {order.map((order) =>(
           <View style={styles.order}>
            <Text>Name</Text>
            <Text>Address</Text>
            <Text>Food</Text>
            <Text>Ref.</Text>
           </View>
            ))}
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
        marginTop: 100,
      },
})

export default Admin;
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { doc, getDocs, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebase";
import { FontAwesome } from "@expo/vector-icons";

const Profile = ({ navigation }) => {

  const [profile, setProfile] = useState([]);
  const [profileInfo, setProfileInfo] = useState([])

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const initialUser = {
    name: "Kenth",
    phone: "0674321256",
    email: "Example@gmail.com",
    address: "12th st",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUser);

  const handleInputChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const authUser = getAuth().currentUser;
  
      // Update the Firestore document with the new user information
      await updateDoc(doc(db, "test" + authUser.email, profileInfo[0].id), {
        Name: user.name,
        Email: user.email,
        Number: user.phone,
        Address: user.address,
      });
  
      // Update the local state with the new user information
      setProfileInfo([
        {
          ...profileInfo[0],
          Name: user.name,
          Email: user.email,
          Number: user.phone,
          Address: user.address,
        },
      ]);
  
      setIsEditing(false);
    } catch (error) {
      alert('Error updating profile: ' + error.message);
      console.error("Error updating profile: ", error);
    }
  };

  const handleCancelClick = () => {
    setUser(initialUser);
    setIsEditing(false);
  };
 

  const authUser = getAuth().currentUser;
  const fetchUser = async () => {
    try {
      const authUser = getAuth().currentUser; // Add this line
      const querySnapshot = await getDocs(
        collection(db, "Cart" + authUser.uid)
      );
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProfile(newData);
      console.log(newData);
    } catch (error) {
      alert("error");
      console.error("Error fetching menu: ", error);
    }
  };

  
   
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
  
 


  const handleDelete = async () => {
    try {
      const authUser = getAuth().currentUser;
      const docRef = doc(collection(db, "Cart" + authUser.uid), "documentId");
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
      alert("Order Canceled");
    } catch (error) {
      alert("Error deleting document");
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Menu")}>
        <Text style={styles.text}>M</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Menu")}>
          <Text style={styles.btnText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        <View style={styles.profileContainer}>
          {isEditing ? (
            <View style={styles.profileDetails}>
              <View style={styles.detail}>
                <TextInput
                  style={styles.input}
                  value={user.name} // Set value to the corresponding state value
                  onChangeText={(text) => handleInputChange("name", text)}
                />
              </View>
              <View>
                <View style={styles.detail}>
                  <TextInput
                    placeholder="Phone no."
                    style={styles.input}
                    value={user.phone} // Set value to the corresponding state value
                    onChangeText={(text) => handleInputChange("phone", text)}
                  />
                </View>
                <View style={styles.detail}>
                  <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={user.email} // Set value to the corresponding state value
                    onChangeText={(text) => handleInputChange("email", text)}
                  />
                </View>
                <View style={styles.detail}>
                  <TextInput
                    placeholder="Address"
                    style={styles.input}
                    value={user.address} // Set value to the corresponding state value
                     
                  />
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.btn2}
                    onPress={handleSaveClick}
                  >
                    <Text style={styles.btnText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btn2}
                    onPress={handleCancelClick}
                  >
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.profileDetails}>
              <View style={{ marginRight: 50 }}>
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={pickImage}
                >
                  {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                  ) : (
                    <FontAwesome name="user" size={60} color="#555" />
                  )}
                </TouchableOpacity>
                <View style={styles.detail}>
                  <Text style={styles.value}>{ profileInfo.length > 0 ? <View>{profileInfo[0].Name}</View>: <View></View>}</Text>
                </View>
              </View>
              <View>
                <View style={styles.detail}>
                <Text style={styles.value}>{ profileInfo.length > 0 ? <View>{profileInfo[0].Number}</View>: <View></View>}</Text>
                </View>
                <View style={styles.detail}>
                <Text style={styles.value}>{ profileInfo.length > 0 ? <View>{profileInfo[0].Email}</View>: <View></View>}</Text>
                </View>
                <View style={styles.detail}>
                <Text style={styles.value}>{ profileInfo.length > 0 ? <View>{profileInfo[0].Address}</View>: <View></View>}</Text>
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.btn2}
                    onPress={handleEditClick}
                  >
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
        {profile.map((profileItem) => (
        <View
          style={{
            alignSelf: "center",
            borderWidth: 1,
            width: "80%",
            height: 80,
            padding: 5,
            justifyContent: "center",
            borderColor: 'gray',
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={profileItem.Cart.image}
                style={{ width: 75, height: 75, borderRadius: 10 }}
              />
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold", marginRight: 10 }}>
                  {profileItem.Cart.Name}
                </Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>R{profileItem.Total}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Ref: 00354</Text>
                <Text>Date</Text>
              </View>
            </View>
          </View>
        </View>
        ))}

        {/* {profile.map((profileItem) => (
    <View style={styles.bottom}>
    <View key={profileItem.id}>
      <Text style={styles.name}>Hey {profileItem.Buyer}</Text>
      <Text style={styles.name}>Your Order is Confirmed!</Text>
      <Text style={styles.name}>{profileItem.Name}</Text>
      <Text style={styles.price}>R{profileItem.Price}</Text>
      <TouchableOpacity>
        <Text style={styles.okay} onPress={handleDelete}>Cancel Order</Text>
      </TouchableOpacity>
    </View>
    </View>
  ))} */}
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "start",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#DCDCDC",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    padding: 10,
    backgroundColor: "#5f9ea0",
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: "#fff"
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  container1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
  },
  profileContainer: {
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileDetails: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginLeft: 10,
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  btn2: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bottom: {
    width: "85%",
    height: 200,
    backgroundColor: "#fff",
    justifyContent: "start",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
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
    color: "#000",
    fontFamily: "Inter",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
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
    fontWeight: 600,
    lineHeight: "normal",
    marginRight: 40,
  },
  price: {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: 600,
  },
  discription: {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 400,
    marginLeft: 30,
    lineHeight: 18,
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
  okay: {
    backgroundColor: "red",
    width: 120,
    height: 36,
    color: "#FFF",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 40,
    alignSelf: "flex-end",
    fontSize: 16,
    marginTop: 30,
    paddingVertical: 5,
    fontWeight: "bold",
    marginRight: 1,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Profile;

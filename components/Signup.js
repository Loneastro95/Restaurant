import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  CheckBox,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const Signup = ({ navigation }) => {
  const [isSelected, setSelection] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, handleAuthStateChange);
    return () => subscriber(); // unsubscribe on unmount
  }, []);

  useEffect(() => {
    // Trigger form validation when email or password changes
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let errors = {};

    // Validate email field
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    // Validate password field
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleAuthStateChange = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const handleSignUp = async () => {
    validateForm(); // Trigger validation before attempting to sign in

    if (isFormValid) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        try {
          const docRef = await addDoc(collection(db, "test"+email), {
            Email: email,
            Address: address,
            Name: name,
            
            Number: number,
          });
    
          alert("Successfully Logged In");
          navigation.navigate("Menu");
        } catch (e) {
          console.error("Error adding document: ", e.message);
          

        }

        
    
      } catch (error) {
        console.error("Error signing in:", error);
        Alert.alert("Error", "Invalid credentials. Please try again.");
      }
    }
  };

  const handleUser = async () => {
    try {
      const docRef = await addDoc(collection(db, "test"+email), {
        Email: email,
        Address: address,
        Name: name,
        
        Number: number,
      });

     
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error in adding")
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/6879295.jpg")}
        />
        <Text style={styles.fresh}>Fresh Food</Text>
        <Text style={styles.slogan}>Where good food and good times meet</Text>
      </View>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Username..."
          keyboardType="text"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone No. ..."
          keyboardType="text"
          value={number}
          onChangeText={setNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Address..."
          keyboardType="address"
          value={address}
          onChangeText={setAddress} // Corrected from onChange to onChangeText
        />

        <TextInput
          style={styles.input}
          placeholder="Email..."
          onChangeText={setEmail}
          keyboardType="email"
          value={email}
        />
        <Text style={{ color: "red", marginLeft: 24 }}>{errors.email}</Text>
        <View style={styles.inputcontainer}>
          <TextInput
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.input3}
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
          />
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        </View>
        <Text style={{ color: "red", marginLeft: 24 }}>{errors.password}</Text>
        {/* <View style={styles.box}>
        <CheckBox 
        value={isSelected}
        onValueChange={setSelection}        
        style={styles.checkbox} />
        <Text style={styles.forgot}>I agree with privacy policy</Text></View> */}

        <TouchableOpacity
          style={{ marginBottom: 120 }}
          onPress={() => {
            handleSignUp();
           
          }}
          disabled={!isFormValid}
        >
          <Text style={styles.btn}>Sign Up</Text>
        </TouchableOpacity>
       
        <View style={{flexDirection: 'row'}}><Text style={{color: 'white', fontSize: 12, marginRight: 2}}>Don't have an account?</Text><TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{color: 'red', fontSize: 12, fontWeight: 'bold'}}>Go to Login</Text></TouchableOpacity></View>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: "#000",
  },
  logo: {
    marginLeft: 20,
    marginTop: 100,
    marginBottom: 80,
  },
  tinyLogo: {
    borderRadius: 50,
    width: 100,
    height: 100,
    marginLeft: 80,
    borderWidth: 1,
    borderColor: "red",
  },
  tinyLogo1: {
    borderRadius: 50,
    width: 50,
    height: 50,
    marginRight: 20,
  },
  fresh: {
    color: "#FBFBFB",
    fontFamily: "Inter",
    fontSize: 24,
    fontStyle: "normal",

    marginLeft: 80,
  },
  slogan: {
    color: "#FF0404",
    fontFamily: "Inter",
    fontSize: 16,
    fontStyle: "normal",
  },
  input: {
    backgroundColor: "white",
    height: 50,
    width: 250,
    paddingLeft: 10,
    borderRadius: 20,
    color: "#777",
    fontSize: 14,
    marginBottom: 10,
  },
  btn: {
    width: 170,
    height: 45,
    borderRadius: 30,
    backgroundColor: "#FD0C0C",
    color: "white",
    textAlign: "center",
    paddingTop: 12,
    fontFamily: "Inter",
    fontSize: 16,

    marginTop: 10,
    marginLeft: 40,
    marginBottom: 100,
  },
  btn1: {
    width: 170,
    height: 45,
    borderRadius: 30,
    backgroundColor: "#FFF",
    color: "#000",
    textAlign: "center",
    marginTop: 15,
    paddingTop: 12,
    fontFamily: "Inter",
    fontSize: 16,

    marginBottom: 80,
    marginLeft: 40,
  },
  forgot: {
    color: "rgba(255, 0, 0, 1)",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",

    marginLeft: 10,
  },
  login: {
    color: "rgba(255, 0, 0, 1)",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",

    marginRight: 154,
  },
  google: {
    flexDirection: "row",
    marginLeft: 150,
  },
  box: {
    flexDirection: "row",
    marginBottom: 20,
  },
  inputcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    height: 50,
  },
  input3: {
    flex: 1,
    borderColor: "white",
    color: "#777",
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 14,
    borderRadius: 20,
  },
  inputs: {
    justifyContent: "space-evenly",
  },
});

export default Signup;

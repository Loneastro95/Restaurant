import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged  } from "firebase/auth";
import {auth} from '../config/firebase'

const Login = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
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
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    // Validate password field
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleAuthStateChange = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const handleSignIn = async () => {
    validateForm(); // Trigger validation before attempting to sign in

    if (isFormValid) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Successfully Logged In");
        navigation.navigate('Menu');
      } catch (error) {
        console.error('Error signing in:', error);
        Alert.alert('Error', 'Invalid credentials. Please try again.');
      }
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

      <View><Text style={{color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 40}}>LOG IN</Text></View>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Email..."
          keyboardType="email"
          value={email}
          onChangeText={setEmail}
        />
         <Text style={{ color: 'red', marginLeft:24,  }}>{errors.email}</Text>
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
        <Text style={{ color: 'red', marginLeft:24,  }}>{errors.password}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Forgot")} >
        <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom: 20}} onPress={handleSignIn}>
          <Text style={styles.btn}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}><Text style={{color: 'white', fontSize: 12, marginRight: 2}}>Don't have an account?</Text><TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={{color: 'red', fontSize: 12, fontWeight: 'bold'}}>SignUp</Text></TouchableOpacity></View>
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
    marginBottom: 10
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
    alignSelf: 'flex-end'
  },
  login: {
    color: "rgba(255, 0, 0, 1)",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",
    marginTop: 10,

    marginRight: 154,
  },
  google: {
    flexDirection: "row",
    marginLeft: 150,
  },

  inputcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 20,
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
  icon: {
    marginLeft: 10,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;

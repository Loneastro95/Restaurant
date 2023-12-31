import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';

const Forgot = ({ navigation }) => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('');

const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const Reset = (() =>{


    sendPasswordResetEmail(auth, email, password)
    .then((userCredential) => {
      // Signed up 

      alert("Check your Email")
      navigation.navigate('Login')
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      alert("error")
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

   })

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/6879295.jpg')}
        />
        <Text style={styles.fresh}>Fresh Food</Text>
        <Text style={styles.slogan}>Where good food and good times meet</Text>
      </View>
      <View><Text style={{color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 40}}>Forgot Password?</Text></View>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Email..."
          keyboardType="email"
          onChangeText={setEmail}
        />
      {/* <View style={styles.inputcontainer}>
        <TextInput
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.input3}
          placeholder="Enter Password"
          placeholderTextColor="#aaa"
        />
        <MaterialCommunityIcons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />
      </View> */}

        

                <TouchableOpacity onPress={Reset}><Text style={styles.btn} >Rest Password</Text></TouchableOpacity>
      
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    backgroundColor: '#000'
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
    marginRight: 20
    
  },
  fresh: {
    color: '#FBFBFB',
    fontFamily: 'Inter',
    fontSize: 24,
    fontStyle: 'normal',

    marginLeft: 80,
  },
  slogan: {
    color: '#FF0404',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
 
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    width: 250,
    paddingLeft: 10,
    borderRadius: 20,
    color: '#777',
    fontSize: 14, 
    marginBottom: 20,   
  },
  btn: {
    width: 170,
    height: 45,
    borderRadius: 30,
    backgroundColor: '#FD0C0C',
    color: 'white',
    textAlign: 'center',
    paddingTop: 12,
    fontFamily: 'Inter',
    fontSize: 16,

    marginTop: 10,
    marginLeft: 40                   
},
btn1: {
    width: 170,
    height: 45,
    borderRadius: 30,
    backgroundColor: '#FFF',
    color: '#000',
    textAlign: 'center',
    marginTop: 15,
    paddingTop: 12,
    fontFamily: 'Inter',
    fontSize: 16,

    marginBottom: 80,
    marginLeft: 40                            
},
forgot: {
  color: 'rgba(255, 0, 0, 1)',
  fontFamily: 'Inter',
  fontSize: 14,
  fontStyle: 'normal',

},
login:{
  color: 'rgba(255, 0, 0, 1)',
  fontFamily: 'Inter',
  fontSize: 14,
  fontStyle: 'normal',

  marginRight: 154,  
},
google: {
  flexDirection: 'row',
  marginLeft: 150,
  
},

  inputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  input3: {
    flex: 1,
    borderColor: 'white',
    color: '#777',
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 14,
    borderRadius: 20,
  },
  icon: {
    marginLeft: 10,
  },
});

export default Forgot;
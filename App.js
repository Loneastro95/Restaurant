import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet, Text, View } from 'react-native';
import Base from './components/Base';
import Login from './components/Login';
import Signup from './components/Signup';
import Menu from './components/Menu';
import Chicken from './components/Chicken';
import Lamb from './components/Lamb';
import Forgot from './components/ForgotPassword';
import User from './components/User';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Admin from './components/Admin';
import Profile from './components/Profile';
import demo from './components/demo';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer >
     <Stack.Navigator initialRouteName="Base" screenOptions={{ headerShown: false }}>
     <Stack.Screen name="Menu" component={Menu} />
     <Stack.Screen name="Base" component={Base} />
     <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Chicken" component={Chicken} />
      <Stack.Screen name="Lamb" component={Lamb} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="demo" component={demo} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

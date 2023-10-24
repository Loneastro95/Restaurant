import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const Base = ({ navigation }) => {
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
            <View style={styles.Button}>
                <TouchableOpacity  onPress={() => navigation.navigate('Login')}><Text style={styles.btn}>Log In</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={styles.btn1}>Sign Up</Text></TouchableOpacity>
            </View>
            <View style={styles.discount}>
            <View>
                    <Text style={{color: 'white', fontFamily: 'Inter', fontSize: 24,  marginTop: 40, marginLeft: 10, fontWeight: 'bold'}}>15%</Text>
                    <Text style={{color: 'white', fontFamily: 'Inter', fontSize: 20,  marginLeft: 10, fontWeight: 'bold'}}>Discount</Text>
                    <Text style={{color: 'white', fontFamily: 'Inter', fontSize: 16,  marginLeft: 10, fontWeight: 'bold'}}>For  Sign Up on all</Text>
                    <Text style={{color: 'white', fontFamily: 'Inter', fontSize: 16,  marginLeft: 10}}>Starters</Text>
            </View>
            <View style={styles.img}>
                <Image
                 resizeMode="cover"
                    style={styles.img1}
                    source={require('../assets/fried-prawn-shrimp-with-garlic.jpg')}
                />            
            </View>
              
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'start',
        backgroundColor: '#000'

    },
    logo: {
     marginLeft: 20,
     marginTop: 60,
     marginBottom: 80
    },
    tinyLogo: {
        borderRadius: 50,
        width: 100,
        height: 100,
        marginLeft: 80,
    },
    fresh: {
        color: '#FBFBFB',
        fontFamily: 'Inter',
        fontSize: 24,
        fontStyle: 'normal',
         fontWeight: 'bold',
        
        marginLeft: 80,
    },
    slogan: {
        color: '#FF0404',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold'
        
        
        
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
        
        marginBottom: 80                           
    },
    discount: {
        width: 320,
        height: 163,
        backgroundColor: '#FD0C0C',
        borderRadius: 20,
        marginTop: 30,
        flexDirection: 'row',
        
    },
    img: {
      width: 153,
      height: 153,
      backgroundColor: '#FFF',
      marginLeft: 33,
      borderTopLeftRadius: 80,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 5,      
    },
    img1: {
      width: 153,
      height: 153,
      backgroundColor: '#FFF',
      borderTopLeftRadius: 80,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 5,      
    }    
   

})

export default Base;
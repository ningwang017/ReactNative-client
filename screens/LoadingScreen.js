import React from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import LoginScreen from "./LoginScreen";

// a loading screen prior to the login screen
export default function LoadingScreen({navigation}) {
    setTimeout(()=>{
       navigation.navigate("Login")
    }, 1500)

    return (
        <View style={styles.page}>
            <Image style={styles.icon} source={require('../assets/images/stock-market.png')}/>
            <Text style={styles.title}>Nasdaq Stock</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'black',
        justifyContent:'center',
        flex:1,
    },
    icon: {
        alignSelf:'center',
        tintColor:'white',
        flex:0.2,
        resizeMode: 'contain',
        width:150,
        height:150
    },

    title: {
        fontWeight: 'bold',
        fontSize: 50,
        color: 'white',
        alignSelf:'center',
    }
})
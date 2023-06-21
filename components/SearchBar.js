import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";


// customized Search Bar wtih encapsulated components 
export default function SearchBar({...props}) {
    return (
        <View style={styles.container}>
            <FontAwesome name={"search"} size={20} style={styles.icon} color={"white"}/>
            <TextInput 
            style={styles.textInput} 
            {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#141414',
        flexDirection: 'row',
        width:'98%',
        padding: 10,
        margin: 3,
        alignSelf:'center',
        borderWidth: 1,
        borderColor: "#afb8ba",
        borderRadius: 20,
    },
    textInput: {
        fontSize: 18,
        width:"100%",
        color:'white',
    },
    icon: {
        marginRight: 10,
        justifyContent: "center"
    },
})
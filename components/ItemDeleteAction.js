import React from "react";
import { View, StyleSheet, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";


// handles delete item action when swipe the list to right and is pressable
export default function ItemDeleteAction({onPress}) {
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
        
                <MaterialCommunityIcons 
                name="trash-can"
                size={30}
                color={'white'} />
              
        </TouchableOpacity>
        </View>
        
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        width: 70,
        justifyContent:'center',
        alignItems:'center',
    }
})
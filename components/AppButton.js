import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';


// Customized Login button
export default function AppButton({title, onPress}) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>   
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        borderWidth:2,
        borderColor:"#b3b5b5",
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginBottom: 30,
        alignSelf:'center'
    },
    text:{
        color: "black",
        fontSize: 18,
        fontWeight: 'bold'
    }
})
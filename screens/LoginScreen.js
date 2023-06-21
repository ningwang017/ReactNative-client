import React, {useState, useContext} from "react";
import { SafeAreaView, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Text} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import { AuthContext } from "../contexts/AuthContext";


export default function LoginScreen({route, navigation}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [warn, setWarn] = useState("");

    // import login hook from authentication context
    const {login, authInfo} = useContext(AuthContext);

    // check input error, if there's an error return true 
    const checkLoginInputError =  ()=> {
        if (password == "") {
            setWarn("Password cannot be empty");
            return true;
        } else {
            setWarn("")
        }
        return false;
    }

    // if there's no input error, login the user 
    const handleLogin = () => {
        if (checkLoginInputError() == false) {
            login(username, password)
        } 
    }
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <SafeAreaView style={styles.pageContainer}>
            <Text style={styles.title}>Welcome</Text>
            <View style={styles.container}>
                <FontAwesome name={"user-o"} size={20} style={styles.icon} color={"white"}/>
                <TextInput 
                    placeholder="Username"
                    placeholderTextColor={'#8b8b8c'}
                    style={styles.textInput} 
                    autoCapitalize={"none"}
                    onChangeText={(text)=>setUsername(text)}/>
            </View>
            <View style={styles.container}>
                <FontAwesome name={"lock"} size={20} color={"white"} style={styles.icon}/>
                <TextInput placeholder="Password" 
                placeholderTextColor={'#8b8b8c'} 
                style={styles.textInput} 
                secureTextEntry={true}
                autoCapitalize={"none"}
                onChangeText={(text)=>{setPassword(text)}} />
            </View>
            <Text style={styles.warn}>{authInfo.error == true ? authInfo.message : warn}</Text>
            <View style={styles.buttons}>
            <AppButton title={"Login"} onPress={()=>{handleLogin()
            }}/>
            <AppButton title={"Register"} onPress={()=>{
                navigation.navigate("Register")
            }}
            />
            </View> 
        </SafeAreaView>
    </TouchableWithoutFeedback>
     ) 
}

const styles = StyleSheet.create({
    pageContainer:{
        flex: 1,
        justifyContent:'center',
    },
    container:{
        backgroundColor:'black',
        flexDirection: 'row',
        width:'80%',
        padding: 15,
        alignSelf:'center',
        borderWidth: 2,
        borderColor: "#afb8ba",
        borderRadius: 25,
        marginTop:30,
    },
    textInput:{
       fontSize: 18,
       width:"100%",
       color:'white'
    },
    icon: {
        marginRight: 10,
        justifyContent: "center"
    },
    buttons: {
        paddingTop: 50,
    },
    title: {
        fontSize: 35,
        paddingBottom: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        color:'white'
    },
    warn: {
        color: 'red',
        paddingLeft: 50
    }
})

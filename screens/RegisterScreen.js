import React, {useState, useContext} from "react";
import { SafeAreaView, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Text} from "react-native";
import AppButton from "../components/AppButton";
import { AuthContext } from "../contexts/AuthContext";

export default function RegisterScreen({navigation}) {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [passwordRep, setPasswordRep] = useState("");
    const [warn, setWarn] = useState("");
    const [mismatch, setMismatch] = useState("");

    //get register hook from authentication context 
    const {register, error} = useContext(AuthContext);

    //check input validation at front end 
    const checkInputError = ()=> {
        if(usernameReg == "") {
            setWarn("Username cannot be empty")
            return true;
        } else {
            setWarn("");
        }
        if(passwordReg == "") {
            setMismatch("Password cannot be empty");
            return true;
        } else {
            setMismatch("");
        }
        if(passwordReg != passwordRep) {
            setMismatch("Password does not match")
            return true
        } else {
            setMismatch("");
        }
        return false;
    }

    //register new user
    const handleRegister = () => {
        if (checkInputError() == false) {
            register(usernameReg, passwordReg);
        } 
    } 

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.pageContainer}>
                <Text style={styles.title}>Register</Text>
                <Text style={styles.heading}>Username</Text>
                <View style={styles.container}>
                    <TextInput 
                        style={styles.textInput}
                        autoCapitalize={"none"}
                        onChangeText={(text)=>{setUsernameReg(text)}}/>
                </View>
                <Text style={styles.warn}>{error ? error: warn}</Text>
                <Text style={styles.heading}>Password</Text>
                <View style={styles.container}>
                    <TextInput 
                        style={styles.textInput}
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                        onChangeText={(text)=>{setPasswordReg(text)}}/>
                </View>
                <Text style={styles.heading}>Repeat Password</Text>
                <View style={styles.container}>
                    <TextInput 
                        style={styles.textInput} 
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                        onChangeText={(text)=>{setPasswordRep(text)}}/>
                </View>
                <Text style={styles.warn}>{mismatch}</Text>
                <View style={styles.buttons}>
                    <AppButton title={"Register"} onPress={()=>{
                            handleRegister();
                        }}/>
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
        flexDirection: 'row',
        width:'80%',
        padding: 15,
        alignSelf:'center',
        borderWidth: 2,
        borderColor: "#afb8ba",
        borderRadius: 25,

    },
    textInput:{
       fontSize: 18,
       color:'white',
       width:"100%"
    },
    icon: {
        marginRight: 10,
        justifyContent: 'center',
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
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 45,
        marginTop: 20,
        paddingBottom: 5,
        color:'white'
    },
    warn: {
        color: 'red',
        paddingLeft: 50
    }
})
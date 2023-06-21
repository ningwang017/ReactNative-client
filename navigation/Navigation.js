import * as React from "react";
import { useContext} from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoadingScreen from "../screens/LoadingScreen";
import { AuthContext } from "../contexts/AuthContext";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

// a navigation that handles screen navigations
export default function Navigation() {
  // get authinfo from authentication context 
  const {authInfo} = useContext(AuthContext)
    return ( 
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator>
              {authInfo.token ? ( // if the token exists in the async storage, load the screen to Home else to login screen
                <Stack.Screen name="Home" component={BottomTabNavigator} options={{headerShown:false}}/>
              ):(
                <Stack.Group>
                  {/* <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown:false, headerTransparent:true}} /> */}
                  <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false, headerTransparent:true}}/>
                  <Stack.Screen name="Register" component={RegisterScreen} options={{title:'', headerTransparent:true}}/>
                </Stack.Group>
              )}
          </Stack.Navigator>
        </NavigationContainer>
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  })
  
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./contexts/AuthContext";
import "react-native-gesture-handler";

import Navigation from "./navigation/Navigation";

export default function App(props) {
  return (

    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

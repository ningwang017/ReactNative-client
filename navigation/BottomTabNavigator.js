import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import StocksScreen from "../screens/StocksScreen";
import SearchScreen from "../screens/SearchScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Search";

export default function BottomTabNavigator({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title:"Stocks",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-search" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Stocks"
        component={StocksScreen}
        options={{
          title: "My Stocks",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-trending-up" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  return getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;
}
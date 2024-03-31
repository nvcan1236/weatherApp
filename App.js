import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import City from "./src/screens/City";
import Forecast from "./src/screens/Forecast";
import { AppRegistry, Text } from "react-native";
import { PaperProvider } from "react-native-paper";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { name as appName } from "./app.json";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarStyle: { position: "absolute" },
            tabBarLabelPosition: "beside-icon",
            tabBarLabelStyle: {
              fontWeight: "500",
            },
            tabBarActiveTintColor: "black",
            tabBarHideOnKeyboard: true,
          }}
        >
          <Tab.Screen
            name="Forecast"
            component={Forecast}
            options={{
              tabBarIcon: () => {
                return <Ionicons name="cloud-outline" color="#000" size={20} />;
              },
            }}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: () => {
                return <Ionicons name="home-outline" color="#000" size={20} />;
              },
            }}
          />
          <Tab.Screen
            name="City"
            component={City}
            options={{
              tabBarIcon: () => {
                return <Ionicons name="map-outline" color="#000" size={20} />;
              },
            }}
          />
        </Tab.Navigator>

        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => App);

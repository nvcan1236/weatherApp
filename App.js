import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import PizzaDetail from "./src/screens/components/PizzaDetail";
import PizzaList from "./src/screens/components/PizzaList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import City from "./src/screens/City";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Forecast" component={PizzaDetail}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="City" component={PizzaList}/>
      </Stack.Navigator> */}

      <Tab.Navigator
        initialRouteName="City"
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
          component={PizzaDetail}
          options={{
            tabBarIcon: () => {
              return <Text>🌦️</Text>;
            },
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => {
              return <Text>🏠</Text>;
            },
          }}
        />
        <Tab.Screen
          name="City"
          component={City}
          options={{
            tabBarIcon: () => {
              return <Text>📌</Text>;
            },
          }}
        />
      </Tab.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 40,
  },
  pizzaImage: {
    width: "100%",
    height: 200,
  },
});

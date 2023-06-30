import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import MovieDetail from "../Screens/MovieDetail";
import PersonScreenn from "../Screens/PersonScreenn";
import SearchScreen from "../Screens/SearchScreen";

const Navigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
                <Stack.Screen options={{ headerShown: false }} name="Details" component={MovieDetail} />
                <Stack.Screen options={{ headerShown: false }} name="Profile" component={PersonScreenn} />
                <Stack.Screen options={{ headerShown: false }} name="Search" component={SearchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default Navigation;

// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from '../myChef-app/homeScreen';
import MenuScreen from '../myChef-app/MenuScreen';
import PaymentScreen from '../myChef-app/Payment';
import FilterScreen from '../myChef-app/filter';
import { RootStackParamList } from './type';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {/* Safe StatusBar setup for Expo SDK 53 */}
      <StatusBar style="light" translucent={true} />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#ff884d' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "My Chef App" }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ title: "Menu" }}
        />
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{ title: "Filter Options" }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ title: "Payment" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

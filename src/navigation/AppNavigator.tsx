import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ShoppingListsScreen from '../screens/ShoppingListsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Login" component={LoginScreen} />
    <Tab.Screen name="Register" component={RegisterScreen} />
    <Tab.Screen name="Shopping Lists" component={ShoppingListsScreen} />
  </Tab.Navigator>
);

export default AppNavigator;

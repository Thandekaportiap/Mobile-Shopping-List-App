import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store';
import RegisterScreen from './src/screens/RegisterScreen'; // Register screen
import LoginScreen from './src/screens/LoginScreen'; // Login screen
import ShoppingListsScreen from './src/screens/ShoppingListsScreen'; // Shopping List screen
import HomeScreen from './src/screens/HomeScreen'; // Home screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* Login Screen */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login', headerShown: false }}
          />

          {/* Register Screen */}
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Register' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home', headerShown: false }}
          />
          {/* Shopping Lists Screen */}
          <Stack.Screen
            name="ShoppingLists"
            component={ShoppingListsScreen}
            options={{ title: 'Shopping Lists' , headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

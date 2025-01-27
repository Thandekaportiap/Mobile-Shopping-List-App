import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const navigateToShoppingList = () => {
    navigation.navigate('ShoppingLists'); // Navigate to the ShoppingLists screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List App</Text>
      <Image
        source={require('../../assets/shopping-online-concept-grocery-red-basket-shopping-basket-different-foods-beverages-shopping-online-concept-grocery-240113026.webp')}
        style={styles.logo}
      />
      {/* <Button title="Get Started" onPress={navigateToShoppingList} color="#778a35" /> */}
      <TouchableOpacity style={styles.button} onPress={navigateToShoppingList}>  
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
    backgroundColor: '#ebebe8', // Light gray background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#778a35', // Green color for title text
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30,
    borderRadius: 15, // Optional: Add rounded corners for a smoother look
  },
  button: {
    marginTop: 20,
    backgroundColor: '#778a35',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;

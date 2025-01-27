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
        source={require('../../assets/1686 - Copy.jpg')}
        style={styles.logo}
      />
      <TouchableOpacity style={styles.button} onPress={navigateToShoppingList}>  
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  title: {
    fontSize: 28,
  
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#778a35',
    paddingVertical: 10,  // Adds vertical padding inside the border
    borderTopWidth: 3,    // Adds border at the top
    borderBottomWidth: 3, // Adds border at the bottom
    borderColor: '#778a35', // Green color for the borders
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30,
    backgroundColor: "transparent",
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

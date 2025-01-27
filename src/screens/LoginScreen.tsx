import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Svg, { Path } from 'react-native-svg'; // Import Svg and Path
import { login } from '../features/authSlice'; // Your Redux action for login


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username)); // Dispatch the login action
      navigation.navigate('Home'); // Navigate to the Home screen
    } else {
      alert('Please enter a username.');
    }
  };

  return (
    <View style={styles.container}>
    {/* SVG Header */}
    <View style={styles.top}>
        <View style={styles.box}>
          <Svg 
            height={400}
            width={Dimensions.get('screen').width}
            viewBox="0 0 1440 320"
            style={styles.topWavy}
          >
            <Path
              fill="#778a35"
              d='M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'
            />
          </Svg>
        </View>
        <Text style={styles.headerText}>Welcome Back</Text>
        <Text style={styles.title}>Login to your account</Text>
      </View>

    {/* Login Form */}
    <View style={styles.form}>

        <TextInput
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      {/* Custom Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  top: {
    height: 10,
  },
  topWavy: {},

  
  box: {
    backgroundColor: '#778a35',
    height: 160,
  },
  
  headerText: {
    fontSize: 28,
    color: '#EBEBE8',
    fontWeight: 'bold',
    position: 'absolute',
    top: 45,
    left: 25,
  },
  form: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: '400',
    color: '#EBEBE8',
    position: 'absolute',
    top: 85,
    left: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#778a35',
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LoginScreen;

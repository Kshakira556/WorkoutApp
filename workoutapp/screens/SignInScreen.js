import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';

const SignInScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');

  const signIn = () => {
    // For simplicity, check if password is 'password'
    if (password === 'password') {
      navigation.navigate('Dashboard');
    } else {
      alert('Incorrect password');
    }
  };

  const renderOnboardingScreen = () => {
    return (
      <View style={styles.onboardingContainer}>
        <Text style={styles.appName}>My Workout App</Text>
        <Text style={styles.tagline}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        <Image source={require('../assets/snack-icon.png')} style={styles.icon} />
        <Text style={styles.welcomeMessage}>Welcome Back Shakira</Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#7B68EE', '#00BFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Swiper loop={false} showsButtons={false} activeDotColor="#fff">
        <View style={styles.slide}>
          {renderOnboardingScreen()}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={signIn}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Add more onboarding screens as needed */}
      </Swiper>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeMessage: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#000',
    ...Platform.select({
      web: {
        outlineWidth: 0,
        borderBottomWidth: 1,
      },
    }),
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Button background color
    marginTop: 20,
  },
  buttonText: {
    color: '#7B68EE', // Button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignInScreen;

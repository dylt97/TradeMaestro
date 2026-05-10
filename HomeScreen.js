import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}></Text>
      <Text style={styles.subtitle}>Find trusted local trades</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('ContractorSignup')}
      >
        <Text style={styles.buttonText}>I'm a Contractor</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('CustomerSignup')}
      >
        <Text style={styles.buttonText}>I'm a Customer</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2f4e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0b4c8',
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#2e86de',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    width: 260,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  logo: {
    width: 360,
    height: 360,
    marginBottom: 20,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#4a7aaa',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  loginText: {
    color: '#6a9ac4',
    fontSize: 16,
    fontWeight: '500',
  },
});
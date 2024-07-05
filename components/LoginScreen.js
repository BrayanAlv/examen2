import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        console.log('Cuenta Creada!');
        const user = userCredential.user;
        Alert.alert('Success', `Cuenta creada para ${user.email}`);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        console.log('Sesión iniciada');
        const user = userCredential.user;
        navigation.navigate('Home', { user });
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="Create Account" onPress={handleCreateAccount} />
      <Button title="Login" onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

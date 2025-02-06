import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Additional user fields
  const [totalDives, setTotalDives] = useState('');
  const [certifications, setCertifications] = useState('');
  const [insuranceName, setInsuranceName] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Store extra user info in Firestore
      await setDoc(doc(db, 'users', userId), {
        name,
        email,
        totalDives: parseInt(totalDives) || 0,
        certifications,
        insuranceName,
        insuranceNumber,
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Additional fields */}
      <TextInput
        placeholder="Total Dives Before Registration"
        value={totalDives}
        onChangeText={setTotalDives}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Certifications"
        value={certifications}
        onChangeText={setCertifications}
        style={styles.input}
      />
      <TextInput
        placeholder="Insurance Name"
        value={insuranceName}
        onChangeText={setInsuranceName}
        style={styles.input}
      />
      <TextInput
        placeholder="Insurance Number"
        value={insuranceNumber}
        onChangeText={setInsuranceNumber}
        style={styles.input}
      />

      <Button title="Create Account" onPress={handleRegister} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 16, justifyContent: 'center',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16,
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12,
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, CheckBox } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const MATERIALS = ['BCD', 'Octopus', 'Fins', 'Computer', 'Mask', 'Wet Suit'];

export default function DiveFormScreen({ navigation }) {
  const [diveSite, setDiveSite] = useState('');
  const [date, setDate] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState([]);

  const toggleMaterial = (material) => {
    if (materialsUsed.includes(material)) {
      setMaterialsUsed(materialsUsed.filter((m) => m !== material));
    } else {
      setMaterialsUsed([...materialsUsed, material]);
    }
  };

  const handleSaveDive = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, 'dives'), {
        userId: user.uid,
        diveSite,
        date,
        materialsUsed,
      });

      // Optionally, update usage count for each material
      // This might be stored in a separate collection or user doc
      // for example, in users/userId/materialUsage
      // Below is a simplistic example:
      materialsUsed.forEach(async (material) => {
        const usageDocRef = doc(db, 'users', user.uid, 'materialUsage', material);
        await updateDoc(usageDocRef, {
          count: (prevCount) => (prevCount || 0) + 1,
        });
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving dive:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log a New Dive</Text>

      <TextInput
        style={styles.input}
        placeholder="Dive Site"
        value={diveSite}
        onChangeText={setDiveSite}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Materials Used:</Text>
      {MATERIALS.map((material) => (
        <View key={material} style={styles.checkboxContainer}>
          <CheckBox
            value={materialsUsed.includes(material)}
            onValueChange={() => toggleMaterial(material)}
          />
          <Text style={styles.checkboxLabel}>{material}</Text>
        </View>
      ))}

      <Button title="Save Dive" onPress={handleSaveDive} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12,
  },
  label: { fontSize: 16, marginBottom: 8, fontWeight: '600' },
  checkboxContainer: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});

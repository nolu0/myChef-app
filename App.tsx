import React, { useState } from 'react';
import { SafeAreaView, View,  Text,  TextInput,FlatList, TouchableHighlight, StyleSheet,}from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from './type'

export default function MenuScreen() {
  // State variables
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coursetype, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Course options
  const course = ['Starter', 'Main', 'Dessert'];

  // Handle add new item
  const handleAddItem = () => {
    if (!name || !description || !coursetype || !price) {
      setErrorMessage(' All fields are required.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      description,
      coursetype,
      price: parseFloat(price),
    };

    setMenuItems([...menuItems, newItem]);
    setName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setErrorMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headingContainer}>
       {/* Restaurant Name Header */}
  <Text style={styles.restaurantName}>Chris Restaurant App</Text>
        <Text style={styles.title}>🍽️ Chef Menu List</Text>
        <Text style={styles.totalItems}>Total Items: {menuItems.length}</Text>
      </View>

      {/* FlatList to show menu items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.description}>{item.coursetype}</Text>
            <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          </View>
        )}
        style={styles.listView}
      />

      {/* User Input Section */}
      <View style={styles.userInputView}>
        <Text style={styles.inputLabel}>➕ Add a New Dish</Text>

        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="price"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />

        {/* Picker for Course Type */}
        <Picker
          selectedValue={coursetype}
         onValueChange={(itemValue) => setCourse(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select Course Type" value="" />
          {course.map((c) => (
            <Picker.Item label={c} value={c} key={c} />
          ))}
        </Picker>

        {/* Show error if needed */}
        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}

        {/* Button */}
        <TouchableHighlight
          style={styles.button}
          underlayColor="#cc6600"
          onPress={handleAddItem}
        >
          <Text style={styles.buttonText}>Add Dish</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}
// Define styles as a Typescript object with specific properties
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },// lighter
  title: { fontSize: 24, fontWeight: 'bold', color: '#ff884d' },
  totalItems: { fontSize: 16, color: '#333', marginTop: 5 },

  headingContainer: { 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff0e6', // light background to stand out
    borderBottomWidth: 2,
    borderBottomColor: '#ff884d',
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },


  listView: { paddingHorizontal: 16 },
  menuItem: {
    backgroundColor: '#ffe7cc',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  dishName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  description: { fontSize: 14, color: '#555' },
  price: { fontWeight: 'bold', marginTop: 5, color: '#000' },

  userInputView: { padding: 20, borderTopWidth: 1, borderTopColor: '#ddd' },
  inputLabel: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
    restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6600',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  error: { color: 'red', marginBottom: 10 },

  button: {
    backgroundColor: '#ff884d',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

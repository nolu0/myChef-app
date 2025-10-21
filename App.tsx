import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from './type';

export default function MenuScreen() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coursetype, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState('All');

  const course = ['Starter', 'Main', 'Dessert'];

  // ✅ Add item handler
  const handleAddItem = () => {
    if (!name || !description || !coursetype || !price) {
      setErrorMessage('All fields are required.');
      return;
    }

    // ✅ Remove "R" and convert safely to number
    const cleanPrice = parseFloat(price.replace(/[^\d.]/g, ''));

    if (isNaN(cleanPrice)) {
      setErrorMessage('Please enter a valid price in Rands (e.g. R65 or 65).');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      description,
      coursetype,
      price: cleanPrice,
    };

    setMenuItems([...menuItems, newItem]);
    setName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setErrorMessage('');
  };

  const filteredItems =
    filterType === 'All'
      ? menuItems
      : menuItems.filter((item) => item.coursetype === filterType);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.restaurantName}>Chris Restaurant App</Text>
        <Text style={styles.title}>🍽️ Chef Menu List</Text>
        <Text style={styles.totalItems}>Total Items: {filteredItems.length}</Text>
      </View>

      {/* Filter Picker */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Course:</Text>
        <Picker
          selectedValue={filterType}
          onValueChange={(value) => setFilterType(value)}
          style={styles.input}
        >
          <Picker.Item label="All" value="All" />
          {course.map((c) => (
            <Picker.Item label={c} value={c} key={c} />
          ))}
        </Picker>
      </View>

      {/* Menu List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
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

      {/* Add Dish Section */}
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
          placeholder="Price (e.g. R65)"
          value={price}
          keyboardType="default"
          onChangeText={setPrice}
        />

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

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

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

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ff884d' },
  totalItems: { fontSize: 16, color: '#333', marginTop: 5 },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff0e6',
    borderBottomWidth: 2,
    borderBottomColor: '#ff884d',
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterContainer: { paddingHorizontal: 20, marginBottom: 10 },
  filterLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
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

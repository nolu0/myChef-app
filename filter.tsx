import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from './type';
import { globalStyles } from './Globalstyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './type';

type FilterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Filter'>;

export default function FilterScreen({ navigation }: { navigation: FilterScreenNavigationProp }) {
  const [selectedCourse, setSelectedCourse] = useState<string>('All');

  const sampleMenu: MenuItem[] = [
    { id: '1', name: 'Salad', description: 'Fresh greens', coursetype: 'Starter', price: 50 },
    { id: '2', name: 'Burger', description: 'Juicy beef burger', coursetype: 'Main', price: 120 },
    { id: '3', name: 'Cake', description: 'Chocolate dessert', coursetype: 'Dessert', price: 70 },
    { id: '4', name: 'Juice', description: 'Fresh orange juice', coursetype: 'Drink', price: 30 },
  ];

  const filteredMenu =
    selectedCourse === 'All'
      ? sampleMenu
      : sampleMenu.filter((item) => item.coursetype === selectedCourse);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>🔍 Filter Menu by Course</Text>

      <Picker
        selectedValue={selectedCourse}
        onValueChange={(value) => setSelectedCourse(value)}
        style={{ marginBottom: 16 }}
        enabled={true} // ✅ fixes boolean crash
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
        <Picker.Item label="Drink" value="Drink" />
      </Picker>

      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>R{item.price}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('Payment')}>
        <Text style={globalStyles.buttonText}>💳 Go to Payment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('Menu')}>
        <Text style={globalStyles.buttonText}>🍽️ Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffe7cc',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
});

import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, MenuItem } from './type';
import { globalStyles } from './Globalstyles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const mockMenu: MenuItem[] = [
    { id: '1', name: 'Burger', description: 'Juicy beef burger', coursetype: 'Main', price: 85 },
    { id: '2', name: 'Fries', description: 'Crispy golden fries', coursetype: 'Side', price: 30 },
  ];

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>🍔 Welcome to Chris Restaurant</Text>

      <FlatList
        data={mockMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>R{item.price}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('Menu')}>
        <Text style={globalStyles.buttonText}>➡️ Go to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

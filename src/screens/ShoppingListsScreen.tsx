import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addList, deleteList } from '../features/listsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../store';

const ShoppingListsScreen = () => {
  const [listName, setListName] = useState('');
  const dispatch = useDispatch();
  const shoppingLists = useSelector((state: RootState) => state.lists.lists);

  // Save lists to AsyncStorage whenever they change
  useEffect(() => {
    const saveListsToStorage = async () => {
      try {
        await AsyncStorage.setItem('@shoppingLists', JSON.stringify(shoppingLists));
      } catch (error) {
        console.error('Error saving lists:', error);
      }
    };
    saveListsToStorage();
  }, [shoppingLists]);

  // Load lists from AsyncStorage on component mount
  useEffect(() => {
    const loadListsFromStorage = async () => {
      try {
        const storedLists = await AsyncStorage.getItem('@shoppingLists');
        if (storedLists) {
          JSON.parse(storedLists).forEach((list: any) => {
            dispatch(addList(list));
          });
        }
      } catch (error) {
        console.error('Error loading lists:', error);
      }
    };
    loadListsFromStorage();
  }, []);

  const handleAddList = () => {
    if (listName.trim()) {
      const newList = {
        id: Date.now().toString(),
        name: listName,
        items: [],
      };
      dispatch(addList(newList));
      setListName('');
    }
  };

  const handleDeleteList = (id: string) => {
    dispatch(deleteList(id));
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Shopping Lists</Text>
      <TextInput
        placeholder="Enter list name"
        value={listName}
        onChangeText={setListName}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />
      <Button title="Add List" onPress={handleAddList} />

      <FlatList
        data={shoppingLists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
          >
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteList(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ShoppingListsScreen;

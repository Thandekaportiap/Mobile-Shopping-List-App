import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addList, deleteList, addItemToList, removeItemFromList } from '../features/listsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../store';

const ShoppingListsScreen = () => {
  const [listName, setListName] = useState('');
  const [itemName, setItemName] = useState('');
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

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
    setSelectedListId(null); // Deselect the list if it's deleted
  };

  const handleAddItem = () => {
    if (itemName.trim() && selectedListId) {
      const item = {
        id: Date.now().toString(),
        name: itemName,
        purchased: false,
      };
      dispatch(addItemToList({ listId: selectedListId, item }));
      setItemName('');
    } else {
      Alert.alert('Error', 'Please select a list and enter an item name.');
    }
  };

  const handleSelectList = (id: string) => {
    setSelectedListId(id);
    setItemName(''); // Reset item name when selecting a new list
  };

  const handleRemoveItem = (itemId: string) => {
    if (selectedListId) {
      dispatch(removeItemFromList({ listId: selectedListId, itemId }));
    }
  };

  const selectedList = shoppingLists.find((list) => list.id === selectedListId);

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 30, marginBottom: 10, marginTop: 20, fontWeight: 'bold', color: '#778a35' }}>Shopping Lists</Text>
      <TextInput
        placeholder="Enter list name"
        value={listName}
        onChangeText={setListName}
        style={{
          borderWidth: 3,
          borderColor: '#778a35',
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />
     
      <TouchableOpacity style={styles.button} onPress={handleAddList}>
        <Text style={styles.buttonText}>Add List</Text>
      </TouchableOpacity>

      {selectedListId && selectedList ? (
        <View style={{ marginVertical: 20 }}>
          <Text>
  Selected List: <Text style={styles.boldText}>{selectedList.name}</Text>
</Text>
          <TextInput
            placeholder="Enter item name"
            value={itemName}
            onChangeText={setItemName}
            style={{
              borderWidth: 3,
              borderColor: '#778a35',
              padding: 10,
              marginVertical: 10,
              borderRadius: 5,
            }}
          />
       
          <TouchableOpacity style={styles.button} onPress={handleAddItem}>
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>

          {/* Displaying items of the selected list */}
          <Text style={{ marginVertical: 25, fontSize: 20, color: '#d1e2c4' }}>Items in the {selectedList.name} list: {selectedList.items.length}</Text>
          <FlatList
            data={selectedList.items}
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
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                  <Text style={{ color: 'red' }}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ) : (
        <Text style={{ marginVertical: 25, fontSize: 20, color: 'red' }}>Select a list to see its items!</Text>
      )}

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
            <TouchableOpacity onPress={() => handleSelectList(item.id)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteList(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: '#778a35',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  boldText: {
    fontWeight: 'bold',
    color: 'green', 
  },
});

export default ShoppingListsScreen;

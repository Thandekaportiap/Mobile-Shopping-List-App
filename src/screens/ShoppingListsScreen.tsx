import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import {
  addList,
  deleteList,
  addItemToList,
  removeItemFromList,
  editItemInList,
  togglePurchasedStatus,
} from '../features/listsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../store';
import Icon from 'react-native-vector-icons/Feather';

const ShoppingListsScreen = () => {
  const [listName, setListName] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
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
    if (itemName.trim() && quantity.trim() && selectedListId) {
      const newItem = {
        id: Date.now().toString(),
        name: itemName,
        quantity,
        purchased: false,
      };
      dispatch(addItemToList({ listId: selectedListId, item: newItem }));
      setItemName('');
      setQuantity('');
    } else {
      Alert.alert('Error', 'Please enter item name and quantity.');
    }
  };

  const handleRemoveItem = (itemId: string) => {
    if (selectedListId) {
      dispatch(removeItemFromList({ listId: selectedListId, itemId }));
    }
  };

  const handleTogglePurchased = (itemId: string) => {
    if (selectedListId) {
      dispatch(togglePurchasedStatus({ listId: selectedListId, itemId }));
    }
  };

  const handleSelectList = (id: string) => {
    setSelectedListId(id);
    setItemName('');
  };

  const selectedList = shoppingLists.find((list) => list.id === selectedListId);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Lists</Text>
      <TextInput
        placeholder="Enter list name"
        value={listName}
        onChangeText={setListName}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddList}>
        <Text style={styles.buttonText}>Add List</Text>
      </TouchableOpacity>

      {selectedListId && selectedList ? (
        <View style={styles.listDetails}>
          <Text>
            Selected List: <Text style={styles.boldText}>{selectedList.name}</Text>
          </Text>
          <TextInput
            placeholder="Enter item name"
            value={itemName}
            onChangeText={setItemName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter quantity"
            value={quantity}
            onChangeText={setQuantity}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddItem}>
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>

          <Text style={styles.itemCount}>
            Items in {selectedList.name}: {selectedList.items.length}
          </Text>
          <FlatList
            data={selectedList.items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>
                  {item.name} (Qty: {item.quantity})
                </Text>
                {/* <CheckBox
                  value={item.purchased}
                  onValueChange={() => handleTogglePurchased(item.id)}
                /> */}
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ) : (
        <Text style={styles.noSelectionText}>Select a list to see its items!</Text>
      )}

      <FlatList
        data={shoppingLists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.listRow,
              selectedListId === item.id && styles.selectedList,
            ]}
          >
            <TouchableOpacity onPress={() => handleSelectList(item.id)}>
              <Text style={styles.listName}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteList(item.id)} style={styles.iconContainer}>
  <Icon name="trash" size={24} color="#ff0000" />
</TouchableOpacity>

          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 30,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#778a35',
  },
  input: {
    borderWidth: 2,
    borderColor: '#778a35',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#778a35',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  listDetails: {
    marginVertical: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'green',
  },
  itemCount: {
    marginVertical: 15,
    fontSize: 16,
    color: '#d1e2c4',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  itemText: {
    flex: 1,
  },
  removeText: {
    color: 'red',
    marginLeft: 10,
  },
  noSelectionText: {
    marginVertical: 20,
    fontSize: 16,
    color: 'red',
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedList: {
    backgroundColor: '#f0f7e4',
  },
  listName: {
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  iconContainer: {
    padding: 5,
  },
});

export default ShoppingListsScreen;

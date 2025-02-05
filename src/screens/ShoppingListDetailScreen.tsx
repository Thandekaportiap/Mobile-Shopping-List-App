import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToList, removeItemFromList, togglePurchasedStatus, editItemInList } from '../features/listsSlice';
import { RootState } from '../../store';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const ShoppingListDetailScreen = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch();
  const route = useRoute();
  const { listId } = route.params;
  const shoppingLists = useSelector((state: RootState) => state.lists.lists);
  const selectedList = shoppingLists.find((list) => list.id === listId);
  const [editingItem, setEditingItem] = useState(null);

  const handleEditItem = (item) => {
    setEditingItem(item);
  };
  
  const handleSaveEdit = () => {
    if (editingItem && selectedList) {
      dispatch(editItemInList({ listId: selectedList.id, itemId: editingItem.id, updatedItem: editingItem }));
      setEditingItem(null);
      Toast.show({ type: 'success', text1: 'Item updated successfully' });
    }
  };

  const handleAddItem = () => {
    if (itemName.trim() && quantity.trim() && selectedList) {
      const newItem = {
        id: Date.now().toString(),
        name: itemName,
        quantity,
        purchased: false,
      };
      dispatch(addItemToList({ listId: selectedList.id, item: newItem }));
      setItemName('');
      setQuantity('');
      Toast.show({ type: 'success', text1: 'Item added successfully' });
    } else {
      Alert.alert('Error', 'Please enter item name and quantity.');
    }
  };

  const handleRemoveItem = (itemId: string) => {
    if (selectedList) {
      dispatch(removeItemFromList({ listId: selectedList.id, itemId }));
      Toast.show({ type: 'success', text1: 'Item deleted successfully' });
    }
  };

  const handleTogglePurchased = (itemId: string) => {
    if (selectedList) {
      dispatch(togglePurchasedStatus({ listId: selectedList.id, itemId }));
    }
  };

  if (!selectedList) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>List not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedList.name}</Text>
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
            <TouchableOpacity onPress={() => handleTogglePurchased(item.id)}>
              <Icon name={item.purchased ? 'check-square' : 'square'} size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditItem(item)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {editingItem && (
        <Modal visible={true} onRequestClose={() => setEditingItem(null)}>
          <View style={styles.modalContainer}>
            <TextInput
              value={editingItem.name}
              onChangeText={(text) => setEditingItem({ ...editingItem, name: text })}
              style={styles.input}
            />
            <TextInput
              value={editingItem.quantity}
              onChangeText={(text) => setEditingItem({ ...editingItem, quantity: text })}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleSaveEdit} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
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
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
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
  editText: {
    color: 'blue',
    marginLeft: 10,
  },
  removeText: {
    color: 'red',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default ShoppingListDetailScreen;

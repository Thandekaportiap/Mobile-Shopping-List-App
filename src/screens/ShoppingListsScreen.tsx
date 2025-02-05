import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Animated,
  Dimensions 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addList, deleteList } from '../features/listsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../store';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ShoppingListsScreen = () => {
  const [listName, setListName] = useState('');
  const dispatch = useDispatch();
  const shoppingLists = useSelector((state: RootState) => state.lists.lists);
  const navigation = useNavigation();

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

  const renderItem = ({ item }) => {
    const scaleAnim = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <AnimatedTouchable
        style={[
          styles.card,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => navigation.navigate('ShoppingListDetail', { listId: item.id })}
        activeOpacity={1}
      >
        <View style={styles.cardContent}>
          <Text style={styles.listName}>{item.name}</Text>
          <Text style={styles.itemCount}>
            {item.items.length} {item.items.length === 1 ? 'item' : 'items'}
          </Text>
        </View>
        <TouchableOpacity 
          onPress={() => handleDeleteList(item.id)} 
          style={styles.deleteButton}
        >
          <Icon name="trash" size={20} color="#ff0000" />
        </TouchableOpacity>
      </AnimatedTouchable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Lists</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter list name"
          value={listName}
          onChangeText={setListName}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddList}>
          <Text style={styles.buttonText}>Add List</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={shoppingLists}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#778a35',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: '#778a35',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#778a35',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    borderWidth: 2,
    borderColor: '#d1e2c4',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    marginBottom: 8,
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
});

export default ShoppingListsScreen;
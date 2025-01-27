import { createSlice } from '@reduxjs/toolkit';

interface Item {
  id: string;
  name: string;
  quantity: string;
  purchased: boolean;
}

interface ShoppingList {
  id: string;
  name: string;
  items: Item[];
}

interface ListsState {
  lists: ShoppingList[];
}

const initialState: ListsState = {
  lists: [],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },
    addItem: (state, action) => {
      const { listId, item } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      list?.items.push(item);
    },
    editItem: (state, action) => {
      const { listId, itemId, updatedItem } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      const itemIndex = list?.items.findIndex(item => item.id === itemId);
      if (itemIndex !== undefined && itemIndex >= 0) {
        list!.items[itemIndex] = { ...list!.items[itemIndex], ...updatedItem };
      }
    },
    deleteItem: (state, action) => {
      const { listId, itemId } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        list.items = list.items.filter(item => item.id !== itemId);
      }
    },
  },
});

export const { addList, deleteList, addItem, editItem, deleteItem } = listsSlice.actions;
export default listsSlice.reducer;

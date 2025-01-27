import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },
    addItemToList: (state, action) => {
      const { listId, item } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        list.items.push(item);
      }
    },
    removeItemFromList: (state, action) => {
      const { listId, itemId } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        list.items = list.items.filter((item) => item.id !== itemId);
      }
    },
    editItemInList: (state, action) => {
      const { listId, itemId, updatedItem } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        const itemIndex = list.items.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
          list.items[itemIndex] = { ...list.items[itemIndex], ...updatedItem };
        }
      }
    },
    togglePurchasedStatus: (state, action) => {
      const { listId, itemId } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        const item = list.items.find((item) => item.id === itemId);
        if (item) {
          item.purchased = !item.purchased;
        }
      }
    },
  },
});

export const {
  addList,
  deleteList,
  addItemToList,
  removeItemFromList,
  editItemInList,
  togglePurchasedStatus,
} = listsSlice.actions;

export default listsSlice.reducer;

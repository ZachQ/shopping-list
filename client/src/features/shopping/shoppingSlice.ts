import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

interface ShoppingItem {
  id: string;
  itemName: string;
  quantity: number;
  description: string;
  completed: boolean;
}

interface ShoppingState {
  items: ShoppingItem[];
  loading: boolean;
}

const initialState: ShoppingState = {
  items: [],
  loading: false,
};

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<ShoppingItem>) => {
        state.items.push(action.payload);
      },
      prepare: (itemName: string, quantity: number, description: string) => ({
        payload: {
          id: nanoid(),
          itemName,
          quantity,
          description,
          completed: false,
        },
      }),
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    editItem: (state, action: PayloadAction<{ id: string; itemName: string; quantity: number; description: string; completed: boolean }>) => {
      const { id, itemName, quantity, description, completed } = action.payload;
      const existing = state.items.find(item => item.id === id);
      if (existing) {
        existing.itemName = itemName;
        existing.quantity = quantity;
        existing.description = description;
        existing.completed = completed;
      }
    },
    toggleCompleted: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
    setItems: (state, action: PayloadAction<ShoppingItem[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addItem,
  deleteItem,
  editItem,
  toggleCompleted,
  setItems,
  setLoading,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;

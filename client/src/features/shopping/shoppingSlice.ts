import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

interface ShoppingItem {
  id: string;
  name: string;
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
      prepare: (name: string) => ({
        payload: {
          id: nanoid(),
          name,
          completed: false,
        },
      }),
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    editItem: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;
      const existing = state.items.find(item => item.id === id);
      if (existing) {
        existing.name = name;
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

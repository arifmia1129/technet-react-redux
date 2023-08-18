import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
}

const initialState: ICart = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (isExist) {
        if (isExist.quantity) {
          isExist.quantity += 1;
        }
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    },
    decrementProductQuantity: (state, action) => {
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (isExist && isExist.quantity && isExist.quantity > 1) {
        isExist.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, decrementProductQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

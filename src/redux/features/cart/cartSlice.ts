import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
  total: number;
}

const initialState: ICart = {
  products: [],
  total: 0,
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
      state.total += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      if (action.payload.quantity) {
        state.total -= action.payload.price * action.payload.quantity;
      }
    },
    decrementProductQuantity: (state, action) => {
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (isExist && isExist.quantity && isExist.quantity > 1) {
        isExist.quantity -= 1;
        state.total -= action.payload.price;
      }
    },
  },
});

export const { addToCart, removeFromCart, decrementProductQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

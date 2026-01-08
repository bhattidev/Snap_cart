import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGrocery {
  _id: string; // ✅ string on frontend
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
  quantity: number;
}

interface ICartSlice {
  cartData: IGrocery[];
  subTotal: number;
  deliveryFee: number;
  finalTotal: number;
}

const initialState: ICartSlice = {
  cartData: [],
  subTotal: 0,
  deliveryFee: 120,
  finalTotal: 120,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IGrocery>) => {
      const existingItem = state.cartData.find(
        (item) => item._id === action.payload._id
      );
      cartSlice.caseReducers.calculateTotal(state);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartData.push(action.payload);
      }
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id === action.payload);

      if (item) item.quantity += 1;
      cartSlice.caseReducers.calculateTotal(state);
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartData = state.cartData.filter((i) => i._id !== action.payload);
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartData = state.cartData.filter((i) => i._id !== action.payload);
      cartSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal: (state) => {
      state.subTotal = state.cartData.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      );
      state.deliveryFee = state.subTotal > 400 ? 0 : 120;
      state.finalTotal = state.subTotal + state.deliveryFee;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;

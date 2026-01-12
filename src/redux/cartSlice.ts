import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGrocery {
  _id: string;
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
  deliveryFee: 0,
  finalTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IGrocery>) => {
      const existingItem = state.cartData.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartData.push(action.payload);
      }

      cartSlice.caseReducers.calculateTotal(state);
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

      // ✅ Empty cart → no delivery fee
      if (state.cartData.length === 0) {
        state.deliveryFee = 0;
        state.finalTotal = 0;
        return;
      }

      state.deliveryFee = state.subTotal > 400 ? 0 : 120;
      state.finalTotal = state.subTotal + state.deliveryFee;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;

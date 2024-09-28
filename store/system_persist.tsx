import { createSlice } from "@reduxjs/toolkit";

import { ISystemPersistState } from "./interface";

const initialState: ISystemPersistState = {
  token: null,
  isUserInitialized: false,
  uploadedImages: {},
  user: {},
  item: {},
  currentRestaurant: {},
  allRestaurant: [],
  order: {},
  currentMeal: {},
  card: [],
};

export const systemPersistSlice = createSlice({
  initialState,
  name: "system",
  reducers: {
    setToken: (state, action) => {
      return { ...state, token: action.payload };
    },

    removeToken: (state) => {
      return { ...state, token: null };
    },

    reinitializeSystemPersist: (state) => {
      return { ...state, ...initialState };
    },

    setIsUserInitialized: (state) => {
      return { ...state, isUserInitialized: true };
    },

    removeIsUserInitialized: (state) => {
      return { ...state, isUserInitialized: false };
    },

    setUser: (state, action) => {
      return { ...state, user: action.payload };
    },

    removeUser: (state) => {
      return { ...state, user: undefined };
    },
    setItem: (state, action) => {
      return { ...state, item: action.payload };
    },
    setCurrentRestaurant: (state, action) => {
      return { ...state, currentRestaurant: action.payload };
    },
    setAllRestaurant: (state, action) => {
      return { ...state, allRestaurant: action.payload };
    },
    setOrder: (state, action) => {
      return { ...state, order: action.payload };
    },
    setCurrentMeal: (state, action) => {
      return { ...state, currentMeal: action.payload };
    },
    addItem: (state, action) => {
      const existingItem = state.card.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          card: state.card.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          card: [
            ...state.card,
            { ...action.payload, quantity: action.payload.quantity },
          ],
        };
      }
    },

    reduceQuantity: (state, action) => {
      const existingItem = state.card.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return {
            ...state,
            card: state.card.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          };
        } else {
          return {
            ...state,
            card: state.card.filter((item) => item.id !== action.payload.id),
          };
        }
      } else {
        return {
          ...state,
          card: [...state.card, { ...action.payload, quantity: 1 }],
        };
      }
    },

    removeItem: (state, action) => {
      return {
        ...state,
        card: state.card.filter((item) => item.id !== action.payload.id),
      };
    },

    clearCart: (state) => {
      return {
        ...state,
        card: [],
      };
    },

    loadCart: (state, action) => {
      return {
        ...state,
        card: action.payload.card,
      };
    },
  },
});

export const {
  setToken,
  removeToken,
  reinitializeSystemPersist,
  setIsUserInitialized,
  removeIsUserInitialized,
  setUser,
  removeUser,
  setItem,
  setCurrentRestaurant,
  setOrder,
  setCurrentMeal,
  addItem,
  removeItem,
  clearCart,
  loadCart,
  reduceQuantity,
  setAllRestaurant,
} = systemPersistSlice.actions;

export default systemPersistSlice.reducer;

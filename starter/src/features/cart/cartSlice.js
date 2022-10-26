import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { openModal } from './modalSlice'

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
}

/*export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
})*/

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, thunkAPI) => {
    try {
      // console.log(thunkAPI)
      // console.log(thunkAPI.getState())
      // thunkAPI.dispatch(openModal())
      const response = await axios(url)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('There was an error')
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount + 1
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount - 1
    },
    calculateTotals: (state) => {
      const { total, amount } = state.cartItems.reduce(
        (previousValue, currentItem) => {
          const newTotal =
            previousValue.total + currentItem.amount * currentItem.price
          const newAmount = previousValue.amount + currentItem.amount

          return { total: newTotal, amount: newAmount }
        },
        { total: 0, amount: 0 }
      )

      state.total = total
      state.amount = amount
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false
      state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action)
      state.isLoading = false
    },
  },
})

// console.log(cartSlice)

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer

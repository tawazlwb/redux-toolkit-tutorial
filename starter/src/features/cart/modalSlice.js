import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true
    },
    closeModal: (state, action) => {
      state.isOpen = false
    },
  },
})

// console.log(modalSlice)

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer

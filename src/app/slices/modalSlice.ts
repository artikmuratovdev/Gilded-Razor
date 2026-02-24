import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ModalName = 'booking' | 'staff' | 'client' | 'product' | 'payment';

interface ModalState {
  booking: boolean;
  staff: boolean;
  client: boolean;
  product: boolean;
  payment: boolean;
}

const initialState: ModalState = {
  booking: false,
  staff: false,
  client: false,
  product: false,
  payment: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalName>) {
      state[action.payload] = true;
    },
    closeModal(state, action: PayloadAction<ModalName>) {
      state[action.payload] = false;
    },
    setModal(state, action: PayloadAction<{ name: ModalName; open: boolean }>) {
      state[action.payload.name] = action.payload.open;
    },
  },
});

export const { openModal, closeModal, setModal } = modalSlice.actions;
export default modalSlice.reducer;

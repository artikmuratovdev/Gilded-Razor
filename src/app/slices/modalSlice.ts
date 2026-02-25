import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ModalName = 'booking' | 'staff' | 'client' | 'product' | 'payment' | 'deleteClient' | 'editClient' | 'service' | 'deleteService' | 'editService';

interface ClientToDelete {
  id: number;
  name: string;
}

interface ClientToEdit {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone: string;
}

interface ServiceToDelete {
  id: number;
  name: string;
}

interface ServiceToEdit {
  id: number;
  name: string;
  description: string;
  price: string;
  duration_minutes: number;
  is_active: boolean;
}

interface ModalState {
  booking: boolean;
  staff: boolean;
  client: boolean;
  product: boolean;
  payment: boolean;
  deleteClient: boolean;
  editClient: boolean;
  service: boolean;
  deleteService: boolean;
  editService: boolean;
  clientToDelete: ClientToDelete | null;
  clientToEdit: ClientToEdit | null;
  serviceToDelete: ServiceToDelete | null;
  serviceToEdit: ServiceToEdit | null;
}

const initialState: ModalState = {
  booking: false,
  staff: false,
  client: false,
  product: false,
  payment: false,
  deleteClient: false,
  editClient: false,
  service: false,
  deleteService: false,
  editService: false,
  clientToDelete: null,
  clientToEdit: null,
  serviceToDelete: null,
  serviceToEdit: null,
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
    setClientToDelete(state, action: PayloadAction<ClientToDelete | null>) {
      state.clientToDelete = action.payload;
    },
    setClientToEdit(state, action: PayloadAction<ClientToEdit | null>) {
      state.clientToEdit = action.payload;
    },
    setServiceToDelete(state, action: PayloadAction<ServiceToDelete | null>) {
      state.serviceToDelete = action.payload;
    },
    setServiceToEdit(state, action: PayloadAction<ServiceToEdit | null>) {
      state.serviceToEdit = action.payload;
    },
  },
});

export const { openModal, closeModal, setModal, setClientToDelete, setClientToEdit, setServiceToDelete, setServiceToEdit } = modalSlice.actions;
export default modalSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ModalName = 'booking' | 'staff' | 'client' | 'product' | 'payment' | 'deleteClient' | 'editClient' | 'service' | 'deleteService' | 'editService' | 'expense' | 'deleteExpense' | 'editExpense' | 'additionalExpense' | 'deleteAdditionalExpense' | 'editAdditionalExpense';

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

interface ExpenseToDelete {
  id: number;
  name: string;
}

interface ExpenseToEdit {
  id: number;
  name: string;
  price: string;
  description: string;
  reminder_date: string;
}

interface AdditionalExpenseToDelete {
  id: number;
  name: string;
}

interface AdditionalExpenseToEdit {
  id: number;
  name: string;
  price: string;
  description: string;
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
  expense: boolean;
  deleteExpense: boolean;
  editExpense: boolean;
  additionalExpense: boolean;
  deleteAdditionalExpense: boolean;
  editAdditionalExpense: boolean;
  clientToDelete: ClientToDelete | null;
  clientToEdit: ClientToEdit | null;
  serviceToDelete: ServiceToDelete | null;
  serviceToEdit: ServiceToEdit | null;
  expenseToDelete: ExpenseToDelete | null;
  expenseToEdit: ExpenseToEdit | null;
  additionalExpenseToDelete: AdditionalExpenseToDelete | null;
  additionalExpenseToEdit: AdditionalExpenseToEdit | null;
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
  expense: false,
  deleteExpense: false,
  editExpense: false,
  additionalExpense: false,
  deleteAdditionalExpense: false,
  editAdditionalExpense: false,
  clientToDelete: null,
  clientToEdit: null,
  serviceToDelete: null,
  serviceToEdit: null,
  expenseToDelete: null,
  expenseToEdit: null,
  additionalExpenseToDelete: null,
  additionalExpenseToEdit: null,
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
    setExpenseToDelete(state, action: PayloadAction<ExpenseToDelete | null>) {
      state.expenseToDelete = action.payload;
    },
    setExpenseToEdit(state, action: PayloadAction<ExpenseToEdit | null>) {
      state.expenseToEdit = action.payload;
    },
    setAdditionalExpenseToDelete(state, action: PayloadAction<AdditionalExpenseToDelete | null>) {
      state.additionalExpenseToDelete = action.payload;
    },
    setAdditionalExpenseToEdit(state, action: PayloadAction<AdditionalExpenseToEdit | null>) {
      state.additionalExpenseToEdit = action.payload;
    },
  },
});

export const { openModal, closeModal, setModal, setClientToDelete, setClientToEdit, setServiceToDelete, setServiceToEdit, setExpenseToDelete, setExpenseToEdit, setAdditionalExpenseToDelete, setAdditionalExpenseToEdit } = modalSlice.actions;
export default modalSlice.reducer;

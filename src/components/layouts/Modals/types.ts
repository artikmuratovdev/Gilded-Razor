import type { ChangeEvent } from 'react';
import type { RootState } from '@/app/store';
import type { GetClientsRes as ClientsResponse } from '@/app/api/clientsApi/type';
import type { GetClientsRes as ServicesResponse } from '@/app/api/serviceApi/type';
import type { GetStaffRes } from '@/app/api/staffApi/type';
import type { ModalActions } from './SubmitFunctions';
import type { ModalForms, StaffForm } from './FormTypes';

export type ClientOption = ClientsResponse['data'][number];
export type ServiceOption = ServicesResponse['data'][number];
export type StaffOption = GetStaffRes['data'][number];
export type ModalState = RootState['modal'];
export type ForcedStaffRole = StaffForm['specialization'] | undefined;

export interface BookingModalProps {
  isOpen: boolean;
  bookingForm: ModalForms['bookingForm'];
  onSubmit: ModalActions['onBookingSubmit'];
  onClose: () => void;
  filteredClients: ClientOption[];
  filteredServices: ServiceOption[];
  filteredStaff: StaffOption[];
  clientSearch: string;
  serviceSearch: string;
  staffSearch: string;
  selectedClientName: string;
  selectedServiceName: string;
  selectedStaffName: string;
  setClientSearch: (value: string) => void;
  setServiceSearch: (value: string) => void;
  setStaffSearch: (value: string) => void;
  setSelectedClientName: (value: string) => void;
  setSelectedServiceName: (value: string) => void;
  setSelectedStaffName: (value: string) => void;
  handleStartTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ProductModalProps {
  isOpen: boolean;
  productForm: ModalForms['productForm'];
  onSubmit: ModalActions['onProductSubmit'];
  onClose: () => void;
}

export interface QuickAppointmentModalProps {
  isOpen: boolean;
  quickAppointmentForm: ModalForms['quickAppointmentForm'];
  onSubmit: ModalActions['onQuickAppointmentSubmit'];
  onClose: () => void;
}

export interface ClientModalProps {
  isOpen: boolean;
  clientForm: ModalForms['clientForm'];
  onSubmit: ModalActions['onClientSubmit'] | ModalActions['onEditClientSubmit'];
  onClose: () => void;
  title: string;
  description: string;
  submitLabel: string;
}

export interface StaffModalProps {
  isOpen: boolean;
  staffForm: ModalForms['staffForm'];
  onSubmit: ModalActions['onStaffSubmit'];
  onClose: () => void;
  forcedStaffRole: ForcedStaffRole;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DeleteClientModalProps {
  isOpen: boolean;
  clientToDelete: ModalState['clientToDelete'];
  onClose: () => void;
  onDelete: ModalActions['onDeleteSubmit'];
}

export interface ServiceModalProps {
  isOpen: boolean;
  serviceForm: ModalForms['serviceForm'];
  onSubmit: ModalActions['onServiceSubmit'] | ModalActions['onEditServiceSubmit'];
  onClose: () => void;
  title: string;
  description: string;
  submitLabel: string;
}

export interface DeleteServiceModalProps {
  isOpen: boolean;
  serviceToDelete: ModalState['serviceToDelete'];
  onClose: () => void;
  onDelete: ModalActions['onDeleteServiceSubmit'];
}

export interface ExpenseModalProps {
  isOpen: boolean;
  expenseForm: ModalForms['expenseForm'];
  onSubmit: ModalActions['onExpenseSubmit'] | ModalActions['onEditExpenseSubmit'];
  onClose: () => void;
  title: string;
  description: string;
  submitLabel: string;
}

export interface DeleteExpenseModalProps {
  isOpen: boolean;
  expenseToDelete: ModalState['expenseToDelete'];
  onClose: () => void;
  onDelete: ModalActions['onDeleteExpenseSubmit'];
}

export interface AdditionalExpenseModalProps {
  isOpen: boolean;
  additionalExpenseForm: ModalForms['additionalExpenseForm'];
  onSubmit:
    | ModalActions['onAdditionalExpenseSubmit']
    | ModalActions['onEditAdditionalExpenseSubmit'];
  onClose: () => void;
  title: string;
  description: string;
  submitLabel: string;
}

export interface DeleteAdditionalExpenseModalProps {
  isOpen: boolean;
  additionalExpenseToDelete: ModalState['additionalExpenseToDelete'];
  onClose: () => void;
  onDelete: ModalActions['onDeleteAdditionalExpenseSubmit'];
}

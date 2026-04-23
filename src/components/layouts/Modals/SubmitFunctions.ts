import { useAddAppoitmentMutation, useQuickAddAppoitmentMutation } from '@/app/api/appoitmentsApi/appoitmentsApi';
import type { AddAppoitmentReq, QuickAddAppoitmentReq } from '@/app/api/appoitmentsApi/type';
import { useCreateClientMutation, useDeleteClientMutation, useUpdateClientMutation } from '@/app/api/clientsApi/clientsApi';
import type { CreateClientReq, MutationRes } from '@/app/api/clientsApi/type';
import { useCreateServiceMutation, useDeleteServiceMutation, useUpdateServiceMutation } from '@/app/api/serviceApi/serviceApi';
import type { CreateServiceReq } from '@/app/api/serviceApi/type';
import { useAddExpensesMutation, useDeleteExpensesMutation, useUpdateExpensesMutation } from '@/app/api/Expenses/Expenses';
import type { addExpensesReq } from '@/app/api/Expenses/type';
import { useAddAdditionalExpensesMutation, useDeleteAdditionalExpensesMutation, useUpdateAdditionalExpensesMutation } from '@/app/api/additionalExpenses/additionalExpenses';
import type { addAdditionalExpensesReq } from '@/app/api/additionalExpenses/type';
import { closeModal, setClientToDelete, setClientToEdit, setServiceToDelete, setServiceToEdit, setExpenseToDelete, setExpenseToEdit, setAdditionalExpenseToDelete, setAdditionalExpenseToEdit } from '@/app/slices/modalSlice';
import { useHandleRequest } from '@/hooks/HandleRequest/useHandleRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import type {
  BookingForm,
  ClientForm,
  ServiceForm,
  ExpenseForm,
  AdditionalExpenseForm,
  ModalForms,
  QuickAppointmentForm,
  ProductForm,
  StaffForm,
} from './FormTypes';
import type { RootState } from '@/app/store';
import type { CreateStaffReq } from '@/app/api/staffApi/type';
import { useCreateStaffMutation } from '@/app/api/staffApi/staffApi';
import { toast } from 'sonner';

const useModalActions = ({
  bookingForm,
  quickAppointmentForm,
  productForm,
  clientForm,
  staffForm,
  serviceForm,
  expenseForm,
  additionalExpenseForm,
}: ModalForms) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleRequest = useHandleRequest();
  const [createAppointment] = useAddAppoitmentMutation();
  const [quickCreateAppointment] = useQuickAddAppoitmentMutation();
  const [createClient] = useCreateClientMutation();
  const [deleteClient] = useDeleteClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [createService] = useCreateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [createStaff] = useCreateStaffMutation();
  const [createExpense] = useAddExpensesMutation();
  const [deleteExpense] = useDeleteExpensesMutation();
  const [updateExpense] = useUpdateExpensesMutation();
  const [createAdditionalExpense] = useAddAdditionalExpensesMutation();
  const [deleteAdditionalExpense] = useDeleteAdditionalExpensesMutation();
  const [updateAdditionalExpense] = useUpdateAdditionalExpensesMutation();
  const clientToDelete = useSelector((state: RootState) => state.modal.clientToDelete);
  const clientToEdit = useSelector((state: RootState) => state.modal.clientToEdit);
  const serviceToDelete = useSelector((state: RootState) => state.modal.serviceToDelete);
  const serviceToEdit = useSelector((state: RootState) => state.modal.serviceToEdit);
  const expenseToDelete = useSelector((state: RootState) => state.modal.expenseToDelete);
  const expenseToEdit = useSelector((state: RootState) => state.modal.expenseToEdit);
  const additionalExpenseToDelete = useSelector((state: RootState) => state.modal.additionalExpenseToDelete);
  const additionalExpenseToEdit = useSelector((state: RootState) => state.modal.additionalExpenseToEdit);

  const clearParams = (keys: string[]) => {
    const params = new URLSearchParams(searchParams);
    keys.forEach((key) => params.delete(key));
    setSearchParams(params);
  };

  // --- Close Handlers ---

  const handleCloseBooking = () => {
    dispatch(closeModal('booking'));
    clearParams(['booking', 'date', 'time', 'barberId']);
  };

  const handleCloseStaff = () => {
    dispatch(closeModal('staff'));
    clearParams(['staff']);
  };

  const handleCloseClient = () => {
    dispatch(closeModal('client'));
    clearParams(['client']);
  };

  const handleCloseProduct = () => {
    dispatch(closeModal('product'));
    clearParams(['product']);
  };

  const handleClosePayment = () => {
    dispatch(closeModal('payment'));
  };

  const handleCloseQuickAppointment = () => {
    dispatch(closeModal('quickAppointment'));
  };

  const handleCloseDeleteClient = () => {
    dispatch(closeModal('deleteClient'));
    dispatch(setClientToDelete(null));
  };

  const handleCloseEditClient = () => {
    dispatch(closeModal('editClient'));
    dispatch(setClientToEdit(null));
  };

  const handleCloseService = () => {
    dispatch(closeModal('service'));
  };

  const handleCloseDeleteService = () => {
    dispatch(closeModal('deleteService'));
    dispatch(setServiceToDelete(null));
  };

  const handleCloseEditService = () => {
    dispatch(closeModal('editService'));
    dispatch(setServiceToEdit(null));
  };

  const handleCloseExpense = () => {
    dispatch(closeModal('expense'));
  };

  const handleCloseDeleteExpense = () => {
    dispatch(closeModal('deleteExpense'));
    dispatch(setExpenseToDelete(null));
  };

  const handleCloseEditExpense = () => {
    dispatch(closeModal('editExpense'));
    dispatch(setExpenseToEdit(null));
  };

  const handleCloseAdditionalExpense = () => {
    dispatch(closeModal('additionalExpense'));
  };

  const handleCloseDeleteAdditionalExpense = () => {
    dispatch(closeModal('deleteAdditionalExpense'));
    dispatch(setAdditionalExpenseToDelete(null));
  };

  const handleCloseEditAdditionalExpense = () => {
    dispatch(closeModal('editAdditionalExpense'));
    dispatch(setAdditionalExpenseToEdit(null));
  };

  // --- Submit Handlers ---

  const onBookingSubmit = (data: BookingForm) => {
    console.log('Booking submitted:', data);

    const payload: AddAppoitmentReq = {
      client: data.client,
      staff_member: data.staff_member,
      service: data.service,
      date: data.date,
      start_time: data.start_time,
      end_time: data.end_time,
      price: data.price.toString(),
      status: data.status,
      notes: data.notes,
    };

    handleRequest({
      request: async () => await createAppointment(payload),
      onSuccess: (res: MutationRes) => {
        console.log('Booking created successfully:', res.message);
        toast.success('Bron muvaffaqiyatli yaratildi');
        handleCloseBooking();
        bookingForm.reset();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onProductSubmit = (data: ProductForm) => {
    console.log('Product submitted:', data);
    handleCloseProduct();
    productForm.reset();
  };

  const onQuickAppointmentSubmit = (data: QuickAppointmentForm) => {
    const payload: QuickAddAppoitmentReq = {
      client: data.client,
      staff_member: data.staff_member,
      price: data.price,
    };

    handleRequest({
      request: async () => await quickCreateAppointment(payload),
      onSuccess: () => {
        toast.success('Tezkor bron muvaffaqiyatli yaratildi');
        handleCloseQuickAppointment();
        quickAppointmentForm.reset();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onClientSubmit = (data: ClientForm) => {
    console.log('Client submitted:', data);
    const payload: CreateClientReq = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
    };
    handleRequest({
      request: async () => await createClient(payload),
      onSuccess: (res: MutationRes) => {
        console.log('Client created successfully:', res);
        toast.success('Mijoz muvaffaqiyatli yaratildi');
        handleCloseClient();
        clientForm.reset();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onStaffSubmit = (data: StaffForm) => {
    console.log('Staff submitted:', data);
    const payload: CreateStaffReq = {
      name: data.name,
      specialization: data.specialization,
      phone_number: data.phone_number,
      commission_rate: data.commission_rate.toString(),
    };
    handleRequest({
      request: async () => await createStaff(payload),
      onSuccess: (res: MutationRes) => {
        console.log('Staff created successfully:', res);
        toast.success('Xodim muvaffaqiyatli yaratildi');
        handleCloseStaff();
        staffForm.reset();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onDeleteSubmit = () => {
    if (!clientToDelete) return;
    
    handleRequest({
      request: async () => await deleteClient(String(clientToDelete.id)),
      onSuccess: (res: MutationRes) => {
        console.log('Client deleted successfully:', res);
        toast.success(res.message || 'Mijoz muvaffaqiyatli o\'chirildi');
        handleCloseDeleteClient();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onEditClientSubmit = (data: ClientForm) => {
    if (!clientToEdit) return;
    
    const payload: Partial<CreateClientReq> = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
    };
    
    handleRequest({
      request: async () => await updateClient({ id: String(clientToEdit.id), body: payload }),
      onSuccess: (res: MutationRes) => {
        console.log('Client updated successfully:', res);
        toast.success(res.message || 'Mijoz muvaffaqiyatli yangilandi');
        handleCloseEditClient();
        clientForm.reset();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onServiceSubmit = (data: ServiceForm) => {
    const payload: CreateServiceReq = {
      name: data.name,
      description: data.description,
      price: data.price,
      duration_minutes: data.duration_minutes,
      is_active: data.is_active ?? true,
    };
    
    handleRequest({
      request: async () => await createService(payload),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (res: any) => {
        console.log('Service created successfully:', res);
        toast.success('Xizmat muvaffaqiyatli yaratildi');
        handleCloseService();
        serviceForm.reset();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onDeleteServiceSubmit = () => {
    if (!serviceToDelete) return;
    
    handleRequest({
      request: async () => await deleteService(String(serviceToDelete.id)),
      onSuccess: (res: MutationRes) => {
        console.log('Service deleted successfully:', res);
        toast.success('Xizmat muvaffaqiyatli o\'chirildi');
        handleCloseDeleteService();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onEditServiceSubmit = (data: ServiceForm) => {
    if (!serviceToEdit) return;
    
    const payload: Partial<CreateServiceReq> = {
      name: data.name,
      description: data.description,
      price: data.price,
      duration_minutes: data.duration_minutes,
      is_active: data.is_active,
    };
    
    handleRequest({
      request: async () => await updateService({ id: String(serviceToEdit.id), body: payload }),
      onSuccess: (res: MutationRes) => {
        console.log('Service updated successfully:', res);
        toast.success('Xizmat muvaffaqiyatli yangilandi');
        handleCloseEditService();
        serviceForm.reset();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onExpenseSubmit = (data: ExpenseForm) => {
    const payload: addExpensesReq = {
      name: data.name,
      description: data.description,
      price: data.price,
      reminder_date: data.reminder_date,
    };
    
    handleRequest({
      request: async () => await createExpense(payload),
      onSuccess: (res: MutationRes) => {
        console.log('Expense created successfully:', res);
        toast.success('Xarajat muvaffaqiyatli yaratildi');
        handleCloseExpense();
        expenseForm.reset();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onDeleteExpenseSubmit = () => {
    if (!expenseToDelete) return;
    
    handleRequest({
      request: async () => await deleteExpense(expenseToDelete.id),
      onSuccess: (res: MutationRes) => {
        console.log('Expense deleted successfully:', res);
        toast.success('Xarajat muvaffaqiyatli o\'chirildi');
        handleCloseDeleteExpense();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onEditExpenseSubmit = (data: ExpenseForm) => {
    if (!expenseToEdit) return;
    
    const payload: addExpensesReq = {
      name: data.name,
      description: data.description,
      price: data.price,
      reminder_date: data.reminder_date,
    };
    
    handleRequest({
      request: async () => await updateExpense({ id: String(expenseToEdit.id), body: payload }),
      onSuccess: (res: MutationRes) => {
        console.log('Expense updated successfully:', res);
        toast.success('Xarajat muvaffaqiyatli yangilandi');
        handleCloseEditExpense();
        expenseForm.reset();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onAdditionalExpenseSubmit = (data: AdditionalExpenseForm) => {
    const payload: addAdditionalExpensesReq = {
      name: data.name,
      description: data.description,
      price: data.price,
    };
    
    handleRequest({
      request: async () => await createAdditionalExpense(payload),
      onSuccess: (res: MutationRes) => {
        console.log('Additional expense created successfully:', res);
        toast.success('Qo\'shimcha xarajat muvaffaqiyatli yaratildi');
        handleCloseAdditionalExpense();
        additionalExpenseForm.reset();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onDeleteAdditionalExpenseSubmit = () => {
    if (!additionalExpenseToDelete) return;
    
    handleRequest({
      request: async () => await deleteAdditionalExpense(additionalExpenseToDelete.id),
      onSuccess: (res: MutationRes) => {
        console.log('Additional expense deleted successfully:', res);
        toast.success('Qo\'shimcha xarajat muvaffaqiyatli o\'chirildi');
        handleCloseDeleteAdditionalExpense();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const onEditAdditionalExpenseSubmit = (data: AdditionalExpenseForm) => {
    if (!additionalExpenseToEdit) return;
    
    const payload: addAdditionalExpensesReq = {
      name: data.name,
      description: data.description,
      price: data.price,
    };
    
    handleRequest({
      request: async () => await updateAdditionalExpense({ id: String(additionalExpenseToEdit.id), body: payload }),
      onSuccess: (res: MutationRes) => {
        console.log('Additional expense updated successfully:', res);
        toast.success('Qo\'shimcha xarajat muvaffaqiyatli yangilandi');
        handleCloseEditAdditionalExpense();
        additionalExpenseForm.reset();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  return {
    handleCloseBooking,
    handleCloseStaff,
    handleCloseClient,
    handleCloseProduct,
    handleClosePayment,
    handleCloseQuickAppointment,
    handleCloseDeleteClient,
    handleCloseEditClient,
    handleCloseService,
    handleCloseDeleteService,
    handleCloseEditService,
    handleCloseExpense,
    handleCloseDeleteExpense,
    handleCloseEditExpense,
    handleCloseAdditionalExpense,
    handleCloseDeleteAdditionalExpense,
    handleCloseEditAdditionalExpense,
    onBookingSubmit,
    onProductSubmit,
    onQuickAppointmentSubmit,
    onClientSubmit,
    onStaffSubmit,
    onDeleteSubmit,
    onEditClientSubmit,
    onServiceSubmit,
    onDeleteServiceSubmit,
    onEditServiceSubmit,
    onExpenseSubmit,
    onDeleteExpenseSubmit,
    onEditExpenseSubmit,
    onAdditionalExpenseSubmit,
    onDeleteAdditionalExpenseSubmit,
    onEditAdditionalExpenseSubmit,
  };
};

export default useModalActions;
export type ModalActions = ReturnType<typeof useModalActions>;

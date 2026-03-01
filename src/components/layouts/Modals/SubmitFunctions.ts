import { useAddAppoitmentMutation } from '@/app/api/appoitmentsApi/appoitmentsApi';
import type { AddAppoitmentReq } from '@/app/api/appoitmentsApi/type';
import { useCreateClientMutation, useDeleteClientMutation, useUpdateClientMutation } from '@/app/api/clientsApi/clientsApi';
import type { CreateClientReq, MutationRes } from '@/app/api/clientsApi/type';
import { useCreateServiceMutation, useDeleteServiceMutation, useUpdateServiceMutation } from '@/app/api/serviceApi/serviceApi';
import type { CreateServiceReq } from '@/app/api/serviceApi/type';
import { closeModal, setClientToDelete, setClientToEdit, setServiceToDelete, setServiceToEdit } from '@/app/slices/modalSlice';
import { useHandleRequest } from '@/hooks/HandleRequest/useHandleRequest';
import type { UseFormReturn } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import type {
  BookingForm,
  ClientForm,
  ProductForm,
  StaffForm,
  ServiceForm,
} from './FormTypes';
import type { RootState } from '@/app/store';
import type { CreateStaffReq } from '@/app/api/staffApi/type';
import { useCreateStaffMutation } from '@/app/api/staffApi/staffApi';

interface ModalForms {
  bookingForm: UseFormReturn<BookingForm>;
  productForm: UseFormReturn<ProductForm>;
  clientForm: UseFormReturn<ClientForm>;
  staffForm: UseFormReturn<StaffForm>;
  serviceForm: UseFormReturn<ServiceForm>;
}

const useModalActions = ({
  bookingForm,
  productForm,
  clientForm,
  staffForm,
  serviceForm,
}: ModalForms) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleRequest = useHandleRequest();
  const [createAppointment] = useAddAppoitmentMutation();
  const [createClient] = useCreateClientMutation();
  const [deleteClient] = useDeleteClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [createService] = useCreateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [createStaff] = useCreateStaffMutation();
  const clientToDelete = useSelector((state: RootState) => state.modal.clientToDelete);
  const clientToEdit = useSelector((state: RootState) => state.modal.clientToEdit);
  const serviceToDelete = useSelector((state: RootState) => state.modal.serviceToDelete);
  const serviceToEdit = useSelector((state: RootState) => state.modal.serviceToEdit);

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
      onSuccess: (res: any) => {
        console.log('Booking created successfully:', res);
        handleCloseBooking();
        bookingForm.reset();
      },
    });
  };

  const onProductSubmit = (data: ProductForm) => {
    console.log('Product submitted:', data);
    handleCloseProduct();
    productForm.reset();
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
        handleCloseClient();
        clientForm.reset();
      },
    });
  };

  const onStaffSubmit = (data: StaffForm) => {
    console.log('Staff submitted:', data);
    const payload: CreateStaffReq = {
      name: data.name,
      specialization: data.role,
      phone: data.phone,
      commission_rate: data.commission.toString(),
    };
    handleRequest({
      request: async () => await createStaff(payload),
      onSuccess: (res: MutationRes) => {
        console.log('Staff created successfully:', res);
        handleCloseStaff();
        staffForm.reset();
      },
    });
  };

  const onDeleteSubmit = () => {
    if (!clientToDelete) return;
    
    handleRequest({
      request: async () => await deleteClient(String(clientToDelete.id)),
      onSuccess: (res: MutationRes) => {
        console.log('Client deleted successfully:', res);
        handleCloseDeleteClient();
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
        handleCloseEditClient();
        clientForm.reset();
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
      onSuccess: (res: any) => {
        console.log('Service created successfully:', res);
        handleCloseService();
        serviceForm.reset();
      },
    });
  };

  const onDeleteServiceSubmit = () => {
    if (!serviceToDelete) return;
    
    handleRequest({
      request: async () => await deleteService(String(serviceToDelete.id)),
      onSuccess: (res: MutationRes) => {
        console.log('Service deleted successfully:', res);
        handleCloseDeleteService();
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
        handleCloseEditService();
        serviceForm.reset();
      },
    });
  };

  return {
    handleCloseBooking,
    handleCloseStaff,
    handleCloseClient,
    handleCloseProduct,
    handleClosePayment,
    handleCloseDeleteClient,
    handleCloseEditClient,
    handleCloseService,
    handleCloseDeleteService,
    handleCloseEditService,
    onBookingSubmit,
    onProductSubmit,
    onClientSubmit,
    onStaffSubmit,
    onDeleteSubmit,
    onEditClientSubmit,
    onServiceSubmit,
    onDeleteServiceSubmit,
    onEditServiceSubmit,
  };
};

export default useModalActions;

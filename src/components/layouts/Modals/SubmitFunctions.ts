import { useAddAppoitmentMutation } from '@/app/api/appoitmentsApi/appoitmentsApi';
import type { AddAppoitmentReq } from '@/app/api/appoitmentsApi/type';
import { useCreateClientMutation } from '@/app/api/clientsApi/clientsApi';
import type { CreateClientReq, MutationRes } from '@/app/api/clientsApi/type';
import { closeModal } from '@/app/slices/modalSlice';
import { useHandleRequest } from '@/hooks/HandleRequest/useHandleRequest';
import type { UseFormReturn } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router';
import type {
  BookingForm,
  ClientForm,
  ProductForm,
  StaffForm,
} from './FormTypes';

interface ModalForms {
  bookingForm: UseFormReturn<BookingForm>;
  productForm: UseFormReturn<ProductForm>;
  clientForm: UseFormReturn<ClientForm>;
  staffForm: UseFormReturn<StaffForm>;
}

const useModalActions = ({
  bookingForm,
  productForm,
  clientForm,
  staffForm,
}: ModalForms) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleRequest = useHandleRequest();
  const [createAppointment] = useAddAppoitmentMutation();
  const [createClient] = useCreateClientMutation();

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
      price: data.price,
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
    handleCloseStaff();
    staffForm.reset();
  };

  return {
    handleCloseBooking,
    handleCloseStaff,
    handleCloseClient,
    handleCloseProduct,
    handleClosePayment,
    onBookingSubmit,
    onProductSubmit,
    onClientSubmit,
    onStaffSubmit,
  };
};

export default useModalActions;

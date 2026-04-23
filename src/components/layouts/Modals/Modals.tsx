import type { RootState } from '@/app/store';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useGetClientsQuery } from '@/app/api/clientsApi/clientsApi';
import { useGetServiceQuery } from '@/app/api/serviceApi/serviceApi';
import { useGetAllStaffQuery } from '@/app/api/staffApi/staffApi';
import useModalForms from './FormTypes';
import useModalActions from './SubmitFunctions';
import AdditionalExpenseModal from './AdditionalExpenseModal';
import BookingModal from './BookingModal';
import ClientModal from './ClientModal';
import DeleteAdditionalExpenseModal from './DeleteAdditionalExpenseModal';
import DeleteClientModal from './DeleteClientModal';
import DeleteExpenseModal from './DeleteExpenseModal';
import DeleteServiceModal from './DeleteServiceModal';
import ExpenseModal from './ExpenseModal';
import PaymentModal from './PaymentModal';
import ProductModal from './ProductModal';
import QuickAppointmentModal from './QuickAppointmentModal';
import ServiceModal from './ServiceModal';
import StaffModal from './StaffModal';
import type { ClientOption, ServiceOption } from './types';

const Modals = () => {
  const forms = useModalForms();
  const { bookingForm, quickAppointmentForm, productForm, clientForm, staffForm, serviceForm, expenseForm, additionalExpenseForm } =
    forms;
  const actions = useModalActions(forms);
  const {
    booking: newBooking,
    quickAppointment: newQuickAppointment,
    staff: newStaff,
    client: newClient,
    product: newProduct,
    payment: newPayment,
    deleteClient,
    clientToDelete,
    editClient,
    clientToEdit,
    service: newService,
    deleteService,
    serviceToDelete,
    editService,
    serviceToEdit,
    expense: newExpense,
    deleteExpense,
    expenseToDelete,
    editExpense,
    expenseToEdit,
    additionalExpense: newAdditionalExpense,
    deleteAdditionalExpense,
    additionalExpenseToDelete,
    editAdditionalExpense,
    additionalExpenseToEdit,
  } = useSelector((state: RootState) => state.modal);
  const location = useLocation();

  const [clientSearch, setClientSearch] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [staffSearch, setStaffSearch] = useState('');
  const [selectedClientName, setSelectedClientName] = useState('');
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const [selectedStaffName, setSelectedStaffName] = useState('');

  const { data: clientsData } = useGetClientsQuery({ page: 1, page_size: 100, search: clientSearch });
  const { data: servicesData } = useGetServiceQuery({ page: 1, page_size: 100, search: serviceSearch });
  const { data: staffData } = useGetAllStaffQuery({ page: 1, page_size: 100, search: staffSearch });

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    bookingForm.setValue('start_time', value);
    if (value) {
      const [hours, minutes] = value.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes + 40;
      const endHours = Math.floor(totalMinutes / 60) % 24;
      const endMinutes = totalMinutes % 60;
      bookingForm.setValue(
        'end_time',
        `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`,
      );
    }
  };

  const filteredClients =
    clientsData?.data?.filter((client: ClientOption) =>
      `${client.first_name} ${client.last_name}`.toLowerCase().includes(clientSearch.toLowerCase()),
    ) || [];

  const filteredServices =
    servicesData?.data?.filter((service: ServiceOption) =>
      service.name.toLowerCase().includes(serviceSearch.toLowerCase()),
    ) || [];

  const filteredStaff =
    staffData?.data?.filter((staff) => staff.name.toLowerCase().includes(staffSearch.toLowerCase())) || [];

  const forcedStaffRole =
    location.pathname === '/staff/kids'
      ? 'kids'
      : location.pathname === '/staff/masters'
        ? 'master_barber'
        : undefined;

  useEffect(() => {
    if (newBooking) {
      bookingForm.reset({
        client: bookingForm.getValues('client'),
        staff_member: 0,
        service: 0,
        date: '',
        start_time: '',
        end_time: '',
        price: 0,
        status: 'pending',
        notes: '',
      });
    }
  }, [newBooking, bookingForm]);

  const resetBookingSearchState = () => {
    setSelectedClientName('');
    setSelectedServiceName('');
    setSelectedStaffName('');
    setClientSearch('');
    setServiceSearch('');
    setStaffSearch('');
  };

  const handleBookingClose = () => {
    resetBookingSearchState();
    actions.handleCloseBooking();
  };

  useEffect(() => {
    if (newStaff) {
      staffForm.reset({
        name: '',
        specialization: forcedStaffRole ?? 'barber',
        phone_number: '',
        commission_rate: 45,
      });
    }
  }, [newStaff, forcedStaffRole, staffForm]);

  useEffect(() => {
    if (editClient && clientToEdit) {
      clientForm.reset({
        firstName: clientToEdit.first_name,
        lastName: clientToEdit.last_name,
        email: clientToEdit.email || '',
        phone: clientToEdit.phone,
      });
    }
  }, [editClient, clientToEdit, clientForm]);

  useEffect(() => {
    if (editService && serviceToEdit) {
      serviceForm.reset({
        name: serviceToEdit.name,
        description: serviceToEdit.description,
        price: serviceToEdit.price,
        duration_minutes: serviceToEdit.duration_minutes,
        is_active: serviceToEdit.is_active,
      });
    }
  }, [editService, serviceToEdit, serviceForm]);

  useEffect(() => {
    if (editExpense && expenseToEdit) {
      expenseForm.reset({
        name: expenseToEdit.name,
        description: expenseToEdit.description,
        price: expenseToEdit.price,
        reminder_date: expenseToEdit.reminder_date,
      });
    }
  }, [editExpense, expenseToEdit, expenseForm]);

  useEffect(() => {
    if (editAdditionalExpense && additionalExpenseToEdit) {
      additionalExpenseForm.reset({
        name: additionalExpenseToEdit.name,
        description: additionalExpenseToEdit.description,
        price: additionalExpenseToEdit.price,
      });
    }
  }, [editAdditionalExpense, additionalExpenseToEdit, additionalExpenseForm]);

  return (
    <>
      <BookingModal
        isOpen={newBooking}
        bookingForm={bookingForm}
        onSubmit={actions.onBookingSubmit}
        onClose={handleBookingClose}
        filteredClients={filteredClients}
        filteredServices={filteredServices}
        filteredStaff={filteredStaff}
        clientSearch={clientSearch}
        serviceSearch={serviceSearch}
        staffSearch={staffSearch}
        selectedClientName={selectedClientName}
        selectedServiceName={selectedServiceName}
        selectedStaffName={selectedStaffName}
        setClientSearch={setClientSearch}
        setServiceSearch={setServiceSearch}
        setStaffSearch={setStaffSearch}
        setSelectedClientName={setSelectedClientName}
        setSelectedServiceName={setSelectedServiceName}
        setSelectedStaffName={setSelectedStaffName}
        handleStartTimeChange={handleStartTimeChange}
      />

      <QuickAppointmentModal
        isOpen={newQuickAppointment}
        quickAppointmentForm={quickAppointmentForm}
        onSubmit={actions.onQuickAppointmentSubmit}
        onClose={actions.handleCloseQuickAppointment}
      />

      <ProductModal
        isOpen={newProduct}
        productForm={productForm}
        onSubmit={actions.onProductSubmit}
        onClose={actions.handleCloseProduct}
      />

      <ClientModal
        isOpen={newClient}
        clientForm={clientForm}
        onSubmit={actions.onClientSubmit}
        onClose={actions.handleCloseClient}
        title="Yangi Mijoz Qo'shish"
        description='Yangi mijoz profili yarating.'
        submitLabel='Profil Yaratish'
      />

      <ClientModal
        isOpen={editClient}
        clientForm={clientForm}
        onSubmit={actions.onEditClientSubmit}
        onClose={actions.handleCloseEditClient}
        title='Mijozni Tahrirlash'
        description="Mijoz ma'lumotlarini yangilang."
        submitLabel='Saqlash'
      />

      <StaffModal
        isOpen={newStaff}
        staffForm={staffForm}
        onSubmit={actions.onStaffSubmit}
        onClose={actions.handleCloseStaff}
        forcedStaffRole={forcedStaffRole}
      />
  
      <PaymentModal isOpen={newPayment} onClose={actions.handleClosePayment} />

      <DeleteClientModal
        isOpen={deleteClient}
        clientToDelete={clientToDelete}
        onClose={actions.handleCloseDeleteClient}
        onDelete={actions.onDeleteSubmit}
      />

      <ServiceModal
        isOpen={newService}
        serviceForm={serviceForm}
        onSubmit={actions.onServiceSubmit}
        onClose={actions.handleCloseService}
        title="Yangi Xizmat Qo'shish"
        description='Yangi xizmat yarating.'
        submitLabel="Xizmat Qo'shish"
      />

      <ServiceModal
        isOpen={editService}
        serviceForm={serviceForm}
        onSubmit={actions.onEditServiceSubmit}
        onClose={actions.handleCloseEditService}
        title='Xizmatni Tahrirlash'
        description="Xizmat ma'lumotlarini yangilang."
        submitLabel='Saqlash'
      />

      <DeleteServiceModal
        isOpen={deleteService}
        serviceToDelete={serviceToDelete}
        onClose={actions.handleCloseDeleteService}
        onDelete={actions.onDeleteServiceSubmit}
      />

      <ExpenseModal
        isOpen={newExpense}
        expenseForm={expenseForm}
        onSubmit={actions.onExpenseSubmit}
        onClose={actions.handleCloseExpense}
        title="Do'kon Xarajati Qo'shish"
        description="Yangi do'kon xarajatini yarating."
        submitLabel="Xarajat Qo'shish"
      />

      <ExpenseModal
        isOpen={editExpense}
        expenseForm={expenseForm}
        onSubmit={actions.onEditExpenseSubmit}
        onClose={actions.handleCloseEditExpense}
        title='Xarajatni Tahrirlash'
        description="Xarajat ma'lumotlarini yangilang."
        submitLabel='Saqlash'
      />

      <DeleteExpenseModal
        isOpen={deleteExpense}
        expenseToDelete={expenseToDelete}
        onClose={actions.handleCloseDeleteExpense}
        onDelete={actions.onDeleteExpenseSubmit}
      />

      <AdditionalExpenseModal
        isOpen={newAdditionalExpense}
        additionalExpenseForm={additionalExpenseForm}
        onSubmit={actions.onAdditionalExpenseSubmit}
        onClose={actions.handleCloseAdditionalExpense}
        title="Qo'shimcha Xarajat Qo'shish"
        description="Yangi qo'shimcha xarajatni yarating."
        submitLabel="Xarajat Qo'shish"
      />

      <AdditionalExpenseModal
        isOpen={editAdditionalExpense}
        additionalExpenseForm={additionalExpenseForm}
        onSubmit={actions.onEditAdditionalExpenseSubmit}
        onClose={actions.handleCloseEditAdditionalExpense}
        title="Qo'shimcha Xarajatni Tahrirlash"
        description="Qo'shimcha xarajat ma'lumotlarini yangilang."
        submitLabel='Saqlash'
      />

      <DeleteAdditionalExpenseModal
        isOpen={deleteAdditionalExpense}
        additionalExpenseToDelete={additionalExpenseToDelete}
        onClose={actions.handleCloseDeleteAdditionalExpense}
        onDelete={actions.onDeleteAdditionalExpenseSubmit}
      />
    </>
  );
};

export default Modals;

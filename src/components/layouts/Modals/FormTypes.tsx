import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

const bookingSchema = z.object({
  client: z.number().min(1, 'Mijoz talab qilinadi'),
  staff_member: z.number().min(1, 'Sartarosh tanlanishi shart'),
  service: z.number().min(1, 'Xizmat tanlanishi shart'),
  date: z.string().min(1, 'Sana talab qilinadi'),
  start_time: z.string().min(1, 'Boshlanish vaqti talab qilinadi'),
  end_time: z.string().min(1, 'Tugash vaqti talab qilinadi'),
  price: z.number().min(1, 'Narx talab qilinadi'),
  status: z.enum(['cancelled' , 'completed' , 'confirmed' , 'no_show' , 'pending']),
  notes: z.string().optional(),
});

const productSchema = z.object({
  name: z.string().min(2, 'Mahsulot nomi talab qilinadi'),
  category: z.string().min(1, 'Kategoriya tanlanishi shart'),
  price: z.number().min(0, "Narx manfiy bo'lmasligi kerak"),
  stock: z.number().min(0, "Zaxira manfiy bo'lmasligi kerak"),
  minStock: z.number().min(0, "Min zaxira manfiy bo'lmasligi kerak"),
});

const clientSchema = z.object({
  firstName: z.string().min(2, 'Ism talab qilinadi'),
  lastName: z.string().min(2, 'Familiya talab qilinadi'),
  email: z.email("Noto'g'ri email format").or(z.literal("")),
  phone: z
    .string()
    .min(13, "To'liq telefon raqam kiriting")
    .regex(/^\+998\d{9}$/, 'Format: +998XXXXXXXXX'),
});

const staffSchema = z.object({
  name: z.string().min(2, 'Ism talab qilinadi'),
  specialization: z.enum(['barber', 'kids', 'master_barber']),
  phone_number: z
    .string()
    .min(13, "To'liq telefon raqam kiriting")
    .regex(/^\+998\d{9}$/, 'Format: +998XXXXXXXXX'),
  commission_rate: z.number().min(0).max(100),
});

const serviceSchema = z.object({
  name: z.string().min(2, 'Xizmat nomi talab qilinadi'),
  description: z.string().min(5, 'Tavsif kamida 5 belgidan iborat bo\'lishi kerak'),
  price: z.string().min(1, 'Narx talab qilinadi'),
  duration_minutes: z.number().min(1, 'Davomiylik talab qilinadi'),
  is_active: z.boolean().optional(),
});

const expenseSchema = z.object({
  name: z.string().min(2, 'Xarajat nomi talab qilinadi'),
  description: z.string().min(5, 'Tavsif kamida 5 belgidan iborat bo\'lishi kerak'),
  price: z.string().min(1, 'Narx talab qilinadi'),
  reminder_date: z.string().min(1, 'Eslatma sanasi talab qilinadi'),
});

const additionalExpenseSchema = z.object({
  name: z.string().min(2, 'Xarajat nomi talab qilinadi'),
  description: z.string().min(5, 'Tavsif kamida 5 belgidan iborat bo\'lishi kerak'),
  price: z.string().min(1, 'Narx talab qilinadi'),
});

// --- Types ---

export type BookingForm = z.infer<typeof bookingSchema>;
export type ProductForm = z.infer<typeof productSchema>;
export type ClientForm = z.infer<typeof clientSchema>;
export type StaffForm = z.infer<typeof staffSchema>;
export type ServiceForm = z.infer<typeof serviceSchema>;
export type ExpenseForm = z.infer<typeof expenseSchema>;
export type AdditionalExpenseForm = z.infer<typeof additionalExpenseSchema>;

// --- Custom Hook ---

const useModalForms = () => {
  const bookingForm = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      client: 0,
      staff_member: 0,
      service: 0,
      date: '',
      start_time: '',
      end_time: '',
      price: 0,
      status: 'pending',
      notes: '',
    },
  });

  const productForm = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: '',
      price: 0,
      stock: 0,
      minStock: 10,
    },
  });

  const clientForm = useForm<ClientForm>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  const staffForm = useForm<StaffForm>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: '',
      specialization: 'barber',
      phone_number: '',
      commission_rate: 45,
    },
  });

  const serviceForm = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      duration_minutes: 30,
      is_active: true,
    },
  });

  const expenseForm = useForm<ExpenseForm>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      reminder_date: '',
    },
  });

  const additionalExpenseForm = useForm<AdditionalExpenseForm>({
    resolver: zodResolver(additionalExpenseSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
    },
  });

  return { bookingForm, productForm, clientForm, staffForm, serviceForm, expenseForm, additionalExpenseForm };
};

export default useModalForms;

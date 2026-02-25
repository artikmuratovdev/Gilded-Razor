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
  price: z.string().min(1, 'Narx talab qilinadi'),
  status: z.string().optional(),
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
  email: z.string().email("Noto'g'ri email format").or(z.literal("")),
  phone: z
    .string()
    .min(10, "Telefon raqami kamida 10 ta belgidan iborat bo'lishi kerak"),
});

const staffSchema = z.object({
  name: z.string().min(2, 'Ism talab qilinadi'),
  role: z.string().min(1, 'Lavozim talab qilinadi'),
  phone: z.string().min(10, "To'g'ri telefon raqam talab qilinadi"),
  commission: z.number().min(0).max(100),
});

// --- Types ---

export type BookingForm = z.infer<typeof bookingSchema>;
export type ProductForm = z.infer<typeof productSchema>;
export type ClientForm = z.infer<typeof clientSchema>;
export type StaffForm = z.infer<typeof staffSchema>;

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
      price: '',
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
      role: '',
      phone: '',
      commission: 45,
    },
  });

  return { bookingForm, productForm, clientForm, staffForm };
};

export default useModalForms;

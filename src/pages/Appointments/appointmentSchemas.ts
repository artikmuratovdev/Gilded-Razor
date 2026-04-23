import z from 'zod';

export const editAppointmentSchema = z.object({
  client: z.string().min(1, 'Mijoz tanlanishi shart'),
  barber: z.string().min(1, 'Sartarosh tanlanishi shart'),
  service: z.string().min(1, 'Xizmat tanlanishi shart'),
  date: z.string().min(1, 'Sana talab qilinadi'),
  start_time: z.string().min(1, 'Boshlanish vaqti talab qilinadi'),
  end_time: z.string().min(1, 'Tugash vaqti talab qilinadi'),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled', 'no_show']),
  price: z.number().min(0, "Narx manfiy bo'lmasligi kerak"),
});

export type EditForm = z.infer<typeof editAppointmentSchema>;

# Gilded Razor

Jasur Barber uchun React + TypeScript asosidagi admin panel. Ilova mijozlar,
bronlar, xodimlar, xizmatlar, xarajatlar, hisobotlar va sozlamalarni boshqarish
uchun yaratilgan.

## Texnologiyalar

- React 19, TypeScript, Vite
- React Router 7
- Redux Toolkit va RTK Query
- React Hook Form va Zod
- Tailwind CSS 4
- shadcn/base-ui uslubidagi shared UI komponentlar
- Recharts, lucide-react, sonner

## Ishga tushirish

```bash
yarn install
yarn dev
```

Production build:

```bash
yarn build
```

Lint:

```bash
yarn lint
```

API manzili `.env` faylidagi `VITE_API_URL` orqali olinadi va
`src/constants/serverUrl.ts` ichida ishlatiladi.

## Loyiha Tuzilishi

```text
src/
  app/
    api/              RTK Query API endpointlari
    slices/           Redux slice'lari
    hooks.ts          Redux typed hook'lari
    store.ts          Redux store konfiguratsiyasi
    tokenManager.ts   access/refresh token bilan ishlash
  components/
    layouts/          MainLayout, Sidebar va global modal oynalar
    ui/               Qayta ishlatiladigan UI komponentlar
  constants/          Menu, API tag va server konfiguratsiyalari
  hooks/              Sahifalar uchun custom hook'lar
  lib/                Utility funksiyalar
  pages/              Route sahifalari
  types/              Umumiy TypeScript typelar
```

## Asosiy Qatlamlar

`src/main.tsx` ilovani `BrowserRouter`, Redux `Provider` va `Toaster` bilan
o'raydi. `src/App.tsx` route'larni e'lon qiladi va himoyalangan sahifalarda
`PrivateRoute`dan foydalanadi.

`src/components/layouts/MainLayout.tsx` umumiy admin panel skeletini beradi:
sidebar, header/content va global modal konteynerlar shu qatlam orqali ishlaydi.
`Sidebar.tsx` navigatsiya va "Tezkor Bron" modalini ochish tugmasini saqlaydi.

API qatlamida `src/app/api/baseApi/baseApi.ts` umumiy RTK Query base query'ni
yaratadi. U `VITE_API_URL`ga request yuboradi, access tokenni headerga qo'shadi
va 401/token xatolarida refresh token orqali requestni qayta urinadi.

Har bir domen uchun alohida API modul bor:

- `authApi` - login va tokenlar
- `clientsApi` - mijozlar CRUD
- `appoitmentsApi` - bronlar va tezkor bron yaratish
- `staffApi` - xodimlar
- `serviceApi` - xizmatlar
- `Expenses` va `additionalExpenses` - xarajatlar
- `reportApi`, `dashboardApi` - hisobot va dashboard ma'lumotlari

## Sahifalar

- `Dashboard` - KPI kartalar, daromad grafigi va so'nggi bronlar
- `Appointments` - bronlar ro'yxati, filterlar va appointment modallari
- `Clients` - mijozlar jadvali va filterlari
- `Staff` - barber, kids va master barber bo'limlari
- `Services` - xizmatlar/inventar boshqaruvi
- `Expenses` - do'kon va qo'shimcha xarajatlar
- `Reports` - metrikalar va grafiklar
- `Settings` - profil, xavfsizlik va notification sozlamalari
- `Academy` - akademiya bo'limi

## Modal Va Formlar

Global modal holati `src/app/slices/modalSlice.ts`da saqlanadi. Modal
komponentlari `src/components/layouts/Modals/` ichida joylashgan.

`FormTypes.tsx` React Hook Form va Zod schema'larini saqlaydi.
`SubmitFunctions.ts` esa form submit jarayonlarini API mutationlar bilan
bog'laydi va muvaffaqiyat/xato holatlarida toast chiqaradi.

## Tezkor Bron

Sidebar'dagi "Tezkor Bron" tugmasi `quickAppointment` modalini ochadi.
`QuickAppointmentModal.tsx` ichida mijoz, xodim va narx kiritiladi.

Mijoz maydoni ikki holatni qo'llaydi:

- mavjud mijoz tanlansa, `useQuickAddAppoitmentMutation` payloadida
  `client` sifatida mijozning `id` qiymati yuboriladi;
- mijoz ro'yxatda bo'lmasa, inputga yozilgan matn `client` sifatida string
  ko'rinishida yuboriladi.

Shu sabab `QuickAddAppoitmentReq.client` turi `number | string` qilib
belgilangan.

Request body mavjud mijoz uchun quyidagicha bo'ladi:

```json
{
  "client": 12,
  "staff_member": 3,
  "price": "65000"
}
```

Yangi mijoz kiritilganda `client` maydoniga inputdagi matn yuboriladi:

```json
{
  "client": "Ali Valiyev",
  "staff_member": 3,
  "price": "65000"
}
```

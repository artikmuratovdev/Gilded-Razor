import { cn } from '@/lib/utils';
import React, { useCallback } from 'react';

export interface PhoneInputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'value' | 'type'> {
  label?: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * +998 (__) ___ __ __ formatida telefon raqam kiritish uchun komponent.
 * react-hook-form bilan ishlatish uchun Controller yoki setValue/onChange pattern'ini ishlating.
 *
 * Saqlaniladigan qiymat: +998XXXXXXXXX (9 raqam, faqat sonlar)
 * Ko'rinadigan format: +998 (XX) XXX XX XX
 */

// Raw digits dan display formatiga o'tkazish
const formatDisplay = (digits: string): string => {
  // Faqat 9 raqamni olamiz
  const d = digits.slice(0, 9);
  if (d.length === 0) return '';
  let result = '';
  if (d.length <= 2) {
    result = `(${d}`;
  } else if (d.length <= 5) {
    result = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  } else if (d.length <= 7) {
    result = `(${d.slice(0, 2)}) ${d.slice(2, 5)} ${d.slice(5)}`;
  } else {
    result = `(${d.slice(0, 2)}) ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7)}`;
  }
  return result;
};

// +998XXXXXXXXX formatidan faqat 9 ta raqamni ajratib olamiz
const extractDigits = (phoneValue: string): string => {
  const cleaned = phoneValue.replace(/\D/g, '');
  // Agar 998 bilan boshlansa, uni olib tashlaymiz
  if (cleaned.startsWith('998')) {
    return cleaned.slice(3, 12);
  }
  return cleaned.slice(0, 9);
};

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, label, error, value = '', onChange, onFocus, onKeyDown, ...props }, ref) => {
    // value prop'dan digits ajratib olamiz (could be +998XXXXXXXXX or raw digits)
    const digits = extractDigits(value || '');
    const displayValue = digits ? `+998 ${formatDisplay(digits)}` : '';

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;

        // Agar foydalanuvchi +998 prefiksini o'chirmoqchi bo'lsa, to'xtatamiz
        if (raw.length < 5 && digits.length > 0) {
          // Barcha digits'ni o'chirmoqchi — bo'shatamiz
          onChange?.('+998');
          return;
        }

        // +998 dan keyin kelgan qismdan digits olamiz
        const afterPrefix = raw.replace(/^\+998\s?/, '');
        const newDigits = afterPrefix.replace(/\D/g, '').slice(0, 9);

        onChange?.(`+998${newDigits}`);
      },
      [digits, onChange],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Backspace: agar faqat +998 qolgan bo'lsa, o'chirishni bloklash
        if (e.key === 'Backspace' && digits.length === 0) {
          e.preventDefault();
        }
        onKeyDown?.(e);
      },
      [digits, onKeyDown],
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        // Cursor'ni oxiriga o'tkazish
        const len = e.target.value.length;
        setTimeout(() => e.target.setSelectionRange(len, len), 0);
        onFocus?.(e);
      },
      [onFocus],
    );

    return (
      <div className='space-y-2'>
        {label && (
          <label className='text-xs font-semibold uppercase tracking-wider text-primary/80 ml-1'>
            {label}
          </label>
        )}
        <div className='relative group'>
          <input
            ref={ref}
            type='tel'
            inputMode='numeric'
            value={displayValue || '+998 '}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder='+998 (__) ___ __ __'
            className={cn(
              'flex h-12 w-full rounded-xl border border-white/5 bg-surface-light px-3 py-2 text-sm text-white shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-light/80',
              error && 'border-red-500/50 focus-visible:ring-red-500',
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className='text-xs text-red-400 ml-1'>{error}</p>}
      </div>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';

import { X } from 'lucide-react';
import React, { type JSX, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  icon,
}: ModalProps): JSX.Element | null => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {createPortal(
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
            onClick={onClose}
          />

          {/* Content */}
          <div className='relative w-full max-w-lg transform rounded-2xl bg-surface border border-white/10 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200'>
            <button
              onClick={onClose}
              className='absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors'
            >
              <X className='h-5 w-5' />
            </button>

            <div className='p-8'>
              <div className='mb-6 text-center'>
                {icon && (
                  <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-light border border-primary/20 shadow-[0_0_15px_rgba(212,175,53,0.15)]'>
                    {icon}
                  </div>
                )}
                <h2 className='text-2xl font-bold text-white'>{title}</h2>
                {description && (
                  <p className='mt-2 text-sm text-gray-400'>{description}</p>
                )}
              </div>
              {children}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

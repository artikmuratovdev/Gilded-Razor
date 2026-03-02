import { X } from 'lucide-react';
import React, { type JSX, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';

/** Returns true when the viewport is >= 640 px (Tailwind `sm`) */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

/** Shared header rendered inside both desktop modal and mobile drawer */
const ModalHeader = ({
  icon,
  title,
  description,
}: Pick<ModalProps, 'icon' | 'title' | 'description'>) => (
  <div className='mb-4 text-center'>
    {icon && (
      <div className='mx-auto mb-3 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-surface-light border border-primary/20 shadow-[0_0_15px_rgba(212,175,53,0.15)]'>
        <span className='[&>svg]:h-6 [&>svg]:w-6'>{icon}</span>
      </div>
    )}
    <h2 className='text-xl font-bold text-white'>{title}</h2>
    {description && <p className='mt-1 text-xs text-gray-400'>{description}</p>}
  </div>
);

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  icon,
}: ModalProps): JSX.Element | null => {
  const isDesktop = useIsDesktop();

  /* Lock body scroll on desktop only (vaul handles it on mobile) */
  useEffect(() => {
    if (!isDesktop) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isDesktop]);

  /* ── Desktop: centered dialog ─────────────────────────────────── */
  if (isDesktop) {
    if (!isOpen) return null;

    return (
      <>
        {createPortal(
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div
              className='absolute inset-0 bg-black/70 backdrop-blur-sm'
              onClick={onClose}
            />
            <div className='relative w-full max-w-lg rounded-2xl bg-surface border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90dvh] flex flex-col'>
              <button
                onClick={onClose}
                className='absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors'
              >
                <X className='h-5 w-5' />
              </button>
              <div className='overflow-y-auto flex-1 overscroll-contain p-6 sm:p-8'>
                <ModalHeader icon={icon} title={title} description={description} />
                {children}
              </div>
            </div>
          </div>,
          document.body,
        )}
      </>
    );
  }

  /* ── Mobile: vaul Drawer (bottom-sheet) ───────────────────────── */
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className='bg-surface border-white/10 text-white max-h-[92dvh] flex flex-col'>
        {/* DrawerClose button */}
        <DrawerClose asChild>
          <button className='absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors touch-manipulation'>
            <X className='h-5 w-5' />
          </button>
        </DrawerClose>

        {/* Scrollable content */}
        <div className='overflow-y-auto flex-1 overscroll-contain px-4 pb-6 pt-2'>
          {/* Hidden but required for accessibility */}
          <DrawerHeader className='sr-only'>
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>

          <ModalHeader icon={icon} title={title} description={description} />
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-primary/80 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-xl border border-white/5 bg-surface-light px-3 py-2 text-sm text-white shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-light/80",
              (icon ? "pl-14" : ""),
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string, icon?: React.ReactNode }>(
  ({ className, label, icon, children, ...props }, ref) => {
     return (
        <div className="space-y-2">
            {label && (
            <label className="text-xs font-semibold uppercase tracking-wider text-primary/80 ml-1">
                {label}
            </label>
            )}
            <div className="relative group">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                {icon}
                </div>
            )}
            <select
                className={cn(
                "flex h-12 w-full appearance-none rounded-xl border border-white/5 bg-surface-light px-3 py-2 text-sm text-white shadow-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-light/80",
                icon && "pl-11",
                className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </select>
             <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            </div>
        </div>
     )
  }
)
Select.displayName = "Select";

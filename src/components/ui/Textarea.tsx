import React, { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full rounded-[10px] border bg-bg px-4 py-3 text-[15px] text-ink-900 transition-all placeholder:text-text-tertiary focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-bg-subtle disabled:text-text-tertiary ${
          error 
            ? 'border-rose focus:border-rose focus:ring-rose' 
            : 'border-border focus:border-accent focus:ring-accent'
        } ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

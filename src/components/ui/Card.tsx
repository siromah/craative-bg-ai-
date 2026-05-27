import React from 'react';

export function Card({ className = '', children, hover = false, ...props }: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  const hoverClasses = hover ? 'transition-all hover:shadow-sm hover:-translate-y-[1px]' : '';
  return (
    <div className={`bg-white border border-border rounded-lg shadow-xs ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-5 pt-5 pb-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-5 pb-5 pt-0 border-t border-border mt-auto ${className}`} {...props}>
      {children}
    </div>
  );
}

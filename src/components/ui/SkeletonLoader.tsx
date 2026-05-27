import React from 'react';

type SkeletonVariant = 'text' | 'card' | 'avatar' | 'list';

export interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

export function SkeletonLoader({ variant = 'card', className = '', ...props }: SkeletonLoaderProps) {
  const baseClasses = 'animate-pulse bg-ink-100 rounded-sm';

  if (variant === 'text') {
    return <div className={`${baseClasses} h-4 w-full ${className}`} {...props} />;
  }

  if (variant === 'avatar') {
    return <div className={`${baseClasses} h-10 w-10 !rounded-full ${className}`} {...props} />;
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-3 ${className}`} {...props}>
        <div className={`${baseClasses} h-4 w-3/4`} />
        <div className={`${baseClasses} h-4 w-5/6`} />
        <div className={`${baseClasses} h-4 w-2/3`} />
      </div>
    );
  }

  // card variant (default)
  return (
    <div className={`border border-border rounded-lg p-5 flex flex-col gap-4 ${className}`} {...props}>
      <div className="flex items-center gap-3">
        <div className={`${baseClasses} h-10 w-10 !rounded-full`} />
        <div className="space-y-2 flex-1">
          <div className={`${baseClasses} h-4 w-1/3`} />
          <div className={`${baseClasses} h-3 w-1/4`} />
        </div>
      </div>
      <div className="space-y-2 flex-1 mt-2">
        <div className={`${baseClasses} h-4 w-full`} />
        <div className={`${baseClasses} h-4 w-full`} />
        <div className={`${baseClasses} h-4 w-2/3`} />
      </div>
    </div>
  );
}

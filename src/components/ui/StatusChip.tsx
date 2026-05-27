import React from 'react';

type StatusType = 'upcoming' | 'live' | 'ended' | 'draft';

export interface StatusChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusType;
  label?: string;
}

export function StatusChip({ status, label, className = '', ...props }: StatusChipProps) {
  const baseClasses = 'inline-flex items-center justify-center text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm';
  
  const statusConfig = {
    upcoming: {
      classes: 'bg-accent-light text-accent-text',
      defaultLabel: 'UPCOMING'
    },
    live: {
      classes: 'bg-emerald-light text-emerald-text',
      defaultLabel: 'LIVE'
    },
    ended: {
      classes: 'bg-ink-100 text-ink-400',
      defaultLabel: 'ENDED'
    },
    draft: {
      classes: 'bg-amber-light text-amber-text',
      defaultLabel: 'DRAFT'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`${baseClasses} ${config.classes} ${className}`} {...props}>
      {status === 'live' && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald mr-1.5 animate-pulse" />
      )}
      {label || config.defaultLabel}
    </span>
  );
}

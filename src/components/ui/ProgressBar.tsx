import React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  label?: string;
  showPercent?: boolean;
}

export function ProgressBar({ value, label, showPercent = false, className = '', ...props }: ProgressBarProps) {
  const clampValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={`w-full flex flex-col ${className}`} {...props}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center text-[12px] text-text-secondary mb-1">
          {label && <span>{label}</span>}
          {showPercent && <span>{clampValue}%</span>}
        </div>
      )}
      <div className="w-full bg-ink-100 h-[6px] rounded-[3px] overflow-hidden">
        <div 
          className="h-full bg-accent transition-all duration-400 ease-in-out rounded-[3px]" 
          style={{ width: `${clampValue}%` }}
        />
      </div>
    </div>
  );
}

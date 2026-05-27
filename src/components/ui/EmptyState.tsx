import React from 'react';
import { Search, Sparkles, MessageSquare, Calendar, FolderOpen } from 'lucide-react';

type EmptyVariant = 'search' | 'prompts' | 'posts' | 'events' | 'generic';

export interface EmptyStateProps {
  variant?: EmptyVariant;
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ variant = 'generic', icon: customIcon, title, description, action, className = '' }: EmptyStateProps) {
  const renderIcon = () => {
    if (customIcon) return customIcon;
    const props = { size: 40, className: "text-ink-300" };
    switch (variant) {
      case 'search': return <Search {...props} />;
      case 'prompts': return <Sparkles {...props} />;
      case 'posts': return <MessageSquare {...props} />;
      case 'events': return <Calendar {...props} />;
      default: return <FolderOpen {...props} />;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`}>
      <div className="w-20 h-20 bg-bg-subtle rounded-full flex items-center justify-center mb-4 text-ink-300">
        {renderIcon()}
      </div>
      <h3 className="text-[18px] font-medium text-text-primary mb-2">{title}</h3>
      <p className="text-[14px] text-text-secondary max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

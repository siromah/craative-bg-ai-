import React from 'react';
import { Toast } from './ui/Toast';

export default function ToastContainer({ toasts }: { toasts: any[] }) {
  return (
    <div className="fixed bottom-8 right-8 z-[300] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <Toast 
          key={t.id} 
          id={t.id} 
          message={t.msg} 
          variant={t.isError ? 'error' : 'success'} 
          duration={3200}
          onDismiss={() => {}} // App.tsx handles removal
        />
      ))}
    </div>
  );
}

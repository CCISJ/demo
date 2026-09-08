'use client';

import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-band px-6 py-12 text-center">
      {icon && <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-ink-faint ring-1 ring-slate-200">{icon}</div>}
      <p className="text-sm font-semibold text-brand-900">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-ink-mute">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

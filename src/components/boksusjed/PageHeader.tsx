import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  showBack?: boolean;
  rightSlot?: ReactNode;
  sticky?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  showLogo = false,
  showBack = false,
  rightSlot,
  sticky = true,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      className={`${sticky ? 'sticky top-0 z-30' : ''} border-b border-rule bg-paper/95 px-4 pb-3 pt-4 backdrop-blur-md lg:px-8 lg:pb-4 lg:pt-6`}
    >
      <div className="page-container flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {showBack && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="tap-scale mb-2 inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-ink-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus lg:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              Natrag
            </button>
          )}
          {showLogo && (
            <div className="mb-1 flex items-center gap-2 lg:hidden">
              <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-btn)] bg-accent font-display text-sm font-bold text-accent-ink">
                B
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-ink">BokSusjed</span>
            </div>
          )}
          <h1 className="truncate font-display text-xl font-semibold tracking-tight text-ink lg:text-2xl">
            {title}
          </h1>
          {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
        </div>
        {rightSlot}
      </div>
    </header>
  );
}

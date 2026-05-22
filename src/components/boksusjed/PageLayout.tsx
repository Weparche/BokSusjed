import type { ReactNode } from 'react';
import { MapPin, Users } from 'lucide-react';
import { neighborhood, profileStats } from '../../data/boksusjedMock';
import { InviteCta, TrustBanner, WarmCrossLink } from './Banners';

export function DesktopAside() {
  return (
    <aside className="hidden w-72 shrink-0 flex-col gap-4 lg:flex xl:w-80">
      <TrustBanner />

      <div className="surface-card p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-btn)] bg-accent-soft text-accent">
            <MapPin className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display font-semibold text-ink">{neighborhood.name}</p>
            <p className="text-sm text-muted">{neighborhood.city} · Samo tvoj kvart</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-2">
          Saznaj što se događa u kvartu. Obavijesti, preporuke i pomoć susjeda na jednom mjestu.
        </p>
      </div>

      <WarmCrossLink
        to="/boksusjed/preporuke"
        title="⭐ Preporuke susjeda"
        description="Usluge kojima susjedi vjeruju — majstori, djeca, ljubimci..."
      />

      <div className="surface-card p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
          <Users className="h-4 w-4 text-accent" />
          Aktivnost u kvartu
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: profileStats.posts, label: 'objava' },
            { value: profileStats.help, label: 'pomoći' },
            { value: profileStats.recommendations, label: 'preporuka' },
            { value: profileStats.comments, label: 'komentara' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[var(--radius-input)] bg-paper-3 px-3 py-2 text-center">
              <p className="font-display text-lg font-semibold text-accent">{stat.value}</p>
              <p className="text-[10px] font-medium text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <InviteCta />
    </aside>
  );
}

interface PageLayoutProps {
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}

export function PageLayout({ children, aside, className = '' }: PageLayoutProps) {
  return (
    <div className={`flex min-h-0 flex-1 flex-col pb-24 lg:pb-8 ${className}`}>
      <div className="flex min-h-0 flex-1 gap-8 lg:px-8 lg:pt-2">
        <div className="min-w-0 flex-1">{children}</div>
        {aside ?? <DesktopAside />}
      </div>
    </div>
  );
}

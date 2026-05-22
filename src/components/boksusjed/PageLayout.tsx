import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';
import { neighborhood, profileStats } from '../../data/boksusjedMock';
import { InviteCta, TrustBanner } from './Banners';

export function DesktopAside() {
  return (
    <aside className="hidden w-72 shrink-0 flex-col gap-4 lg:flex xl:w-80">
      <TrustBanner />

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-brand-600">
            <MapPin className="h-5 w-5" />
          </span>
          <div>
            <p className="font-bold text-slate-900">{neighborhood.name}</p>
            <p className="text-sm text-slate-500">{neighborhood.city} · Samo tvoj kvart</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Saznaj što se događa u kvartu. Obavijesti, preporuke i pomoć susjeda na jednom mjestu.
        </p>
      </div>

      <Link
        to="/boksusjed/preporuke"
        className="block rounded-[1.25rem] border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-4 text-sm font-semibold text-amber-900 transition hover:shadow-md"
      >
        ⭐ Preporuke susjeda
        <span className="mt-1 block text-xs font-normal text-amber-800/80">
          Usluge kojima susjedi vjeruju — majstori, djeca, ljubimci...
        </span>
      </Link>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
          <Users className="h-4 w-4 text-brand-600" />
          Aktivnost u kvartu
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: profileStats.posts, label: 'objava' },
            { value: profileStats.help, label: 'pomoći' },
            { value: profileStats.recommendations, label: 'preporuka' },
            { value: profileStats.comments, label: 'komentara' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-slate-50 px-3 py-2 text-center">
              <p className="text-lg font-extrabold text-brand-600">{stat.value}</p>
              <p className="text-[10px] font-medium text-slate-500">{stat.label}</p>
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

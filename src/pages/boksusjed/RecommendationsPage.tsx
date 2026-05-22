import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import { serviceRecommendations } from '../../data/boksusjedMock';
import type { ServiceCategory } from '../../types/boksusjed';
import { SERVICE_CATEGORIES } from '../../utils/postHelpers';
import { pillTransition } from '../../utils/motion';
import { AnimatedList, AnimatedListItem } from '../../components/boksusjed/AnimatedList';
import { EmptyState } from '../../components/boksusjed/EmptyState';
import { PageLayout } from '../../components/boksusjed/PageLayout';
import { PageHeader } from '../../components/boksusjed/PageHeader';
import { SearchBar } from '../../components/boksusjed/SearchBar';
import { ServiceCard } from '../../components/boksusjed/ServiceCard';

export function RecommendationsPage() {
  const reduced = useReducedMotion();
  const transition = pillTransition(!!reduced);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ServiceCategory | 'all'>('all');

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return serviceRecommendations.filter((svc) => {
      const matchesCategory = category === 'all' || svc.category === category;
      const matchesSearch =
        !query ||
        svc.name.toLowerCase().includes(query) ||
        svc.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <PageLayout aside={null}>
      <PageHeader
        title="Preporuke susjeda"
        subtitle="Usluge kojima susjedi vjeruju."
        showBack
      />

      <div className="page-container space-y-4 px-4 pt-3 lg:px-0 lg:pt-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Pretraži usluge (npr. vodoinstalater, čuvanje djece...)"
        />

        <div className="scrollbar-hide flex flex-wrap gap-2 pb-1">
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = category === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'text-white' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="serviceCategoryPill"
                    className="absolute inset-0 rounded-full bg-brand-600 shadow-md"
                    transition={transition}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full border border-slate-200 bg-white" />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Preporučili susjedi
        </p>
      </div>

      <div className="page-container mt-2 px-4 lg:px-0">
        {filtered.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="Nema rezultata za pretragu."
            description="Pokušaj drugu kategoriju ili pojam."
          />
        ) : (
          <AnimatedList listKey={`${category}-${search}`} className="card-grid">
            {filtered.map((service) => (
              <AnimatedListItem key={service.id}>
                <ServiceCard service={service} />
              </AnimatedListItem>
            ))}
          </AnimatedList>
        )}
      </div>
    </PageLayout>
  );
}

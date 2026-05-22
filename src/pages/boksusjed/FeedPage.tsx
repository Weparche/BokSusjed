import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, SearchX } from 'lucide-react';
import { neighborhood } from '../../data/boksusjedMock';
import type { FeedFilter } from '../../types/boksusjed';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { FEED_FILTERS, matchesFeedFilter } from '../../utils/postHelpers';
import { AnimatedList, AnimatedListItem } from '../../components/boksusjed/AnimatedList';
import { InviteCta, OnboardingBanner, TrustBanner } from '../../components/boksusjed/Banners';
import { EmptyState } from '../../components/boksusjed/EmptyState';
import { FilterPills } from '../../components/boksusjed/FilterPills';
import { PageLayout } from '../../components/boksusjed/PageLayout';
import { PageHeader } from '../../components/boksusjed/PageHeader';
import { PostCard } from '../../components/boksusjed/PostCard';
import { LocationChip, SearchBar } from '../../components/boksusjed/SearchBar';

export function FeedPage() {
  const { posts } = useBoksusjed();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FeedFilter>('all');
  const [showOnboarding, setShowOnboarding] = useState(true);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = matchesFeedFilter(post.type, filter);
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tag?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [posts, search, filter]);

  return (
    <PageLayout>
      <PageHeader
        title="Moj kvart"
        subtitle="Saznaj što se događa u Trešnjevci"
        showLogo
        rightSlot={
          <span className="lg:hidden">
            <LocationChip name={neighborhood.name} />
          </span>
        }
      />

      <div className="page-container space-y-4 px-4 pt-3 lg:px-0 lg:pt-4">
        <SearchBar value={search} onChange={setSearch} />

        <OnboardingBanner visible={showOnboarding} onDismiss={() => setShowOnboarding(false)} />

        <div className="mobile-only space-y-4">
          <TrustBanner />
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Saznaj što se događa u kvartu
          </p>
          <FilterPills
            items={FEED_FILTERS}
            active={filter}
            onChange={setFilter}
            layoutId="feedFilterPill"
          />
        </div>

        <Link
          to="/boksusjed/preporuke"
          className="mobile-only tap-scale block rounded-[1.25rem] border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 text-sm font-semibold text-amber-900 hover:shadow-sm"
        >
          ⭐ Preporuke susjeda — usluge kojima vjerujemo →
        </Link>

        <div className="mobile-only">
          <InviteCta />
        </div>
      </div>

      <div className="page-container mt-4 px-4 lg:px-0">
        {filteredPosts.length === 0 ? (
          <EmptyState
            icon={search ? SearchX : Inbox}
            title={search ? 'Nema rezultata za pretragu.' : 'Nema objava u ovoj kategoriji.'}
            description={
              search
                ? 'Pokušaj s drugim pojmom ili pitaj susjede.'
                : 'Budi prvi susjed koji će podijeliti nešto korisno.'
            }
          />
        ) : (
          <AnimatedList listKey={`${filter}-${search}`} className="card-grid">
            {filteredPosts.map((post) => (
              <AnimatedListItem key={post.id}>
                <PostCard post={post} />
              </AnimatedListItem>
            ))}
          </AnimatedList>
        )}
      </div>
    </PageLayout>
  );
}

import { useMemo, useState } from 'react';
import { HandHeart, SearchX } from 'lucide-react';
import type { HelpFilter } from '../../types/boksusjed';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { HELP_FILTERS, matchesHelpFilter } from '../../utils/postHelpers';
import { AnimatedList, AnimatedListItem } from '../../components/boksusjed/AnimatedList';
import { HelpInfoBanner } from '../../components/boksusjed/Banners';
import { EmptyState } from '../../components/boksusjed/EmptyState';
import { FilterPills } from '../../components/boksusjed/FilterPills';
import { PageLayout } from '../../components/boksusjed/PageLayout';
import { PageHeader } from '../../components/boksusjed/PageHeader';
import { HelpCard } from '../../components/boksusjed/HelpCard';

export function HelpPage() {
  const { posts } = useBoksusjed();
  const [filter, setFilter] = useState<HelpFilter>('help_needed');

  const helpPosts = useMemo(() => {
    const helpTypes = ['help_needed', 'help_offered', 'giveaway'] as const;
    return posts.filter(
      (p) =>
        helpTypes.includes(p.type as (typeof helpTypes)[number]) ||
        p.title.toLowerCase().includes('posuđ') ||
        p.tag?.toLowerCase().includes('alat') === true,
    );
  }, [posts]);

  const filtered = useMemo(
    () => helpPosts.filter((post) => matchesHelpFilter(post, filter)),
    [helpPosts, filter],
  );

  return (
    <PageLayout aside={null}>
      <PageHeader
        title="Pomoć susjedima"
        subtitle="Male usluge, velika razlika. 💚"
      />

      <div className="page-container space-y-4 px-4 pt-3 lg:px-0 lg:pt-4">
        <HelpInfoBanner />
        <FilterPills
          items={HELP_FILTERS}
          active={filter}
          onChange={setFilter}
          layoutId="helpFilterPill"
        />
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Pomozi nekome blizu sebe
        </p>
      </div>

      <div className="page-container mt-2 px-4 lg:px-0">
        {filtered.length === 0 ? (
          <EmptyState
            icon={filter === 'help_needed' ? HandHeart : SearchX}
            title="Budi prvi susjed koji će pomoći."
            description="Podijeli što trebaš ili ponudi malu uslugu u kvartu."
          />
        ) : (
          <AnimatedList listKey={filter} className="card-grid">
            {filtered.map((post) => (
              <AnimatedListItem key={post.id}>
                <HelpCard post={post} />
              </AnimatedListItem>
            ))}
          </AnimatedList>
        )}
      </div>
    </PageLayout>
  );
}

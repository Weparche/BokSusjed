import { useMemo, useState } from 'react';
import { HandHeart, SearchX, Shield, Accessibility } from 'lucide-react';
import { Link } from 'react-router-dom';
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

const HELP_TYPES = [
  'help_needed',
  'help_offered',
  'giveaway',
  'crisis_help_needed',
  'crisis_help_offered',
  'safe_point',
  'check_in_request',
  'accessible_location',
  'accessibility_barrier',
  'baby_friendly',
  'broken_elevator',
  'dangerous_curb',
] as const;

function SectionHeader({ icon: Icon, title }: { icon: typeof Shield; title: string }) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <Icon className="h-4 w-4 text-accent" />
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted">{title}</h2>
    </div>
  );
}

export function HelpPage() {
  const { posts } = useBoksusjed();
  const [filter, setFilter] = useState<HelpFilter>('all');

  const helpPosts = useMemo(() => {
    return posts.filter(
      (p) =>
        HELP_TYPES.includes(p.type as (typeof HELP_TYPES)[number]) ||
        p.title.toLowerCase().includes('posuđ') ||
        p.tag?.toLowerCase().includes('alat') === true,
    );
  }, [posts]);

  const filtered = useMemo(
    () => helpPosts.filter((post) => matchesHelpFilter(post, filter)),
    [helpPosts, filter],
  );

  const crisisPosts = filtered.filter((p) => matchesHelpFilter(p, 'crisis'));
  const accessPosts = filtered.filter((p) => matchesHelpFilter(p, 'accessibility'));
  const otherPosts = filtered.filter(
    (p) => !matchesHelpFilter(p, 'crisis') && !matchesHelpFilter(p, 'accessibility'),
  );

  const showSections = filter === 'all' && filtered.length > 0;

  return (
    <PageLayout aside={null}>
      <PageHeader title="Pomoć susjedima" subtitle="Male usluge, velika razlika. 💚" />

      <div className="page-container space-y-4 px-4 pt-3 lg:px-0 lg:pt-4">
        <HelpInfoBanner />

        <div className="grid gap-2 sm:grid-cols-2">
          <Link
            to="/boksusjed/otporan-kvart"
            className="rounded-[var(--radius-input)] border border-orange-100 bg-orange-50/60 px-4 py-3 text-sm font-semibold text-orange-900"
          >
            Krizna pomoć → OtporanKvart
          </Link>
          <Link
            to="/boksusjed/dostupan-kvart"
            className="rounded-[var(--radius-input)] border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm font-semibold text-emerald-900"
          >
            Pristupačna pomoć → DostupanKvart
          </Link>
        </div>

        <FilterPills
          items={HELP_FILTERS}
          active={filter}
          onChange={setFilter}
          layoutId="helpFilterPill"
        />
      </div>

      <div className="page-container mt-2 px-4 lg:px-0">
        {filtered.length === 0 ? (
          <EmptyState
            icon={filter === 'help_needed' ? HandHeart : SearchX}
            title="Budi prvi susjed koji će pomoći."
            description="Podijeli što trebaš ili ponudi malu uslugu u kvartu."
          />
        ) : showSections ? (
          <div className="space-y-4">
            {crisisPosts.length > 0 && (
              <section>
                <SectionHeader icon={Shield} title="Krizna pomoć" />
                <AnimatedList listKey="crisis" className="card-grid mt-2">
                  {crisisPosts.map((post) => (
                    <AnimatedListItem key={post.id}>
                      <HelpCard post={post} />
                    </AnimatedListItem>
                  ))}
                </AnimatedList>
              </section>
            )}
            {accessPosts.length > 0 && (
              <section>
                <SectionHeader icon={Accessibility} title="Pristupačna pomoć" />
                <AnimatedList listKey="access" className="card-grid mt-2">
                  {accessPosts.map((post) => (
                    <AnimatedListItem key={post.id}>
                      <HelpCard post={post} />
                    </AnimatedListItem>
                  ))}
                </AnimatedList>
              </section>
            )}
            {otherPosts.length > 0 && (
              <section>
                <SectionHeader icon={HandHeart} title="Susjedske usluge" />
                <AnimatedList listKey="other" className="card-grid mt-2">
                  {otherPosts.map((post) => (
                    <AnimatedListItem key={post.id}>
                      <HelpCard post={post} />
                    </AnimatedListItem>
                  ))}
                </AnimatedList>
              </section>
            )}
          </div>
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

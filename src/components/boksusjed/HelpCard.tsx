import { MapPin } from 'lucide-react';
import type { Post } from '../../types/boksusjed';
import { POST_TYPE_STYLES } from '../../utils/postHelpers';
import { Avatar } from './Avatar';
import { VerifiedBadge } from './VerifiedBadge';
import { formatRelativeTime } from '../../utils/formatTime';

interface HelpCardProps {
  post: Post;
}

export function HelpCard({ post }: HelpCardProps) {
  const style = POST_TYPE_STYLES[post.type];
  const Icon = style.icon;

  return (
    <article className={`rounded-[1.5rem] border bg-white p-4 shadow-sm ${style.border}`}>
      <div className="mb-3 flex items-center gap-2.5">
        <Avatar name={post.author.name} size="sm" />
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-slate-900">{post.author.name}</span>
            <VerifiedBadge level={post.author.verifiedLevel} />
          </div>
          <p className="text-xs text-slate-500">{formatRelativeTime(post.createdAt)}</p>
        </div>
      </div>

      <div className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style.bg} ${style.accent}`}>
        <Icon className="h-3.5 w-3.5" />
        {style.label}
      </div>

      <h3 className="text-base font-bold text-slate-900">{post.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{post.description}</p>

      {post.tag && (
        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          <MapPin className="h-3 w-3" />
          {post.tag}
        </span>
      )}
    </article>
  );
}

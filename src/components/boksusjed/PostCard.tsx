import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, MessageCircle, MoreHorizontal, MapPin } from 'lucide-react';
import type { Post } from '../../types/boksusjed';
import { formatRelativeTime } from '../../utils/formatTime';
import { POST_TYPE_STYLES } from '../../utils/postHelpers';
import { easeOut } from '../../utils/motion';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { Avatar } from './Avatar';
import { VerifiedBadge } from './VerifiedBadge';
import { CommentsDrawer } from './CommentsDrawer';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { toggleReaction } = useBoksusjed();
  const reduced = useReducedMotion();
  const [showComments, setShowComments] = useState(false);
  const [likeBurst, setLikeBurst] = useState(false);
  const style = POST_TYPE_STYLES[post.type];
  const Icon = style.icon;

  const handleLike = () => {
    if (!post.liked) setLikeBurst(true);
    toggleReaction(post.id);
  };

  return (
    <>
      <article
        className={`rounded-[1.5rem] border bg-white p-4 shadow-sm transition hover:shadow-md ${style.border}`}
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Avatar name={post.author.name} size="sm" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-sm font-semibold text-slate-900">{post.author.name}</span>
                <VerifiedBadge level={post.author.verifiedLevel} />
              </div>
              <p className="text-xs text-slate-500">
                {formatRelativeTime(post.createdAt)} · {post.neighborhood}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Opcije"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style.bg} ${style.accent}`}>
          <Icon className="h-3.5 w-3.5" />
          {style.label}
        </div>

        <h3 className="text-base font-bold leading-snug text-slate-900">{post.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{post.description}</p>

        {post.tag && (
          <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            <MapPin className="h-3 w-3" />
            {post.tag}
          </span>
        )}

        <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3">
          <motion.button
            type="button"
            onClick={handleLike}
            whileTap={reduced ? undefined : { scale: 0.92 }}
            className={`inline-flex items-center gap-1.5 text-sm font-medium transition ${
              post.liked ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'
            }`}
          >
            <motion.span
              animate={
                likeBurst && !reduced
                  ? { scale: [1, 1.28, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.28, ease: easeOut }}
              onAnimationComplete={() => setLikeBurst(false)}
            >
              <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
            </motion.span>
            <motion.span
              key={post.reactionsCount}
              initial={reduced ? false : { scale: 1.2, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: easeOut }}
            >
              {post.reactionsCount}
            </motion.span>
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setShowComments(true)}
            whileTap={reduced ? undefined : { scale: 0.92 }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-600"
          >
            <MessageCircle className="h-4 w-4" />
            {post.commentsCount}
          </motion.button>
        </div>
      </article>

      <CommentsDrawer
        post={post}
        open={showComments}
        onClose={() => setShowComments(false)}
      />
    </>
  );
}

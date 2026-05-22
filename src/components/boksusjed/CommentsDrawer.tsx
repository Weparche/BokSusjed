import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Post } from '../../types/boksusjed';
import { formatRelativeTime } from '../../utils/formatTime';
import { easeOut, sheetTransition } from '../../utils/motion';
import { Avatar } from './Avatar';

interface CommentsDrawerProps {
  post: Post;
  open: boolean;
  onClose: () => void;
}

export function CommentsDrawer({ post, open, onClose }: CommentsDrawerProps) {
  const reduced = useReducedMotion();
  const comments = post.comments ?? [];
  const transition = sheetTransition(!!reduced);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 640px)');
    const update = () => setIsWide(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const drawer = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4">
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Zatvori"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.2 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="comments-drawer-title"
            className="relative z-10 flex max-h-[85dvh] w-full max-w-md flex-col rounded-t-[1.75rem] bg-white px-4 pb-8 pt-4 shadow-2xl sm:max-h-[min(85dvh,640px)] sm:rounded-[1.75rem]"
            initial={
              reduced
                ? { opacity: 0 }
                : isWide
                  ? { opacity: 0, scale: 0.96, y: 16 }
                  : { y: '100%' }
            }
            animate={
              reduced ? { opacity: 1 } : isWide ? { opacity: 1, scale: 1, y: 0 } : { y: 0 }
            }
            exit={
              reduced
                ? { opacity: 0 }
                : isWide
                  ? { opacity: 0, scale: 0.96, y: 16 }
                  : { y: '100%' }
            }
            transition={transition}
          >
            <div className="mb-4 flex shrink-0 items-center justify-between">
              <h2 id="comments-drawer-title" className="text-lg font-bold text-slate-900">
                Komentari ({post.commentsCount})
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100"
                aria-label="Zatvori"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-4 shrink-0 line-clamp-2 text-sm text-slate-500">{post.title}</p>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain">
              {comments.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  Još nema komentara. Budi prvi susjed koji će pomoći.
                </p>
              ) : (
                comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    className="flex gap-3"
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduced ? 0 : 0.08 + index * 0.04,
                      duration: reduced ? 0.01 : 0.22,
                      ease: easeOut,
                    }}
                  >
                    <Avatar name={comment.author.name} size="sm" />
                    <div className="min-w-0 flex-1 rounded-2xl bg-slate-50 px-3 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-800">{comment.author.name}</span>
                        <span className="shrink-0 text-xs text-slate-400">
                          {formatRelativeTime(comment.createdAt)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-slate-600">{comment.text}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(drawer, document.body);
}

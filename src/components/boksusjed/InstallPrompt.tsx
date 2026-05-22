import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'boksusjed-pwa-dismiss';

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!visible || !deferred) return null;

  const install = async () => {
    await deferred.prompt();
    const choice = await deferred.userChoice;
    setVisible(false);
    setDeferred(null);
    if (choice.outcome === 'dismissed') {
      localStorage.setItem(DISMISS_KEY, '1');
    }
  };

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-4 bottom-20 z-[150] mx-auto max-w-md lg:bottom-6 lg:left-auto lg:right-8">
      <div className="surface-card flex items-start gap-3 p-4 shadow-[var(--shadow-lift)]">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-btn)] bg-accent font-display text-sm font-bold text-accent-ink">
          B
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display font-semibold text-ink">Instaliraj BokSusjed</p>
          <p className="mt-0.5 text-sm text-muted">Brži pristup kvartu s početnog ekrana.</p>
          <button
            type="button"
            onClick={() => void install()}
            className="btn-primary tap-scale mt-3 px-3 py-2 text-sm"
          >
            <Download className="h-4 w-4" />
            Instaliraj app
          </button>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-full p-1 text-muted hover:bg-paper-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          aria-label="Zatvori"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

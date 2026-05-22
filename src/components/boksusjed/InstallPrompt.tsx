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
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-white p-4 shadow-xl shadow-emerald-900/10">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
          B
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-slate-900">Instaliraj BokSusjed</p>
          <p className="mt-0.5 text-sm text-slate-500">Brži pristup kvartu s početnog ekrana.</p>
          <button
            type="button"
            onClick={() => void install()}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Download className="h-4 w-4" />
            Instaliraj app
          </button>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
          aria-label="Zatvori"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

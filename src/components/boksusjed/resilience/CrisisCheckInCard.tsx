import { useState } from 'react';
import { CheckCircle2, Heart, HelpCircle, Users } from 'lucide-react';
import type { CheckInChoice } from '../../../types/boksusjed';

interface CrisisCheckInCardProps {
  onSubmit: (choice: CheckInChoice) => void;
  lastChoice?: CheckInChoice | null;
}

const SUCCESS_MESSAGES: Record<CheckInChoice, string> = {
  ok: 'Super — drago nam je da si dobro. Susjedi su obaviješteni (demo).',
  need_help: 'Primili smo signal. Susjedi u kvartu mogu reagirati — adresa nije javna.',
  check_someone: 'Hvala — check-in za susjeda je zabilježen. Puna adresa nije vidljiva.',
};

export function CrisisCheckInCard({ onSubmit, lastChoice }: CrisisCheckInCardProps) {
  const [submitted, setSubmitted] = useState<CheckInChoice | null>(lastChoice ?? null);

  const handle = (choice: CheckInChoice) => {
    setSubmitted(choice);
    onSubmit(choice);
  };

  if (submitted) {
    return (
      <div className="surface-card border-accent-soft bg-accent-soft/30 p-5 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h3 className="mt-3 font-display text-lg font-semibold text-ink">Jesi li dobro?</h3>
        <p className="mt-2 text-sm text-ink-2">{SUCCESS_MESSAGES[submitted]}</p>
      </div>
    );
  }

  return (
    <div className="surface-card p-5">
      <h3 className="font-display text-lg font-semibold text-ink">Jesi li dobro?</h3>
      <p className="mt-1 text-sm text-muted">
        Brzi check-in tijekom krize. Krizne potrebe dijele se samo uz tvoju privolu.
      </p>
      <div className="mt-4 grid gap-2">
        <button
          type="button"
          onClick={() => handle('ok')}
          className="btn-primary tap-scale flex items-center justify-center gap-2 py-3 text-sm"
        >
          <Heart className="h-4 w-4" />
          Dobro sam
        </button>
        <button
          type="button"
          onClick={() => handle('need_help')}
          className="btn-secondary tap-scale flex items-center justify-center gap-2 border-orange-200 bg-orange-50 py-3 text-sm text-orange-900"
        >
          <HelpCircle className="h-4 w-4" />
          Trebam pomoć
        </button>
        <button
          type="button"
          onClick={() => handle('check_someone')}
          className="btn-secondary tap-scale flex items-center justify-center gap-2 py-3 text-sm"
        >
          <Users className="h-4 w-4" />
          Provjeri nekoga
        </button>
      </div>
    </div>
  );
}

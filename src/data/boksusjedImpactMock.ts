import type { ImpactMetric } from '../types/boksusjed';

export const impactMetrics: ImpactMetric[] = [
  {
    id: 'm-1',
    label: 'Susjeda uključeno',
    value: '300+',
    description: 'Aktivnih korisnika u pilotu Trešnjevke',
    category: 'community',
  },
  {
    id: 'm-2',
    label: 'Mapirane lokacije',
    value: '42',
    description: 'Objave, pomoć i sigurne točke na karti',
    category: 'community',
  },
  {
    id: 'm-3',
    label: 'Riješene pomoći',
    value: '18',
    description: 'Mikro-zadaci i susjedske usluge označene riješenima',
    category: 'help',
  },
  {
    id: 'm-4',
    label: 'Sigurne točke',
    value: '12',
    description: 'Lokalne točke za vodu, hlađenje i punjenje',
    category: 'resilience',
  },
  {
    id: 'm-5',
    label: 'Pristupačne lokacije',
    value: '24',
    description: 'Potvrđene oznake pristupačnosti u kvartu',
    category: 'accessibility',
  },
  {
    id: 'm-6',
    label: 'Ranjiva kućanstva',
    value: '8',
    description: 'Uključeno u demo check-in program (privatno)',
    category: 'resilience',
  },
];

export const impactTimeline = [
  { step: 'Prijavljena prepreka', done: true },
  { step: 'Susjedi potvrdili', done: true },
  { step: 'Partner obaviješten', done: false },
  { step: 'Problem označen riješen', done: false },
];

export const VALID_POSITIONING_COPY =
  'BokSusjed je demo digitalne društvene inovacije za povezanije, dostupnije i otpornije kvartove. Platforma spaja susjedsku pomoć, mapiranje pristupačnosti i lokalnu reakciju na komunalne ili klimatske poremećaje.';

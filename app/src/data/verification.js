// The five verification steps: TrueNest's core promise. Order matters: steps
// are completed in sequence, and every listing shows how many it has passed
// (listings can be live while verification is in progress).
// `summary` is the user's wording. `details` is placeholder copy shown when a
// step is expanded; replace it with final text.
// `icon` is a name from components/ui/Icon.js.

export const verificationIntro = {
  eyebrow: 'The TrueNest standard',
  title: 'Five checks. Every property. Nothing hidden.',
  sub: 'Every listing goes through five checks and shows its progress. Select a step to see what we check.',
};

const PLACEHOLDER =
  'Placeholder: a short explanation of what this check covers, which records or documents are used, how long it usually takes, and what you will see in the verification report. Final copy to come.';

export const verificationSteps = [
  { icon: 'deed', title: 'Ownership title', summary: 'The title deed will be traced and confirmed against records.', details: PLACEHOLDER },
  { icon: 'scales', title: 'Court history', summary: 'Checks for disputes, liens, and pending litigations.', details: PLACEHOLDER },
  { icon: 'shieldCheck', title: 'RERA status', summary: 'Registration verified for regulated projects.', details: PLACEHOLDER },
  { icon: 'bank', title: 'Encumbrances', summary: 'Financial charges and loans on the property surfaced.', details: PLACEHOLDER },
  { icon: 'mapPin', title: 'Physical inspection', summary: 'Someone walks around the property and confirms it exists as listed.', details: PLACEHOLDER },
];

// Shown in the progress panel when no single step is in focus.
export const verificationComplete = {
  kicker: 'Complete',
  title: 'Fully verified',
  text: 'A fully verified property has passed all five checks.',
};

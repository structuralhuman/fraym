export type InternalControlKey =
  | "response"
  | "interpretation"
  | "communication"
  | "timing"
  | "boundaries"
  | "withdrawal"
  | "effort"
  | "nextAction";

export type ExternalNonControlKey =
  | "theirIntention"
  | "theirEmotionalState"
  | "theirTiming"
  | "theirPriorities"
  | "theirPerception"
  | "theirResponse"
  | "randomVariance";

export type LensKey =
  | "incompleteInformation"
  | "timingVariance"
  | "priorityMismatch"
  | "cognitiveLoad"
  | "randomVariance";

export type FraymSession = {
  event: string | null;
  assumption: string | null;
  internalControl: InternalControlKey | null;
  externalNonControl: ExternalNonControlKey | null;
  lens: LensKey | null;
  resolution: {
    summary: string;
    action: string;
  } | null;
};
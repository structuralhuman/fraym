import { InternalControlKey, ExternalNonControlKey, LensKey } from "./types";

export const INTERNAL_CONTROL_LABELS: Record<InternalControlKey, string> = {
  response: "My response",
  interpretation: "My interpretation",
  communication: "My communication",
  timing: "My timing",
  boundaries: "My boundaries",
  withdrawal: "My withdrawal",
  effort: "My effort",
  nextAction: "My next action",
};

export const EXTERNAL_NON_CONTROL_LABELS: Record<ExternalNonControlKey, string> = {
  theirIntention: "Their intention",
  theirEmotionalState: "Their emotional state",
  theirTiming: "Their timing",
  theirPriorities: "Their priorities",
  theirPerception: "Their perception",
  theirResponse: "Their response",
  randomVariance: "Random variance",
};

export const LENS_LABELS: Record<LensKey, string> = {
  incompleteInformation: "Incomplete information",
  timingVariance: "Timing variance",
  priorityMismatch: "Priority mismatch",
  cognitiveLoad: "Cognitive load",
  randomVariance: "Random variance",
};

export const ACTION_MAP: Record<InternalControlKey, string> = {
  response: "Adjust my response deliberately.",
  interpretation: "Re-evaluate my interpretation.",
  communication: "Clarify directly.",
  timing: "Reassess timing.",
  boundaries: "Reinforce or redefine a boundary.",
  withdrawal: "Create distance if needed.",
  effort: "Modify effort level.",
  nextAction: "Choose a deliberate next step.",
};
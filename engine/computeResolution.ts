import { FraymSession } from "../constants/types";

import {
  INTERNAL_CONTROL_LABELS,
  EXTERNAL_NON_CONTROL_LABELS,
  LENS_LABELS,
  ACTION_MAP,
} from "../constants/controls";

export function computeResolution(session: FraymSession): FraymSession["resolution"] {
  const {
    assumption,
    internalControl,
    externalNonControl,
    lens,
  } = session;

  if (!assumption || !internalControl || !externalNonControl || !lens) {
    return null;
  }

  const internalLabel = INTERNAL_CONTROL_LABELS[internalControl];
  const externalLabel = EXTERNAL_NON_CONTROL_LABELS[externalNonControl];
  const lensLabel = LENS_LABELS[lens];
  const mappedAction = ACTION_MAP[internalControl];

  const summary = `The event occurred.
I assumed: ${assumption}.
My primary control is: ${internalLabel}.
${externalLabel} is outside my control.
A plausible alternative is: ${lensLabel}.`;

  return {
    summary,
    action: mappedAction,
  };
}
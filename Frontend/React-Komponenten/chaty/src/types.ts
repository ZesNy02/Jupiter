interface ChatMessage {
  message?: string;
  answer?: boolean;
  count?: number;
  maxCount?: number;
  error?: boolean;
  eventStorming?: boolean;
  loading?: boolean;
}

export interface Prompt {
  message: string;
  answers: Answer[];
}
export interface Answer extends ChatMessage {
  answer?: true;
  fromPrompt?: string;
  id: number;
}

export const enum MessageRatingAction {
  NEUTRAL_TO_THUMB_UP,
  NEUTRAL_TO_THUMB_DOWN,
  THUMB_UP_TO_THUMB_DOWN,
  THUMB_DOWN_TO_THUMB_UP,
  THUMB_UP_TO_NEUTRAL,
  THUMB_DOWN_TO_NEUTRAL,
  NEUTRAL,
}

export const enum MessageRating {
  THUMB_UP,
  THUMB_DOWN,
  NEUTRAL,
}

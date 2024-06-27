import { MessageRatingAction } from "../../types";

const BASE_URL = "https://test.dev-tonka.com";
export type URL_PATHS =
  | "/ai/prompt"
  | "/ai/eventstorming"
  | "/ai/rating"
  | "/ai/regenerate";
const TIMEOUT = 120 * 1000; // 120 seconds
type ServerResponse =
  | { Success: { id: number; response: string } }
  | { Success: "ok" }
  | { Error: string };

export type PromptRequest =
  | { prompt: string }
  | { id: number; rating: MessageRatingAction };

export const sendRequest = async (
  route: URL_PATHS,
  data: PromptRequest
): Promise<ServerResponse> => {
  const timeoutPromise: Promise<ServerResponse> = new Promise((resolve) => {
    setTimeout(() => resolve({ Error: "Request times out" }), TIMEOUT);
  });

  const fetchPromise: Promise<ServerResponse> = fetch(BASE_URL + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(translateData(data)),
  })
    .then((response) => response.json())
    .catch(() => {
      return { Error: "Network error" };
    });

  const result = await Promise.race([fetchPromise, timeoutPromise]);

  return result;
};

const translateData = (
  data: { prompt: string } | { id: number; rating: MessageRatingAction }
): { prompt: string } | { id: number; rating: number } => {
  if ("prompt" in data) {
    return data;
  }
  const action = data.rating;
  let rating = 0;
  switch (action) {
    case MessageRatingAction.NEUTRAL_TO_THUMB_DOWN: {
      rating = -1;
      break;
    }
    case MessageRatingAction.NEUTRAL_TO_THUMB_UP: {
      rating = 1;
      break;
    }
    case MessageRatingAction.THUMB_DOWN_TO_NEUTRAL: {
      rating = 1;
      break;
    }
    case MessageRatingAction.THUMB_DOWN_TO_THUMB_UP: {
      rating = 2;
      break;
    }
    case MessageRatingAction.THUMB_UP_TO_NEUTRAL: {
      rating = -1;
      break;
    }
    case MessageRatingAction.THUMB_UP_TO_THUMB_DOWN: {
      rating = -2;
      break;
    }
    default: {
      rating = 0;
      break;
    }
  }
  return { id: data.id, rating };
};

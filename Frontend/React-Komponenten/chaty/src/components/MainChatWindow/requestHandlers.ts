import { Answer, MessageRatingAction, Prompt } from "../../types";
import { PromptRequest, sendRequest } from "./utils";

const enum Route {
  PROMPT = "/ai/prompt",
  REGENERATE = "/ai/regenerate",
  EVENTSTORMING = "/ai/eventstorming",
}

const requestHandler = (
  route: Route,
  dataToSend: PromptRequest,
  addPrompt: (prompt: string, answer: Answer) => number,
  addAnswer: (promptIndex: number, answer: Answer) => number,
  editAnswer: (
    promptIndex: number,
    answerIndex: number,
    answer: Answer
  ) => void,
  prompt: string = "",
  answer: Answer = { id: -1 },
  promptIndex: number = -1
) => {
  let pIndex = promptIndex;
  let aIndex = 0;
  if (route === Route.PROMPT || route === Route.EVENTSTORMING) {
    pIndex = addPrompt(prompt, answer);
  } else if (route === Route.REGENERATE) {
    aIndex = addAnswer(promptIndex, answer);
  }
  sendRequest(route, dataToSend).then((response) => {
    if ("Success" in response) {
      if (route === Route.EVENTSTORMING && response.Success === "ok") {
        editAnswer(pIndex, aIndex, {
          message: "Event Storming Successfull!",
          answer: true,
          loading: false,
          eventStorming: true,
          id: -1,
        });
        return;
      } else if (response.Success === "ok") {
        return;
      }

      editAnswer(pIndex, aIndex, {
        message: response.Success.response,
        answer: true,
        loading: false,
        id: response.Success.id,
      });
    } else if ("Error" in response) {
      editAnswer(pIndex, aIndex, {
        message: response.Error,
        answer: true,
        loading: false,
        error: true,
        id: -1,
      });
    }
  });
};

export const promptRequestHandler = (
  addPrompt: (prompt: string, answer: Answer) => number,
  editAnswer: (promptIndex: number, answerIndex: number, answer: Answer) => void
) => {
  return (prompt: string) => {
    requestHandler(
      Route.PROMPT,
      { prompt },
      addPrompt,
      () => 0,
      editAnswer,
      prompt,
      {
        message: "",
        answer: true,
        loading: true,
        id: -1,
      }
    );
  };
};

export const regenerateRequestHandler = (
  addAnswer: (promptIndex: number, answer: Answer) => number,
  editAnswer: (promptIndex: number, answerIndex: number, answer: Answer) => void
) => {
  return (promptIndex: number, prompt: string) => {
    requestHandler(
      Route.REGENERATE,
      { prompt },
      () => 0,
      addAnswer,
      editAnswer,
      prompt,
      {
        message: "",
        answer: true,
        loading: true,
        id: -1,
      },
      promptIndex
    );
  };
};

export const ratingRequestHandler = (prompts: Prompt[]) => {
  return (
    promptIndex: number,
    answerIndex: number,
    rating: MessageRatingAction,
    onResponse: (success: boolean) => void
  ) => {
    sendRequest("/ai/rating", {
      id: prompts[promptIndex].answers[answerIndex].id,
      rating,
    }).then((response) => {
      if ("Success" in response) {
        console.log("Successfully changed rating.");
        onResponse(true);
      } else if ("Error" in response) {
        console.log("Error while trying to change rating: ", response.Error);
        onResponse(false);
      }
    });
  };
};

export const eventStormingRequestHandler = (
  addPrompt: (prompt: string, answer: Answer) => number,
  editAnswer: (promptIndex: number, answerIndex: number, answer: Answer) => void
) => {
  return (prompt: string) => {
    requestHandler(
      Route.EVENTSTORMING,
      { prompt },
      addPrompt,
      () => 0,
      editAnswer,
      prompt,
      {
        message: "",
        answer: true,
        loading: true,
        id: -1,
      }
    );
  };
};

import { Answer, MessageRatingAction, Prompt } from "../../types";
import { sendRequest } from "./utils";

export const promptRequestHandler = (
  addPrompt: (prompt: string, answer: Answer) => number,
  editAnswer: (promptIndex: number, answerIndex: number, answer: Answer) => void
) => {
  return (prompt: string) => {
    const promptIndex = addPrompt(prompt, {
      message: "",
      answer: true,
      loading: true,
      id: -1,
    });
    const answerIndex = 0;

    sendRequest("/ai/prompt", {
      prompt,
    }).then((response) => {
      if ("Success" in response) {
        if (response.Success === "ok") {
          return;
        }

        editAnswer(promptIndex, answerIndex, {
          message: response.Success.response,
          answer: true,
          loading: false,
          id: response.Success.id,
        });
      } else if ("Error" in response) {
        editAnswer(promptIndex, answerIndex, {
          message: response.Error,
          answer: true,
          loading: false,
          error: true,
          id: -1,
        });
      }
    });
  };
};

export const regenerateRequestHandler = (
  addAnswer: (promptIndex: number, answer: Answer) => number,
  editAnswer: (promptIndex: number, answerIndex: number, answer: Answer) => void
) => {
  return (promptIndex: number, prompt: string) => {
    const answerIndex = addAnswer(promptIndex, {
      message: "",
      answer: true,
      loading: true,
      id: -1,
    });
    sendRequest("/ai/regenerate", { prompt }).then((response) => {
      if ("Success" in response) {
        if (response.Success === "ok") {
          return;
        }

        editAnswer(promptIndex, answerIndex, {
          message: response.Success.response,
          answer: true,
          loading: false,
          id: response.Success.id,
        });
      } else if ("Error" in response) {
        editAnswer(promptIndex, answerIndex, {
          message: response.Error,
          answer: true,
          loading: false,
          error: true,
          id: -1,
        });
      }
    });
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
  addPrompt: (prompt: string) => number,
  addAnswer: (promptIndex: number, answer: Answer) => number,
  editAnswer: (promptIndex: number, answerIndex: number, answer: Answer) => void
) => {
  return (prompt: string) => {
    const promptIndex = addPrompt(prompt);
    const answerIndex = addAnswer(promptIndex, {
      message: "",
      answer: true,
      loading: true,
      eventStorming: true,
      id: -1,
    });
    sendRequest("/ai/prompt", {
      prompt,
    }).then((response) => {
      if ("Success" in response) {
        if (response.Success !== "ok") {
          return;
        }

        editAnswer(promptIndex, answerIndex, {
          message: "Event Storming Successfull!",
          answer: true,
          loading: false,
          eventStorming: true,
          id: -1,
        });
      } else if ("Error" in response) {
        editAnswer(promptIndex, answerIndex, {
          message: response.Error,
          answer: true,
          loading: false,
          error: true,
          id: -1,
        });
      }
    });
  };
};

import { useState } from "react";
import { Answer, Prompt } from "../types";

const example: Prompt[] = [
  {
    message: "What is the Prooph-Board?",
    answers: [
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        answer: true,
        count: 1,
        maxCount: 4,
        id: -1,
      },
      {
        message: "Error message",
        answer: true,
        error: true,
        count: 2,
        maxCount: 4,
        id: -1,
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        answer: true,
        eventStorming: true,
        count: 3,
        maxCount: 4,
        id: -1,
      },
      {
        message: "",
        answer: true,
        count: 4,
        maxCount: 4,
        loading: true,
        id: -1,
      },
    ],
  },
];

export const usePrompts = (): [
  Prompt[],
  (prompt: string, answer: Answer) => number,
  (promptIndex: number, answer: Answer) => number,
  (promptIndex: number, answerIndex: number, answer: Answer) => void
] => {
  const [prompts, setPrompts] = useState<Prompt[]>(example);

  const addPrompt = (prompt: string, answer: Answer): number => {
    const id = prompts.length;
    setPrompts((prev) => {
      return [
        ...prev,
        {
          message: prompt,
          answers: [
            {
              ...answer,
              count: 1,
              maxCount: 1,
            },
          ],
        },
      ];
    });

    return id;
  };

  const addAnswer = (promptIndex: number, answer: Answer): number => {
    setPrompts((prev) => {
      return prev.map((prompt, index) => {
        if (index === promptIndex) {
          const count = prompt.answers.length + 1;
          return {
            ...prompt,
            answers: [
              ...prompt.answers.map((item, index) => {
                return {
                  ...item,
                  count: index,
                  maxCount: count,
                };
              }),
              {
                ...answer,
                count: count,
                maxCount: count,
              },
            ],
          };
        }
        return prompt;
      });
    });
    return prompts[promptIndex].answers.length - 1;
  };

  const editAnswer = (
    promptIndex: number,
    answerIndex: number,
    answer: Answer
  ) => {
    setPrompts((prev) => {
      const newPrompts: Prompt[] = prev.map((prompt, index) => {
        if (index === promptIndex) {
          return {
            ...prompt,
            answers: prompt.answers.map((item, index) => {
              if (answerIndex === index) {
                console.log("test");

                return { ...item, ...answer };
              }
              return item;
            }),
          };
        }
        return prompt;
      });
      return newPrompts;
    });
  };

  return [prompts, addPrompt, addAnswer, editAnswer];
};

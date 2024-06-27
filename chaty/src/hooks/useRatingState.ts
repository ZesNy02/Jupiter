import { MessageRatingAction } from "./../types";
import { useContext, useState } from "react";
import {
  RequestContext,
  RequestContextProps,
} from "../components/MainChatWindow/MainChatWindow";
import { MessageRating } from "../types";

export const useRatingState = (
  promptIndex: number,
  answerIndex: number
): [MessageRating, (rating: MessageRating) => () => void] => {
  const { handleRatingRequest } = useContext(
    RequestContext
  ) as RequestContextProps;

  const [ratingState, setRatingState] = useState(MessageRating.NEUTRAL);

  const handleThumbClick = (rating: MessageRating) => {
    return () => {
      if (rating === MessageRating.NEUTRAL) {
        return;
      } else if (rating === ratingState) {
        let ratingAction: MessageRatingAction = MessageRatingAction.NEUTRAL;
        if (rating === MessageRating.THUMB_UP) {
          ratingAction = MessageRatingAction.THUMB_UP_TO_NEUTRAL;
        } else if (rating === MessageRating.THUMB_DOWN) {
          ratingAction = MessageRatingAction.THUMB_DOWN_TO_NEUTRAL;
        }
        handleRatingRequest(promptIndex, answerIndex, ratingAction, () => {});
        setRatingState(MessageRating.NEUTRAL);
      } else {
        let ratingAction: MessageRatingAction = MessageRatingAction.NEUTRAL;
        if (ratingState === MessageRating.NEUTRAL) {
          if (rating === MessageRating.THUMB_UP) {
            ratingAction = MessageRatingAction.NEUTRAL_TO_THUMB_UP;
          } else if (rating === MessageRating.THUMB_DOWN) {
            ratingAction = MessageRatingAction.NEUTRAL_TO_THUMB_DOWN;
          }
        } else {
          if (rating === MessageRating.THUMB_UP) {
            ratingAction = MessageRatingAction.THUMB_DOWN_TO_THUMB_UP;
          } else if (rating === MessageRating.THUMB_DOWN) {
            ratingAction = MessageRatingAction.THUMB_UP_TO_THUMB_DOWN;
          }
        }
        handleRatingRequest(promptIndex, answerIndex, ratingAction, () => {});
        setRatingState(rating);
      }
    };
  };

  return [ratingState, handleThumbClick];
};

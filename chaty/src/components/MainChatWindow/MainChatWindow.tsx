import { FC } from "react";
import "./MainChatWindow.css";
import ChatHeader from "../ChatHeader";
import ChatWrapper from "../ChatWrapper";
import ChatInput from "../ChatInput";
import ESToggleButton from "../ESToggleButton";

interface MainChatWindowProps {}

const MainChatWindow: FC<MainChatWindowProps> = () => {

    return(
      <div>
        <ChatHeader />
        <ChatWrapper />
        <ESToggleButton />
        <ChatInput />
      </div>
)};

export default MainChatWindow;

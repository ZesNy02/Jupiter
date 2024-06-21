import { FC } from "react";
import "./MainChatWindow.css";
import ChatHeader from "../ChatHeader";
import ChatWrapper from "../ChatWrapper";
import ChatInput from "../ChatInput";

interface MainChatWindowProps {}

const MainChatWindow: FC<MainChatWindowProps> = () => {

    return(
      <div>
        <ChatHeader />
        <ChatWrapper />
        <ChatInput />
      </div>
)};

export default MainChatWindow;

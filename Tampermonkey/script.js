// ==UserScript==
// @name         Export Py
// @namespace    http://tampermonkey.net/
// @version      2024-04-21
// @description  try to take over the world!
// @author       You
// @match        https://*.prooph-board.com/inspectio/board/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=prooph-board.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// --------------------------------------------------------------------

// most of the code is just creating an HTML Element and styling it

// --------------------------------------------------------------------

// Server URL where the server runs
const SERVER_URL = "http://localhost:3000/ai/prompt";
//Sever URL where the server receives ratings
const RATING_URL = "http://localhost:3000/ai/rating";
//Server URL where the server receives the regenerate prompt
const REGENERATE_URL = "http://localhost:3000/ai/regenerate";
//Server URL where the server receives the eventStorming prompt
const EVENTSTORMING_URL = "http://localhost:3000/ai/eventstorming";
//cached prompt map mapped from UUID(string) -> Message content(string)
//this is important so that you can reload or give thumbs up or down so that you can find the specific message quickly
const prompts = new Map();

// a map connecting the prompts sent by the user to the received messages by the server
// responseUUID(string) -> promptUUID(string)
const responseToPrompt = new Map();

//a map that maps the responseUUID to the backendID so that it can be given back to the backend aswell as asure having unique identifier
const responseUUIDtoID = new Map();

//boolean to check if the eventStorming mode is activated
let eventStormingModeActive = false;

//boolean to check if the user can send a message to the server
let inputLock = false;

const CHAT_BUTTON_SVG = '<svg class="chatButtonSVG" id="chatButtonSVG" xmlns="http://www.w3.org/2000/svg" height="90%" viewBox="0 -960 960 960" width="90%" fill="#D9D9D9"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>';
const RESIZE_HANDLE_SVG = '<svg class="resizeHandleSVG" id="resizeHandleSVG" viewBox="-1.92 -1.92 27.84 27.84" fill="#D9D9D9" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, -1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#D9D9D9" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path class="resizeHandlePath" id="resizeHandlePath" d="M21 15L15 21M21 8L8 21" stroke="#D9D9D9" stroke-width="1.6799999999999997" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
const LOAD_MESSAGE_SVG = '<div style=\"display: flex; justify-content: center; align-items: center;\"><svg id="ladebild" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 480.52 471.13" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" width="80px" height="80px" style="background-color:transparent"><style><![CDATA[#ladebild-s-rect1_to {animation: ladebild-s-rect1_to__to 3000ms linear infinite normal forwards}@keyframes ladebild-s-rect1_to__to { 0% {transform: translate(227.413141px,149.305825px)} 16.666667% {transform: translate(370.355789px,193.355788px)} 33.333333% {transform: translate(368.868828px,348.324813px)} 50% {transform: translate(257.471827px,426.72455px)} 66.666667% {transform: translate(138.314166px,348.365767px)} 83.333333% {transform: translate(114.307582px,223.307575px)} 100% {transform: translate(227.413141px,149.305825px)}} #ladebild-s-rect1_tr {animation: ladebild-s-rect1_tr__tr 3000ms linear infinite normal forwards}@keyframes ladebild-s-rect1_tr__tr { 0% {transform: rotate(19deg)} 100% {transform: rotate(199deg)}} #ladebild-s-rect2_to {animation: ladebild-s-rect2_to__to 3000ms linear infinite normal forwards}@keyframes ladebild-s-rect2_to__to { 0% {transform: translate(138.314161px,340.808123px)} 16.666667% {transform: translate(118.32111px,218.634813px)} 33.333333% {transform: translate(232.838032px,147.075828px)} 50% {transform: translate(380.784682px,192.220096px)} 66.666667% {transform: translate(373.817032px,352.248921px)} 83.333333% {transform: translate(255.000893px,441.149087px)} 100% {transform: translate(128.311303px,333.636613px)}} #ladebild-s-rect2_tr {animation: ladebild-s-rect2_tr__tr 3000ms linear infinite normal forwards}@keyframes ladebild-s-rect2_tr__tr { 0% {transform: rotate(85deg)} 100% {transform: rotate(265deg)}} #ladebild-s-rect3_to {animation: ladebild-s-rect3_to__to 3000ms linear infinite normal forwards}@keyframes ladebild-s-rect3_to__to { 0% {transform: translate(368.868823px,353.579698px)} 16.666667% {transform: translate(254.489853px,432.334834px)} 33.333333% {transform: translate(132.975658px,351.953105px)} 50% {transform: translate(107.954129px,224.242905px)} 66.666667% {transform: translate(221.785778px,147.965968px)} 83.333333% {transform: translate(380.78px,192.22px)} 100% {transform: translate(381.639179px,353.408155px)}} #ladebild-s-rect3_tr {animation: ladebild-s-rect3_tr__tr 3000ms linear infinite normal forwards}@keyframes ladebild-s-rect3_tr__tr { 0% {transform: rotate(84deg)} 100% {transform: rotate(264deg)}}]]></style><g id="ladebild-s-g1" transform="translate(0-48.445569)"><g id="ladebild-s-rect1_to" transform="translate(227.413141,149.305825)"><g id="ladebild-s-rect1_tr" transform="rotate(19)"><rect id="ladebild-s-rect1" width="140.11" height="140.11" rx="0" ry="0" transform="scale(0.8,0.8) translate(-70.055,-70.055)" fill="#f8ca2e" stroke-width="0"/></g></g><g id="ladebild-s-rect2_to" transform="translate(138.314161,340.808123)"><g id="ladebild-s-rect2_tr" transform="rotate(85)"><rect id="ladebild-s-rect2" width="140.11" height="140.11" rx="0" ry="0" transform="scale(0.8,0.8) translate(-74.089278,-65.104962)" fill="#f5a051" stroke-width="0"/></g></g><g id="ladebild-s-rect3_to" transform="translate(368.868823,353.579698)"><g id="ladebild-s-rect3_tr" transform="rotate(84)"><rect id="ladebild-s-rect3" width="140.11" height="140.11" rx="0" ry="0" transform="scale(0.8,0.8) translate(-69.472912,-76.414198)" fill="#9ec6eb" stroke-width="0"/></g></g></g></svg></div>';
const RELOAD_BUTTON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="30px" width="30px" fill="#A4A4AC"><path d="M164.67-160v-66.67H288l-15.33-12.66q-60-49.34-86.34-109Q160-408 160-477.33q0-107.67 63.83-192.84 63.84-85.16 167.5-115.83v69.33q-74 28-119.33 93.84-45.33 65.83-45.33 145.5 0 57 21.33 102.16 21.33 45.17 60 79.84L331.33-278v-115.33H398V-160H164.67Zm404.66-13.33v-70q74.67-28 119.34-93.84 44.66-65.83 44.66-145.5 0-47-21.33-94.16-21.33-47.17-58.67-84.5L630.67-682v115.33H564V-800h233.33v66.67h-124l15.34 14q56.33 53.66 83.83 115.5Q800-542 800-482.67 800-375 736.5-289.5 673-204 569.33-173.33Z"/></svg>';
const THUMBS_UP_BUTTON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#A4A4AC"><path d="M717.33-120H274.67v-514.67L553.33-920 596-882.67q6.33 5.67 9.83 15.67t3.5 22.33v11.34l-44.66 198.66H850q26.67 0 46.67 20t20 46.67v81.23q0 7.1.33 14.77t-2.33 14.67L790.67-170q-8.92 20.83-29.73 35.42Q740.13-120 717.33-120Zm-376-66.67H726l124-292.66V-568H481.33l53.34-239.33-193.34 200.66v420Zm0-420v420-420Zm-66.66-28V-568H146v381.33h128.67V-120H79.33v-514.67h195.34Z"/></svg>';
const THUMBS_DOWN_BUTTON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#A4A4AC"><path d="M241.33-840H684v514.67L405.33-40l-42.66-37.33Q356.33-83 352.83-93t-3.5-22.33v-11.34L394-325.33H108.67q-26.67 0-46.67-20T42-392v-81.23q0-7.1-.33-14.77-.34-7.67 2.33-14.67L168-790q8.92-20.83 29.73-35.42Q218.54-840 241.33-840Zm376 66.67H232.67l-124 292.66V-392h368.66L424-152.67l193.33-200.66v-420Zm0 420v-420 420Zm66.67 28V-392h128.67v-381.33H684V-840h195.33v514.67H684Z"/></svg>';
const CLOSE_BUTTON_SVG = '<svg class="closeButtonSVG" id="closeButtonSVG" xmlns="http://www.w3.org/2000/svg" height="120%" viewBox="0 -960 960 960" width="120%" fill="#D9D9D9"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
const CHAT_INPUT_BUTTON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>';

const styleSheet = () => {
  const style = document.createElement('style');
  style.innerHTML = `
   .chatWindow {
    background-color: #448CEB;
    transition: background-color 0.3s;
}

.chatWindow.active {
    background-color: #EBA360;
    transition: background-color 0.3s;
}

.chatButton {
    background-color: #448CEB;
    transition: background-color 0.3s;
}

.chatButton.active {
    background-color: #EBA360;
    transition: background-color 0.3s;
}

#prompts-container::-webkit-scrollbar {
    width: 16px;
}

#prompts-container::-webkit-scrollbar-track {
    background: lightgray;
    border-radius: 6px;
}

#prompts-container::-webkit-scrollbar-thumb {
    background-color: #A4A4AC;
    border-radius: 6px;
    border: 2px solid lightgray;
}

.reloadButton svg {
    fill: #A4A4AC; /* Default color */
}

.reloadButton:hover svg {
    fill: #1A73E8; /* Hover color */
}

.reloadButton:active svg {
    fill: #0A47A1; /* Active color */
}

.reloadButton.selected svg {
    fill: #FF0000; /* Toggled color */
}

.thumbsUpButton svg {
    fill: #A4A4AC; /* Default color */
}

.thumbsUpButton:hover svg {
    fill: #1A73E8; /* Hover color */
}

.thumbsUpButton:active svg {
    fill: #0A47A1; /* Active color */
}

.thumbsUpButton.selected svg {
    fill: #14ba38; /* Toggled color */
}

.thumbsDownButton svg {
    fill: #A4A4AC; /* Default color */
}

.thumbsDownButton:hover svg {
    fill: #1A73E8; /* Hover color */
}

.thumbsDownButton:active svg {
    fill: #0A47A1; /* Active color */
}

.thumbsDownButton.selected svg {
    fill: #a30709; /* Toggled color */
}

.chatInputButton svg {
    fill: #434343;
}

.chatInputButton:hover svg {
    fill: #1A73E8; /* Hover color */
}

.chatInputButton:active svg {
    fill: #0A47A1; /* Active color */
}

.chatInputButton.selected svg {
    fill: #FF0000; /* Toggled color */
}

.resizeHandle {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    cursor: nesw-resize;
}

.responseMessage {
    width: fit-content;
    max-width: 70%;
    text-align: left;
}

.userMessage {
    width: fit-content;
    max-width: 80%;
    text-align: left;
}

.loadMessage {
    width: 50%;
}

.eventStormingSwitchContainer {
    margin-bottom: 10px;
    position: relative;
    width: 60px;
    height: 30px;
    background-color: #d3d3d3;
    border-radius: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    min-width: 60px;
}

.eventStormingSwitchKnob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    background-color: #434343;
    border-radius: 50%;
    transition: all 0.3s;
}

.eventStormingSwitchContainer.active .eventStormingSwitchKnob {
    left: 33px;
    background-color: orange;
    transition: all 0.3s;
}

.eventStormingSwitchInner {
    height: 20px;
    align-self: center;
    background-color: #A6A6A6;
    width: 44px;
    align-content: center;
    position: sticky;
    border-radius: 15px;
    padding-left: 0px;
    margin-left: 8px;
    transition: background-color 0.1s;
}

.eventStormingSwitchInner.active {
background-color: #EEE;
}

.eventStormingHeading {
    margin-bottom: 10px;
    align-content: center;
    margin-top: 0px;
    margin-left: 10px;
}

.wrapperEventStorming{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-wrap: nowrap;
    overflow: hidden;
}

.resizeHandlePath,
.closeButtonSVG,
.chatButtonSVG{
 transition: all 0.3s;

}
.eventStormingHeading,
.chatyName{
 transition: all 0.3s;
}

.resizeHandlePath.active,
.closeButtonSVG.active,
.chatButtonSVG.active{
 fill:#434343 !important;
 stroke:#434343 !important;
 transition: all 0.3s;

}
.eventStormingHeading.active,
.chatyName.active{
 color:#434343 !important;
 transition: all 0.3s;
}
.responseMessage {
  position: relative;
  align-self: flex-start;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 10px;
}
#chatButton {
  position: fixed;
  bottom: 20px;
  left: 270px;
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 100%;
  border: none;
  z-index: 80;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#chatHeader {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  order: 0;
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 0px;
}
#chatyName {
  user-select: none;
  color: #D9D9D9;
  margin: 0;
  flex-grow: 1;
}
#closeButton {
  color: #D9D9D9;
  height: 40px;
  width: 40px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
}
#wrapper-prompts-container {
  width: 100%;
  flex-grow: 1; /* Allow it to grow and take available space */
  order: 1;
  z-index: 100;
  padding: 10px;
  overflow: hidden; /* Hide overflow to ensure container stays within bounds */
}
/* Wrapper Prompts Container */
#wrapper-prompts-container {
  width: 100%;
  flex-grow: 1; /* Allow it to grow and take available space */
  order: 1;
  z-index: 100;
  padding: 10px;
  overflow: hidden; /* Hide overflow to ensure container stays within bounds */
}

/* Prompts Container */
#prompts-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto; /* Scroll vertically */
  scroll-behavior: smooth;
  background-color: lightgray;
  border-radius: 6px;
  gap: 10px;
  padding: 10px;
}

/* Wrapper Chat Input */
#wrapperChatInput {
  width: 100%;
  height: 90px;
  order: 5;
  z-index: 101;
  padding: 10px;
  padding-top: 0px;
  margin-top: auto;
}

#chatInputDiv {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: white;
  border-radius: 15px;
}
.eventStormingHeading {
  user-select: none;
  color: #D9D9D9;
}
.userMessage {
  background-color: #A4A4AC;
  align-self: flex-end;
  border: 1px solid black;
  border-radius: 10px;
  border-color: transparent;
  padding: 10px;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.loadMessage {
  background-color: #A4A4AC;
  align-self: flex-start;
  border: 1px solid black;
  border-radius: 10px;
  border-color: transparent;
  padding: 10px;
}
.responseMessage {
  position: relative;
  align-self: flex-start;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  border-color: transparent;
}
`;
  return style;
}
// The Chat button is the blue button that appears on the bottom left of the screen
// When clicked, it opens the chat window
const makeChatButton = () => {
  const chatButton = document.createElement("button");
  chatButton.id = "chatButton";
  chatButton.className = "chatButton";
  chatButton.innerHTML = CHAT_BUTTON_SVG;
  chatButton.addEventListener("click", () => {
    const chatWindow = document.getElementById("chatWindow");
    chatWindow.style.display =
      chatWindow.style.display === "none" ? "flex" : "none";
  });
  return chatButton;
};
//creates the chat Window with everything that needs to be loaded the moment the site is loaded
const makeChatWindow = () => {

  const makeResizeHandle = (container) => {
    const resizeHandle = document.createElement("div");
    resizeHandle.className = "resizeHandle";
    resizeHandle.id = "resizeHandle";
    resizeHandle.innerHTML = RESIZE_HANDLE_SVG;
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    resizeHandle.addEventListener('mousedown', (e) => {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(getComputedStyle(container, null).getPropertyValue('width'));
      startHeight = parseInt(getComputedStyle(container, null).getPropertyValue('height'));

      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
    });

    function resize(e) {
      if (isResizing) {
        const width = startWidth + (e.clientX - startX);
        let height = startHeight + (startY - e.clientY);

        container.style.width = `${width}px`;
        container.style.height = `${height}px`;
      }
    }

    function stopResize() {
      isResizing = false;
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    }

    return resizeHandle;
  }

  // -------------------------- Chat Window --------------------------
  const chatWindow = document.createElement("div");
  //if this is refactored to css it will load slower and it can be that the chat window does not open in time
  chatWindow.id = "chatWindow";
  chatWindow.className = "chatWindow";
  chatWindow.style.position = "fixed";
  chatWindow.style.bottom = "1.42rem";
  chatWindow.style.left = "270px";
  chatWindow.style.width = "30vw";
  chatWindow.style.height = "50vh";
  chatWindow.style.zIndex = "100";
  chatWindow.style.display = "none";
  chatWindow.style.flexDirection = "column";
  chatWindow.style.borderRadius = "10px";
  chatWindow.style.gap = "10px";
  chatWindow.style.overflow = "auto"; // Ensure content is scrollable if the window is resized smaller
  chatWindow.style.minWidth = "250px"; // Set minimum width
  chatWindow.style.minHeight = "250px"; // Set minimum height
  chatWindow.style.maxWidth = "80vw"; // Set maximum width
  chatWindow.style.maxHeight = "80vh"; // Set maximum height

// chatHeader is a the header of the chat window
  const chatHeader = document.createElement("div");
  chatHeader.id = "chatHeader";

// Chaty Name on top of the chat window
  const chatyName = document.createElement("h2");
  chatyName.id = "chatyName";
  chatyName.className = "chatyName";
  chatyName.innerText = "Chaty";

// Chat Close Button
  const closeButton = document.createElement("button");
  closeButton.innerHTML = CLOSE_BUTTON_SVG;
  closeButton.id = "closeButton";
  closeButton.className = "closeButton";
  closeButton.addEventListener("click", () => {
    chatWindow.style.display = "none";
  });

// Append elements to the chat header
  chatHeader.appendChild(chatyName);
  chatHeader.appendChild(closeButton);
  chatHeader.appendChild(makeResizeHandle(chatWindow));
  chatWindow.appendChild(chatHeader);
  // -------------------------- Wrapper Prompts Container --------------------------
  const wrapperPromptsContainer = document.createElement("div");
  wrapperPromptsContainer.id = "wrapper-prompts-container";

  // -------------------------- Prompts Container --------------------------
  const promptsContainer = document.createElement("div");
  promptsContainer.id = "prompts-container";
  wrapperPromptsContainer.appendChild(promptsContainer);
  chatWindow.appendChild(wrapperPromptsContainer);

  // -------------------------- Wrapper Chat Input --------------------------
  const wrapperChatInput = document.createElement("div");
  wrapperChatInput.id = "wrapperChatInput";

  // -------------------------- Chat Input Div --------------------------
  const chatInputDiv = document.createElement("div");
  chatInputDiv.id = "chatInputDiv";
  // -------------------------- Send Prompt --------------------------
  // Function to send the prompt to the server
  // The server will respond with a message
  // The message and response will be displayed in the chat window
  const sendPrompt = () => {
    const message = chatInput.value;
    //TODO: check if message is javascript or other hazardous code
    if (message === "" || message.replaceAll(" ", "") === "") {
      return
    }
    //TODO: cleanup of the message, no white spaces
    const chatWindow = document.getElementById("prompts-container");
    const wrapperPromptsContainer = document.getElementById(
      "wrapper-prompts-container"
    );
    //clears chat
    chatInput.value = "";

    // Add message to the chat window
    const userMessage = makeUserMessage(message);
    chatWindow.appendChild(userMessage);

    //add message to the cached prompts
    prompts.set(userMessage.id, message);
    //sends the message to the server
    if (eventStormingModeActive) {
      sendEventStormingMessage(userMessage.id, message);
    } else {
      sendPromptMessage(userMessage.id, message, SERVER_URL);
    }
  };

  // -------------------------- Chat Input Button --------------------------
  const chatInputButton = document.createElement("button");
  chatInputButton.innerHTML = CHAT_INPUT_BUTTON_SVG;
  chatInputButton.id = "chatInputButton";
  chatInputButton.class = "chatInputButton";
  chatInputButton.style.alignSelf = "center";
  chatInputButton.style.border = "none";
  chatInputButton.style.order = "1";
  chatInputButton.style.cursor = "pointer";
  chatInputButton.style.backgroundColor = "transparent";
  chatInputButton.addEventListener("click", () => {
    if (!inputLock) {
      sendPrompt();
    }
  });
  chatInputDiv.appendChild(chatInputButton);

  // -------------------------- Chat Input --------------------------
  const chatInput = document.createElement("input");
  chatInput.id = "chat-input";
  chatInput.style.height = "40px";
  chatInput.style.width = "100%";
  chatInput.placeholder = "Type your message here";
  chatInput.style.border = "none";
  chatInput.style.outline = "none";
  chatInput.style.backgroundColor = "transparent";
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!inputLock) {
        sendPrompt();
      }
    }
  });
  chatInputDiv.appendChild(chatInput);

  //eventStormingButton
  const createEventStormingSwitch = () => {
    const switchContainer = document.createElement('div');
    switchContainer.className = 'eventStormingSwitchContainer';

    const switchKnob = document.createElement('div');
    switchKnob.className = 'eventStormingSwitchKnob';

    const switchInner = document.createElement("div");
    switchInner.className = 'eventStormingSwitchInner';
    switchContainer.appendChild(switchInner);
    switchContainer.appendChild(switchKnob);

    switchContainer.addEventListener('click', () => {
      switchContainer.classList.toggle('active');
      chatWindow.classList.toggle('active');
      switchInner.classList.toggle('active');
      document.getElementById("resizeHandlePath").classList.toggle('active');
      document.getElementById("closeButtonSVG").classList.toggle('active');
      document.getElementById("eventStormingHeading").classList.toggle('active');
      document.getElementById("chatyName").classList.toggle('active');
      document.getElementById("chatButton").classList.toggle('active');
      document.getElementById("chatButtonSVG").classList.toggle('active');
      eventStormingModeActive = !eventStormingModeActive;
    });

    return switchContainer;
  };
  const createEventStormingHeading = () => {
    const eventStormingHeading = document.createElement("h2");
    eventStormingHeading.className = "eventStormingHeading";
    eventStormingHeading.id = "eventStormingHeading";
    eventStormingHeading.style.userSelect = "none";
    eventStormingHeading.innerText = "Eventstorming-Mode";
    eventStormingHeading.style.color = "#D9D9D9";
    return eventStormingHeading;
  }
  const wrapperEventStorming = document.createElement("div");
  wrapperEventStorming.className = "wrapperEventStorming";
  wrapperEventStorming.appendChild(createEventStormingSwitch());
  wrapperEventStorming.appendChild(createEventStormingHeading());
  wrapperChatInput.appendChild(wrapperEventStorming);
  wrapperChatInput.appendChild(chatInputDiv);
  chatWindow.appendChild(wrapperChatInput);
  return chatWindow;
};

// A User Message is a message on the right of the Chat that the User Typed
const makeUserMessage = (text) => {
  const userMessage = document.createElement("div");
  userMessage.className = "userMessage";
  userMessage.id = generateUUID();
  userMessage.innerHTML = text;
  return userMessage;
};
// A Response Message is a message on the left of the Chat that the AI Typed
const makeResponseMessage = (responseUUID, text, success) => {
  const promptUUID = responseToPrompt.get(responseUUID);
  console.log(promptUUID);

  const makeWrapperResponseMessageButtons = () => {
    const RATING_NEUTRAL_TO_POSITIVE = 1;
    const RATING_NEUTRAL_TO_NEGATIVE = -1;
    const RATING_POSITIVE_TO_NEUTRAL = -1;
    const RATING_POSITIVE_TO_NEGATIVE = -2;
    const RATING_NEGATIVE_TO_NEUTRAL = 1;
    const RATING_NEGATIVE_TO_POSITIVE = 2;
    const createReloadButton = () => {
      const reloadButton = document.createElement("button");
      reloadButton.className = "reloadButton";
      reloadButton.innerHTML = RELOAD_BUTTON_SVG;
      reloadButton.style.backgroundColor = "transparent";
      reloadButton.style.border = "none";
      reloadButton.style.cursor = "pointer";
      reloadButton.addEventListener("click", () => {
        reloadPrompt(promptUUID);
      });
      return reloadButton;
    }

    const createThumbsUpButton = () => {
      const thumbsUpButton = document.createElement("button");
      thumbsUpButton.className = "thumbsUpButton";
      thumbsUpButton.innerHTML = THUMBS_UP_BUTTON_SVG;
      thumbsUpButton.style.backgroundColor = "transparent";
      thumbsUpButton.style.border = "none";
      thumbsUpButton.style.cursor = "pointer";
      thumbsUpButton.addEventListener("click", () => {
        if (checkIfOtherButtonHasBeenPressed(thumbsUpButton)) {
          switchSelectedButton()
          sendRating(responseUUID, RATING_NEGATIVE_TO_POSITIVE);
        } else {
          if (thumbsUpButton.classList.contains("selected")) {
            sendRating(responseUUID, RATING_POSITIVE_TO_NEUTRAL);
          } else {
            sendRating(responseUUID, RATING_NEUTRAL_TO_POSITIVE);
          }
          thumbsUpButton.classList.toggle("selected");
        }
      });
      return thumbsUpButton;
    }

    const createThumbsDownButton = () => {
      const thumbsDownButton = document.createElement("button");
      thumbsDownButton.className = "thumbsDownButton";
      thumbsDownButton.innerHTML = THUMBS_DOWN_BUTTON_SVG;
      thumbsDownButton.style.backgroundColor = "transparent";
      thumbsDownButton.style.border = "none";
      thumbsDownButton.style.cursor = "pointer";
      thumbsDownButton.addEventListener("click", () => {
        if (checkIfOtherButtonHasBeenPressed(thumbsDownButton)) {
          switchSelectedButton()
          sendRating(responseUUID, RATING_POSITIVE_TO_NEGATIVE);
        } else {
          if (thumbsDownButton.classList.contains("selected")) {
            sendRating(responseUUID, RATING_NEGATIVE_TO_NEUTRAL);
          } else {
            sendRating(responseUUID, RATING_NEUTRAL_TO_NEGATIVE);
          }
          thumbsDownButton.classList.toggle("selected");
        }
      });
      return thumbsDownButton;
    }

    const thumbsUpButton = createThumbsUpButton();
    const thumbsDownButton = createThumbsDownButton();

    //returns the selected status of the other rating button than the one given
    function checkIfOtherButtonHasBeenPressed(button) {
      if (thumbsUpButton.className === button.className) {
        return thumbsDownButton.classList.contains("selected");
      } else {
        return thumbsUpButton.classList.contains("selected");
      }
    }

    //switches the selected status of both rating buttons
    function switchSelectedButton() {
      thumbsUpButton.classList.toggle("selected");
      thumbsDownButton.classList.toggle("selected");
    }

    //reloads the prompt and lets the ai generate a new response
    function reloadPrompt(promptUUID) {
      //search the cached prompts to find the corresponding message
      const prompt = prompts.get(promptUUID);
      //sends the prompt to the server again to reload it
      sendRegenerateMessage(promptUUID, prompt, REGENERATE_URL);

    }

    const wrapperResponseMessageButtons = document.createElement("div");
    wrapperResponseMessageButtons.className = "wrapperResponseMessageButtons";
    wrapperResponseMessageButtons.style.height = "40px";
    wrapperResponseMessageButtons.style.paddingTop = "10px";

    wrapperResponseMessageButtons.appendChild(createReloadButton());

    if (success) {
      wrapperResponseMessageButtons.appendChild(thumbsUpButton);
      wrapperResponseMessageButtons.appendChild(thumbsDownButton);
    }

    return wrapperResponseMessageButtons;
  }

  const responseMessage = document.createElement("div");
  responseMessage.className = "responseMessage";
  responseMessage.id = responseUUID;
  responseMessage.innerHTML = text;
  if (success) {
    responseMessage.style.backgroundColor = "#A4A4AC";
  } else {
    responseMessage.style.backgroundColor = "#e37e8a";
  }
  const wrapperResponseMessage = document.createElement("div");
  wrapperResponseMessage.appendChild(responseMessage);
  wrapperResponseMessage.appendChild(makeWrapperResponseMessageButtons());

  return wrapperResponseMessage;
};

//generates the eventStorming message without the buttons
const makeEventStormingMessage = (responseUUID, message, success) => {
  const promptUUID = responseToPrompt.get(responseUUID);

  const responseMessage = document.createElement("div");
  responseMessage.className = "responseMessage";
  responseMessage.id = responseUUID;
  responseMessage.innerHTML = text;
  if (success) {
    responseMessage.style.backgroundColor = "#A4A4AC";
  } else {
    responseMessage.style.backgroundColor = "#e37e8a";
  }
  const wrapperResponseMessage = document.createElement("div");
  wrapperResponseMessage.appendChild(responseMessage);

  return wrapperResponseMessage;
};


// The Chat Window is the window that appears when the Chat button is clicked
const makeLoadMessage = () => {
  const loadMessage = document.createElement("div");
  loadMessage.id = generateUUID();
  loadMessage.className = "loadMessage";
  loadMessage.innerHTML = LOAD_MESSAGE_SVG;
  loadMessage.style.backgroundColor = "#A4A4AC";
  loadMessage.style.alignSelf = "flex-start";
  loadMessage.style.border = "1px solid black";
  loadMessage.style.borderRadius = "10px";
  loadMessage.style.borderColor = "transparent";
  loadMessage.style.padding = "10px";
  return loadMessage
}

//this whole method makes the chat window so every design choice

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

//finds and returns the first prompt after the prompt with the given UUID and the number of answers it had to scroll through
//returns the div element of the next answer or null if there are no next answers yet
function getLastAnswerToPromptUUID(promptUUID) {
  //gets the prompt in question
  const prompt = document.getElementById(promptUUID);
  let numberOfAnswers = 0;
  let currentSibling = prompt.nextSibling;
  while (currentSibling !== null) {
    //if the currentSibling is a prompt written by the user return currentSibling
    if (prompts.get(currentSibling.id)) {
      return {firstAnswer: currentSibling, numberOfAnswers: numberOfAnswers};
    } else {
      numberOfAnswers++;
      currentSibling = currentSibling.nextSibling;
    }
  }
  //if while loop is exited without currentSibling being undefined return undefined
  return {firstAnswer: null, numberOfAnswers: numberOfAnswers};
}

//sends the message to the eventStormingServer
function sendEventStormingMessage(promptUUID, prompt) {
  handleSend(promptUUID, prompt, EVENTSTORMING_URL, "eventStorming");
}

//sends the prompt to the given server
function sendPromptMessage(promptUUID, prompt, serverUrlToSendTo) {
  handleSend(promptUUID, prompt, serverUrlToSendTo, "prompt");
}

//sends the regenerate Message to the server
function sendRegenerateMessage(promptUUID, prompt) {
  handleSend(promptUUID, prompt, REGENERATE_URL, "regenerate")
}

//sends the rating to the corresponding server, the rating is a whole number from -1 to 1
function sendRating(responseUUID, rating) {
  //gets the backend ID
  const responseID = responseUUIDtoID.get(responseUUID);
  GM_xmlhttpRequest({
    method: "POST",
    url: RATING_URL,
    data: JSON.stringify({id: responseID, rating: rating}), // Send data as JSON
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//handles the sending protocols and formats the window
function handleSend(promptUUID, prompt, serverUrlToSendTo, type) {
  const chatWindow = document.getElementById("prompts-container");
  const wrapperPromptsContainer = document.getElementById("wrapper-prompts-container");
  // set inputLock so you cannot enter a new message while the other one is loading
  inputLock = true;

  // loading animation until response
  const loadingMessage = makeLoadMessage();
  chatWindow.insertBefore(loadingMessage, getLastAnswerToPromptUUID(promptUUID).firstAnswer);

  //scrolls to the loading message
  loadingMessage.scrollIntoView({behavior: "smooth"});

  // Flag to check if timeout has been reached
  let timeoutReached = false;

  // Set a timeout to handle cases where the server does not respond
  const timeout = setTimeout(() => {
    // Set the flag to indicate timeout has reached so that a message that was late will not be displayed
    timeoutReached = true;
    // remove inputLock
    inputLock = false;

    const responseUUID = generateUUID();
    responseToPrompt.set(responseUUID, promptUUID);

    // show error message
    const errorMessage = makeResponseMessage(responseUUID, "Server did not respond in time. Please try again later.", false);

    chatWindow.insertBefore(errorMessage,loadingMessage);
    chatWindow.removeChild(loadingMessage);
    errorMessage.scrollIntoView({behavior: "smooth"});
  }, 60000); // 60 seconds timeout

  // Send the message to the server
  // When Server responds, add the response to the chat window
  GM_xmlhttpRequest({
    method: "POST",
    url: serverUrlToSendTo,
    data: JSON.stringify({prompt: prompt}), // Send data as JSON
    headers: {
      "Content-Type": "application/json",
    },
    onload: function (response) {
      // If timeout reached, do not process the response
      if (timeoutReached) return;

      // Clear the timeout if the server responds in time
      clearTimeout(timeout);

      //generate a UUID for the response and link it to the prompt
      const responseUUID = generateUUID();
      let responseMessage = undefined;

      responseToPrompt.set(responseUUID, promptUUID);
      //checks the type of function
      if (type === "prompt" || type === "regenerate") {
        if (JSON.parse(response.responseText).Success !== undefined) {
          responseUUIDtoID.set(responseUUID, JSON.parse(response.responseText).Success.id);
          responseMessage = makeResponseMessage(responseUUID, JSON.parse(response.responseText).Success.response, true);
        } else {
          responseUUIDtoID.set(responseUUID, JSON.parse(response.responseText).Error.id);
          responseMessage = makeResponseMessage(responseUUID, JSON.parse(response.responseText).Error, false);
        }
      } else if (type === "eventStorming") {
        if (JSON.parse(response.responseText).Success !== undefined) {
          responseMessage = makeEventStormingMessage(responseUUID, JSON.parse(response.responseText).Success.message, true);
        } else {
          responseMessage = makeEventStormingMessage(responseUUID, JSON.parse(response.responseText).Error.message, false);
        }
      }

      //inserts the response in front of the loading message
      chatWindow.insertBefore(responseMessage, loadingMessage);
      //after loading the message remove loading message
      chatWindow.removeChild(loadingMessage);
      //remove inputLock
      inputLock = false;
      responseMessage.scrollIntoView({behavior: "smooth"});
    },
    onerror: function () {
      // Clear the timeout if there's an error response from the server
      clearTimeout(timeout);
      // remove inputLock
      inputLock = false;

      const responseUUID = generateUUID();
      responseToPrompt.set(responseUUID, promptUUID);

      // show error message
      const errorMessage = makeResponseMessage(responseUUID, "An error occurred while communicating with the server. Please try again later.", false);
      chatWindow.insertBefore(errorMessage, loadingMessage);
      chatWindow.removeChild(loadingMessage);
      errorMessage.scrollIntoView({behavior: "smooth"});
    }
  });
}

// Add the Chat Button and Chat Window to the page when the window loads
window.onload = () => {
  document.head.appendChild(styleSheet());
  document.body.appendChild(makeChatButton());
  document.body.appendChild(makeChatWindow());
  // function checks if the padding of the topmenu changes
  const domObserver = new MutationObserver(handleDOMChange);
// configuration for the observer
  const domConfig = {childList: true, subtree: true};
// starting the observer
  domObserver.observe(document.documentElement, domConfig);
};

// the function checks if the DOM is generated so that we can start the other observer to observe the padding
const handleDOMChange = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Überprüfen, ob das Element mit der ID "topMenu" existiert
      const topMenu = document.getElementById('topmenu');
      if (topMenu) {
        // Ein MutationObserver erstellen, um Änderungen am Padding-Left zu überwachen
        const paddingLeftObserver = new MutationObserver(handlePaddingLeftChange);
        // Konfiguration für den Observer festlegen
        const config = {attributes: true, attributeFilter: ['style']};
        // Den Observer starten und das Element mit der ID "topMenu" beobachten
        paddingLeftObserver.observe(topMenu, config);
        // Observer beenden, sobald das Element gefunden wurde
        observer.disconnect();
      }
    }
  }
};

// function is getting called when the topmenu is found and the padding is changed
const handlePaddingLeftChange = (mutationsList, observer) => {
  const chatWindow = document.getElementById("chatWindow");
  const chatButton = document.getElementById("chatButton");
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      const paddingLeftValue = mutation.target.style.paddingLeft;
      chatWindow.style.left = paddingLeftValue;
      chatButton.style.left = paddingLeftValue;
    }
  }

};

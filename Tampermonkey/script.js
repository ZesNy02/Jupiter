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
const serverUrl = "http://localhost:3000/ai";
//Sever URL where the server receives ratings
const ratingURL = "http://localhost:3000/rating";
//cached prompt map mapped from UUID(string) -> Message content(string)
//this is important so that you can reload or give thumbs up or down so that you can find the specific message quickly
const prompts = new Map();

// a map connecting the prompts sent by the user to the received messages by the server
// responseUUID(string) -> promptUUID(string)
const responseToPrompt = new Map();

// The Chat button is the orange button that appears on the bottom left of the screen
// When clicked, it opens the chat window
const makeChatButton = () => {
    const chatButton = document.createElement("button");
    chatButton.id = "chat-button";
    chatButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="90%" viewBox="0 -960 960 960" width="90%"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>';
    chatButton.style.position = "fixed";
    chatButton.style.bottom = "10px";
    chatButton.style.left = "270px";
    chatButton.style.width = "48px";
    chatButton.style.height = "48px";
    chatButton.style.backgroundColor = "#448CEB";
    chatButton.style.borderRadius = "100%";
    chatButton.style.border = "none";
    chatButton.style.zIndex = "80";
    chatButton.style.cursor = "pointer";
    chatButton.style.padding = "4px";
    chatButton.addEventListener("click", () => {
        const chatWindow = document.getElementById("chat-window");
        chatWindow.style.display =
            chatWindow.style.display === "none" ? "flex" : "none";
    });
    return chatButton;
};

// A User Message is a message on the right of the Chat that the User Typed
const makeUserMessage = (text) => {
    const userMessage = document.createElement("div");
    userMessage.className = "userMessage";
    userMessage.id = generateUUID();
    userMessage.style.backgroundColor = "#A4A4AC";
    userMessage.innerHTML = text;
    userMessage.style.textOverflow = "wrap";
    userMessage.style.alignSelf = "flex-end";
    userMessage.style.width = "80%";
    userMessage.style.border = "1px solid black";
    userMessage.style.borderRadius = "10px";
    userMessage.style.padding = "10px";
    userMessage.style.wordWrap = "break-word"; // Zeilenumbruch bei langen Wörtern
    userMessage.style.whiteSpace = "pre-wrap"; // Zeilenumbrüche bei normalen Leerzeichen
    return userMessage;
};

// A Response Message is a message on the left of the Chat that the AI Typed
const makeResponseMessage = (responseUUID, text) => {

    //gets the promptUUID to give it to the buttons, so they can do their stuff
    const promptUUID = responseToPrompt.get(responseUUID);

    //creates the wrapper for the 3 buttons under the response
    const makeWrapperResponseMessageButtons = () => {
        //creates the reload button to put under the response message
        const createReloadButton = () => {
            const reloadButton = document.createElement("button");
            reloadButton.className = "reloadButton";
            reloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="30px"  width="30px" fill="#A4A4AC"><path d="M164.67-160v-66.67H288l-15.33-12.66q-60-49.34-86.34-109Q160-408 160-477.33q0-107.67 63.83-192.84 63.84-85.16 167.5-115.83v69.33q-74 28-119.33 93.84-45.33 65.83-45.33 145.5 0 57 21.33 102.16 21.33 45.17 60 79.84L331.33-278v-115.33H398V-160H164.67Zm404.66-13.33v-70q74.67-28 119.34-93.84 44.66-65.83 44.66-145.5 0-47-21.33-94.16-21.33-47.17-58.67-84.5L630.67-682v115.33H564V-800h233.33v66.67h-124l15.34 14q56.33 53.66 83.83 115.5Q800-542 800-482.67 800-375 736.5-289.5 673-204 569.33-173.33Z"/></svg>';
            reloadButton.style.backgroundColor = "transparent";
            reloadButton.style.border = "none";
            reloadButton.style.cursor = "pointer";
            //when clicked give the reloadPrompt function the UUID of the answer so that it can find the coresponding prompt
            reloadButton.addEventListener("click", () => {
                if (reloadButton.style.cursor !== "cursor") {
                    reloadPrompt(promptUUID);
                }
            });
            //darkens the button if hovered
            reloadButton.addEventListener("mouseover", () => {
                reloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="30px"  width="30px" fill="#000000"><path d="M164.67-160v-66.67H288l-15.33-12.66q-60-49.34-86.34-109Q160-408 160-477.33q0-107.67 63.83-192.84 63.84-85.16 167.5-115.83v69.33q-74 28-119.33 93.84-45.33 65.83-45.33 145.5 0 57 21.33 102.16 21.33 45.17 60 79.84L331.33-278v-115.33H398V-160H164.67Zm404.66-13.33v-70q74.67-28 119.34-93.84 44.66-65.83 44.66-145.5 0-47-21.33-94.16-21.33-47.17-58.67-84.5L630.67-682v115.33H564V-800h233.33v66.67h-124l15.34 14q56.33 53.66 83.83 115.5Q800-542 800-482.67 800-375 736.5-289.5 673-204 569.33-173.33Z"/></svg>';
            });

            //lightens the button if not hovered
            reloadButton.addEventListener("mouseout", () => {
                reloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="30px"  width="30px" fill="#A4A4AC"><path d="M164.67-160v-66.67H288l-15.33-12.66q-60-49.34-86.34-109Q160-408 160-477.33q0-107.67 63.83-192.84 63.84-85.16 167.5-115.83v69.33q-74 28-119.33 93.84-45.33 65.83-45.33 145.5 0 57 21.33 102.16 21.33 45.17 60 79.84L331.33-278v-115.33H398V-160H164.67Zm404.66-13.33v-70q74.67-28 119.34-93.84 44.66-65.83 44.66-145.5 0-47-21.33-94.16-21.33-47.17-58.67-84.5L630.67-682v115.33H564V-800h233.33v66.67h-124l15.34 14q56.33 53.66 83.83 115.5Q800-542 800-482.67 800-375 736.5-289.5 673-204 569.33-173.33Z"/></svg>';
            });

            return reloadButton;
        }
        //creates the thumbs up button to put under the response message
        const createThumbsUpButton = () => {
            const thumbsUpButton = document.createElement("button");
            thumbsUpButton.className = "thumbsUpButton";
            thumbsUpButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#A4A4AC"><path d="M717.33-120H274.67v-514.67L553.33-920 596-882.67q6.33 5.67 9.83 15.67t3.5 22.33v11.34l-44.66 198.66H850q26.67 0 46.67 20t20 46.67v81.23q0 7.1.33 14.77t-2.33 14.67L790.67-170q-8.92 20.83-29.73 35.42Q740.13-120 717.33-120Zm-376-66.67H726l124-292.66V-568H481.33l53.34-239.33-193.34 200.66v420Zm0-420v420-420Zm-66.66-28V-568H146v381.33h128.67V-120H79.33v-514.67h195.34Z"/></svg>';
            thumbsUpButton.style.backgroundColor = "transparent";
            thumbsUpButton.style.border = "none";
            thumbsUpButton.style.cursor = "pointer";
            thumbsUpButton.addEventListener("click", () => {
                thumbsUp(responseUUID);
            });
            //darkens the button if hovered
            thumbsUpButton.addEventListener("mouseover", () => {
                thumbsUpButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M717.33-120H274.67v-514.67L553.33-920 596-882.67q6.33 5.67 9.83 15.67t3.5 22.33v11.34l-44.66 198.66H850q26.67 0 46.67 20t20 46.67v81.23q0 7.1.33 14.77t-2.33 14.67L790.67-170q-8.92 20.83-29.73 35.42Q740.13-120 717.33-120Zm-376-66.67H726l124-292.66V-568H481.33l53.34-239.33-193.34 200.66v420Zm0-420v420-420Zm-66.66-28V-568H146v381.33h128.67V-120H79.33v-514.67h195.34Z"/></svg>';
            });

            //lightens the button if not hovered
            thumbsUpButton.addEventListener("mouseout", () => {
                thumbsUpButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#A4A4AC"><path d="M717.33-120H274.67v-514.67L553.33-920 596-882.67q6.33 5.67 9.83 15.67t3.5 22.33v11.34l-44.66 198.66H850q26.67 0 46.67 20t20 46.67v81.23q0 7.1.33 14.77t-2.33 14.67L790.67-170q-8.92 20.83-29.73 35.42Q740.13-120 717.33-120Zm-376-66.67H726l124-292.66V-568H481.33l53.34-239.33-193.34 200.66v420Zm0-420v420-420Zm-66.66-28V-568H146v381.33h128.67V-120H79.33v-514.67h195.34Z"/></svg>';
            });
            return thumbsUpButton;
        }
        //creates the thumbs down button to put under the response message
        const createThumbsDownButton = () => {
            const thumbsDownButton = document.createElement("button");
            thumbsDownButton.className = "thumbsDownButton";
            thumbsDownButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#A4A4AC"><path d="M241.33-840H684v514.67L405.33-40l-42.66-37.33Q356.33-83 352.83-93t-3.5-22.33v-11.34L394-325.33H108.67q-26.67 0-46.67-20T42-392v-81.23q0-7.1-.33-14.77-.34-7.67 2.33-14.67L168-790q8.92-20.83 29.73-35.42Q218.54-840 241.33-840Zm376 66.67H232.67l-124 292.66V-392h368.66L424-152.67l193.33-200.66v-420Zm0 420v-420 420Zm66.67 28V-392h128.67v-381.33H684V-840h195.33v514.67H684Z"/></svg>';
            thumbsDownButton.style.backgroundColor = "transparent";
            thumbsDownButton.style.border = "none";
            thumbsDownButton.style.cursor = "pointer";
            thumbsDownButton.addEventListener("click", () => {
                thumbsDown(responseUUID);
            });
            //darkens the button if hovered
            thumbsDownButton.addEventListener("mouseover", () => {
                thumbsDownButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M241.33-840H684v514.67L405.33-40l-42.66-37.33Q356.33-83 352.83-93t-3.5-22.33v-11.34L394-325.33H108.67q-26.67 0-46.67-20T42-392v-81.23q0-7.1-.33-14.77-.34-7.67 2.33-14.67L168-790q8.92-20.83 29.73-35.42Q218.54-840 241.33-840Zm376 66.67H232.67l-124 292.66V-392h368.66L424-152.67l193.33-200.66v-420Zm0 420v-420 420Zm66.67 28V-392h128.67v-381.33H684V-840h195.33v514.67H684Z"/></svg>';
            });

            //lightens the button up if not hovered
            thumbsDownButton.addEventListener("mouseout", () => {
                thumbsDownButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#A4A4AC"><path d="M241.33-840H684v514.67L405.33-40l-42.66-37.33Q356.33-83 352.83-93t-3.5-22.33v-11.34L394-325.33H108.67q-26.67 0-46.67-20T42-392v-81.23q0-7.1-.33-14.77-.34-7.67 2.33-14.67L168-790q8.92-20.83 29.73-35.42Q218.54-840 241.33-840Zm376 66.67H232.67l-124 292.66V-392h368.66L424-152.67l193.33-200.66v-420Zm0 420v-420 420Zm66.67 28V-392h128.67v-381.33H684V-840h195.33v514.67H684Z"/></svg>';
            });
            return thumbsDownButton;
        }

        const wrapperResponseMessageButtons = document.createElement("div");

        wrapperResponseMessageButtons.className = "wrapperResponseMessageButtons";
        wrapperResponseMessageButtons.style.height = "40px";
        wrapperResponseMessageButtons.style.paddingTop = "10px";
        //attaches the buttons into the div
        wrapperResponseMessageButtons.appendChild(createReloadButton());
        wrapperResponseMessageButtons.appendChild(createThumbsUpButton());
        wrapperResponseMessageButtons.appendChild(createThumbsDownButton());

        return wrapperResponseMessageButtons;
    }

    const responseMessage = document.createElement("div");
    responseMessage.className = "responseMessage";
    responseMessage.id = responseUUID;
    responseMessage.style.backgroundColor = "#A4A4AC";
    responseMessage.innerHTML = text;
    responseMessage.style.alignSelf = "flex-start";
    responseMessage.style.width = "80%";
    responseMessage.style.border = "1px solid black";
    responseMessage.style.borderRadius = "10px";
    responseMessage.style.padding = "10px";

    // Der Wrapper wird mit dem Div für die Nachricht und den drei Buttons gefüllt
    const wrapperResponseMessage = document.createElement("div");

    wrapperResponseMessage.appendChild(responseMessage);
    wrapperResponseMessage.appendChild(makeWrapperResponseMessageButtons());

    return wrapperResponseMessage;
};

//reloads the promp and lets the ai generate a new response
function reloadPrompt(promptUUID) {

    //search the cached prompts to find the corresponding message
    const prompt = prompts.get(promptUUID);
    //sends the prompt to the server again to reload it
    sendMessageAndFormat(promptUUID,prompt,serverUrl);

}

//Thumbs up gives the server a positive respond to the answer of the coresponding prompt
//TODO:implement
function thumbsUp(responseUUID) {
    //TODO
}

//Thumbs up gives the server a negative respond to the answer of the coresponding prompt
//TODO:implement
function thumbsDown(responseUUID) {
    //TODO
}

// The Chat Window is the window that appears when the Chat button is clicked
const makeLoadMessage = () => {
    const loadMessage = document.createElement("div");
    loadMessage.id = "loadMessage von https://www.svgbackgrounds.com/elements/animated-svg-preloaders/";
    loadMessage.innerHTML =
        "<div style=\"display: flex; justify-content: center; align-items: center; height: 100%;\">" +
        "<svg xmlns=\"http://www.w3.org/2000/svg\" alignment-baseline='central' height='30%' width='30%' viewBox=\"0 0 200 200\">" +
        "<circle fill=\"#448CEB\" stroke=\"#448CEB\" stroke-width=\"10\" r=\"15\" cx=\"40\" cy=\"100\">" +
        "<animate attributeName=\"opacity\" calcMode=\"spline\" dur=\"2\" values=\"1;0;1;\" keySplines=\".5 0 .5 1;.5 0 .5 1\" repeatCount=\"indefinite\" begin=\"-.4\"></animate></circle>" +
        "<circle fill=\"#448CEB\" stroke=\"#448CEB\" stroke-width=\"10\" r=\"15\" cx=\"100\" cy=\"100\">" +
        "<animate attributeName=\"opacity\" calcMode=\"spline\" dur=\"2\" values=\"1;0;1;\" keySplines=\".5 0 .5 1;.5 0 .5 1\" repeatCount=\"indefinite\" begin=\"-.2\"></animate></circle>" +
        "<circle fill=\"#448CEB\" stroke=\"#448CEB\" stroke-width=\"10\" r=\"15\" cx=\"160\" cy=\"100\">" +
        "<animate attributeName=\"opacity\" calcMode=\"spline\" dur=\"2\" values=\"1;0;1;\" keySplines=\".5 0 .5 1;.5 0 .5 1\" repeatCount=\"indefinite\" begin=\"0\"></animate></circle></svg>" +
        "</div>";
    loadMessage.style.backgroundColor = "#A4A4AC";
    loadMessage.style.alignSelf = "flex-start";
    loadMessage.style.width = "80%";
    loadMessage.style.border = "1px solid black";
    loadMessage.style.borderRadius = "10px";
    loadMessage.style.padding = "10px";
    return loadMessage
}

//this whole method makes the chat window so every design choice
const makeChatWindow = () => {
    // -------------------------- Chat Window --------------------------
    const chatWindow = document.createElement("div");
    chatWindow.id = "chat-window";
    chatWindow.style.position = "fixed";
    chatWindow.style.bottom = "10px";
    chatWindow.style.left = "270px";
    chatWindow.style.width = "40vw";
    chatWindow.style.height = "60vh";
    chatWindow.style.zIndex = "100";
    chatWindow.style.display = "none";
    chatWindow.style.flexDirection = "column";
    chatWindow.style.backgroundColor = "#448CEB";
    chatWindow.style.borderRadius = "10px";
    chatWindow.style.gap = "10px";

// chatHeader is a the header of the chat window
    const chatHeader = document.createElement("div");
    chatHeader.id = "chatHeader";
    chatHeader.style.display = "flex";
    chatHeader.style.alignItems = "center";
    chatHeader.style.flexDirection = "row";
    chatHeader.style.justifyContent = "space-between"; // Elemente an den Rändern verteilen
    chatHeader.style.width = "100%";
    chatHeader.style.height = "40px";
    chatHeader.style.order = "0";
    chatHeader.style.padding = "10px";
    chatHeader.style.paddingTop = "20px";
    chatHeader.style.paddingBottom = "0px";

// Chaty Name on top of the chat window
    const chatyName = document.createElement("h2");
    chatyName.id = "chatyName";
    chatyName.innerText = "Chaty";
    chatyName.style.margin = "0"; // Margin entfernen, um die Positionierung zu erleichtern
    chatyName.style.flexGrow = "1"; // Lässt den Namen den verfügbaren Platz einnehmen

// Chat Close Button
    const closeButton = document.createElement("button");
    closeButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="120%" viewBox="0 -960 960 960" width="120%" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
    closeButton.id = "closeButton";
    closeButton.style.color = "grey";
    closeButton.style.height = "40px";
    closeButton.style.width = "40px";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "10px";
    closeButton.style.backgroundColor = "transparent";
    closeButton.style.cursor = "pointer";
    closeButton.addEventListener("click", () => {
        chatWindow.style.display = "none";
    });

// Append elements to the chat header
    chatHeader.appendChild(chatyName); // Name zuerst einfügen
    chatHeader.appendChild(closeButton); // Button danach einfügen
    chatWindow.appendChild(chatHeader);
    // -------------------------- Wrapper Prompts Container --------------------------
    const wrapperPromptsContainer = document.createElement("div");
    wrapperPromptsContainer.id = "wrapper-prompts-container";
    wrapperPromptsContainer.style.width = "100%";
    wrapperPromptsContainer.style.height = "100%";
    wrapperPromptsContainer.style.order = "1";
    wrapperPromptsContainer.style.maxHeight = "80vh"; // Setze eine maximale Höhe relativ zur Viewport-Höhe
    wrapperPromptsContainer.style.overflow = "auto"; // Macht den Container scrollbar bei Überlauf
    wrapperPromptsContainer.style.zIndex = "100";
    wrapperPromptsContainer.style.padding = "10px";

    // -------------------------- Prompts Container --------------------------
    const promptsContainer = document.createElement("div");
    promptsContainer.id = "prompts-container";
    promptsContainer.style.display = "flex";
    promptsContainer.style.flexDirection = "column";
    promptsContainer.style.width = "100%";
    promptsContainer.style.height = "";
    promptsContainer.style.overflow = "auto";
    promptsContainer.style.scrollBehavior = "smooth";
    promptsContainer.style.minHeight = "100%";
    promptsContainer.style.borderRadius = "10px";
    promptsContainer.style.gap = "10px";
    promptsContainer.style.backgroundColor = "lightgray";
    promptsContainer.style.padding = "10px";
    wrapperPromptsContainer.appendChild(promptsContainer);
    chatWindow.appendChild(wrapperPromptsContainer);

    // -------------------------- Wrapper Chat Input --------------------------
    const wrapperChatInput = document.createElement("div");
    wrapperChatInput.id = "wrapperChatInput";
    wrapperChatInput.style.width = "100%";
    wrapperChatInput.style.height = "50px";
    wrapperChatInput.style.order = "5";
    wrapperChatInput.style.zIndex = "101";
    wrapperChatInput.style.padding = "10px";
    wrapperChatInput.style.paddingTop = "0px";
    wrapperChatInput.style.marginTop = "auto";

    // -------------------------- Chat Input Div --------------------------
    const chatInputDiv = document.createElement("div");
    chatInputDiv.id = "chatInputDiv";
    chatInputDiv.style.justifyContent = 'center';
    chatInputDiv.style.alignItems = 'center';
    chatInputDiv.style.display = "flex";
    chatInputDiv.style.flexDirection = "row";
    chatInputDiv.style.width = "100%";
    chatInputDiv.style.backgroundColor = "lightgray";
    chatInputDiv.style.borderRadius = "10px";

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
        sendMessageAndFormat(userMessage.id, message,serverUrl);
    };

    // -------------------------- Chat Input Button --------------------------
    const chatInputButton = document.createElement("button");
    chatInputButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>';
    chatInputButton.id = "chatInputButton";
    chatInputButton.style.alignSelf = "center";
    chatInputButton.style.border = "none";
    chatInputButton.style.order = "1";
    chatInputButton.style.cursor = "pointer";
    chatInputButton.style.backgroundColor = "transparent";
    chatInputButton.addEventListener("click", () => {
        sendPrompt();
    });
    chatInputDiv.appendChild(chatInputButton);

    // -------------------------- Chat Input --------------------------
    const chatInput = document.createElement("input");
    chatInput.id = "chat-input";
    chatInput.style.height = "40px";
    chatInput.style.width = "100%";
    chatInput.placeholder = "Type your message here";
    chatInput.style.border = "none";
    chatInput.style.backgroundColor = "transparent";
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendPrompt();
        }
    });
    chatInputDiv.appendChild(chatInput);
    wrapperChatInput.appendChild(chatInputDiv);
    chatWindow.appendChild(wrapperChatInput);

    return chatWindow;
};

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//sends the message to the correct server and formats the chat window
function sendMessageAndFormat(promptUIID, prompt, serverUrlToSendTo){

    const chatWindow = document.getElementById("prompts-container");
    const wrapperPromptsContainer=document.getElementById("wrapper-prompts-container");

    // Scroll to the bottom of the chat window (UX)
    wrapperPromptsContainer.scrollTop = wrapperPromptsContainer.scrollHeight;

    // loading animation until response
    const loadingMessage = makeLoadMessage();
    chatWindow.appendChild(loadingMessage);

    // Send the message to the server
    // When Server responds, add the response to the chat window
    GM_xmlhttpRequest({
        method: "POST",
        url: serverUrlToSendTo,
        data: JSON.stringify({messageId: promptUIID, message: prompt}), // Send data as JSON
        headers: {
            "Content-Type": "application/json",
        },
        onload: function (response) {

            //generate a UUID for the response and link it to the prompt
            const responseUUID = generateUUID();
            responseToPrompt.set(responseUUID, promptUIID);

            //TODO: cleanup on responseText to remove unnecessary json text
            chatWindow.appendChild(makeResponseMessage(responseUUID, response.responseText));
            chatWindow.removeChild(loadingMessage);

            //scroll to the top
            wrapperPromptsContainer.scrollTop =
                wrapperPromptsContainer.scrollHeight;

            //after loading the message remove loading message
            chatWindow.removeChild(loadingMessage);
        },
    });
}
// Add the Chat Button and Chat Window to the page when the window loads
window.onload = () => {
    document.body.appendChild(makeChatButton());
    document.body.appendChild(makeChatWindow());
};
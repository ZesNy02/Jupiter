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

const serverUrl = "http://localhost:3000/ai";

const makeChatButton = () => {
  const chatButton = document.createElement("button");
  chatButton.id = "chat-button";
  chatButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>';

  chatButton.style.position = "fixed";
  chatButton.style.bottom = "10px";
  chatButton.style.left = "270px";
  chatButton.style.width = "48px";
  chatButton.style.height = "48px";
  chatButton.style.backgroundColor = "orange";
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

const makeUserMessage = (text) => {
  const userMessage = document.createElement("div");
  userMessage.style.backgroundColor = "lightblue";
  userMessage.innerHTML = text;
  userMessage.style.alignSelf = "flex-end";
  userMessage.style.width = "80%";
  userMessage.style.border = "1px solid black";
  userMessage.style.borderRadius = "10px";
  userMessage.style.padding = "10px";
  return userMessage;
};

const makeResponseMessage = (text) => {
  const responseMessage = document.createElement("div");
  responseMessage.style.backgroundColor = "lightgreen";
  responseMessage.innerHTML = text;
  responseMessage.style.alignSelf = "flex-start";
  responseMessage.style.width = "80%";
  responseMessage.style.border = "1px solid black";
  responseMessage.style.borderRadius = "10px";
  responseMessage.style.padding = "10px";
  return responseMessage;
};

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
  chatWindow.style.display = "flex";
  chatWindow.style.flexDirection = "column";
  chatWindow.style.backgroundColor = "orange";
  chatWindow.style.borderRadius = "10px";
  chatWindow.style.gap = "10px";

  // -------------------------- Chat Header --------------------------
  const chatHeader = document.createElement("div");
  chatHeader.style.display = "flex";
  chatHeader.style.flexDirection = "row";
  chatHeader.style.width = "100%";
  chatHeader.style.height = "40px";
  chatHeader.style.order = "0";
  chatHeader.style.padding = "10px";
  chatHeader.style.paddingBottom = "0px";

  // -------------------------- Chat Close --------------------------
  const closeButton = document.createElement("button");
  closeButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
  closeButton.style.color = "gray";
  closeButton.style.height = "40px";
  closeButton.style.width = "40px";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "10px";
  closeButton.style.backgroundColor = "transparent";
  closeButton.style.cursor = "pointer";
  closeButton.addEventListener("click", () => {
    chatWindow.style.display = "none";
  });
  chatHeader.appendChild(closeButton);

  chatWindow.appendChild(chatHeader);

  // -------------------------- Wrapper Prompts Container --------------------------
  const wrapperPromptsContainer = document.createElement("div");
  wrapperPromptsContainer.id = "wrapper-prompts-container";
  wrapperPromptsContainer.style.width = "100%";
  wrapperPromptsContainer.style.height = "100%";
  wrapperPromptsContainer.style.overflow = "auto";
  wrapperPromptsContainer.style.scrollBehavior = "smooth";
  wrapperPromptsContainer.style.order = "1";
  wrapperPromptsContainer.style.zIndex = "100";
  wrapperPromptsContainer.style.padding = "10px";

  // -------------------------- Prompts Container --------------------------
  const promptsContainer = document.createElement("div");
  promptsContainer.id = "prompts-container";
  promptsContainer.style.display = "flex";
  promptsContainer.style.flexDirection = "column";
  promptsContainer.style.width = "100%";
  promptsContainer.style.height = "fit-content";
  promptsContainer.style.minHeight = "100%";
  promptsContainer.style.borderRadius = "10px";
  promptsContainer.style.gap = "10px";
  promptsContainer.style.backgroundColor = "lightgray";
  promptsContainer.style.padding = "10px";
  wrapperPromptsContainer.appendChild(promptsContainer);
  chatWindow.appendChild(wrapperPromptsContainer);

  // -------------------------- Wrapper Chat Input --------------------------
  const wrapperChatInput = document.createElement("div");
  wrapperChatInput.style.width = "100%";
  wrapperChatInput.style.height = "50px";
  wrapperChatInput.style.order = "5";
  wrapperChatInput.style.zIndex = "101";
  wrapperChatInput.style.padding = "10px";
  wrapperChatInput.style.paddingTop = "0px";
  wrapperChatInput.style.marginTop = "auto";

  // -------------------------- Chat Input Div --------------------------
  const chatInputDiv = document.createElement("div");
  chatInputDiv.style.display = "flex";
  chatInputDiv.style.flexDirection = "row";
  chatInputDiv.style.width = "100%";
  chatInputDiv.style.backgroundColor = "lightgray";
  chatInputDiv.style.borderRadius = "10px";

  // -------------------------- Send Prompt --------------------------
  const sendPrompt = () => {
    const message = chatInput.value;
    const chatWindow = document.getElementById("prompts-container");
    const wrapperPromptsContainer = document.getElementById(
      "wrapper-prompts-container"
    );
    chatInput.value = "";
    chatWindow.appendChild(makeUserMessage(message));
    wrapperPromptsContainer.scrollTop = wrapperPromptsContainer.scrollHeight;

    GM_xmlhttpRequest({
      method: "POST",
      url: serverUrl,
      data: JSON.stringify({ message: message }), // Send data as JSON
      headers: {
        "Content-Type": "application/json",
      },
      onload: function (response) {
        // Handle the response from the server
        chatWindow.appendChild(makeResponseMessage(response.responseText));
        wrapperPromptsContainer.scrollTop =
          wrapperPromptsContainer.scrollHeight;
      },
    });
  };

  // -------------------------- Chat Input Button --------------------------
  const chatInputButton = document.createElement("button");
  chatInputButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>';
  chatInputButton.style.height = "40px";
  chatInputButton.style.width = "40px";
  chatInputButton.style.borderRadius = "100%";
  chatInputButton.style.backgroundColor = "gray";
  chatInputButton.style.border = "none";
  chatInputButton.style.order = "1";
  chatInputButton.style.cursor = "pointer";
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

window.onload = () => {
  ("use strict");
  console.log("-------------------------------");
  console.log("-------------------------------");
  console.log("-------------------------------");

  document.body.appendChild(makeChatButton());
  document.body.appendChild(makeChatWindow());

  console.log("-------------------------------");
  console.log("-------------------------------");
  console.log("-------------------------------");
};

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

let prompts = ["What is your name?"];
let responses = [
  "My name is the ultimate chatbot that can help you with the prooph-board but wont!",
];
let oftenAsked = ["Asked once", "Asked twice"];

const makeChatButton = () => {
  const chatButton = document.createElement("button");
  chatButton.id = "chat-button";
  chatButton.className = "ui circular icon button big";
  chatButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>';

  chatButton.style.position = "fixed";
  chatButton.style.bottom = "60px";
  chatButton.style.right = "10px";
  chatButton.style.zIndex = "999";
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
  const chatWindow = document.createElement("div");
  chatWindow.id = "chat-window";
  chatWindow.style.position = "fixed";
  chatWindow.style.top = "52px";
  chatWindow.style.right = "0px";
  chatWindow.style.width = "30vw";
  chatWindow.style.height = "75vh";
  chatWindow.style.zIndex = "100";
  chatWindow.style.display = "flex";
  chatWindow.style.flexDirection = "column";
  chatWindow.style.backgroundColor = "white";
  chatWindow.style.border = "1px solid black";
  chatWindow.style.borderRadius = "0 0 0 10px";
  chatWindow.style.padding = "10px";

  const chatInput = document.createElement("input");
  chatInput.id = "chat-input";
  chatInput.style.order = "1";
  chatInput.style.zIndex = "101";
  chatInput.style.height = "40px";
  chatInput.style.width = "100%";
  chatInput.style.border = "1px solid black";
  chatInput.style.marginTop = "auto";
  chatInput.placeholder = "Type your message here";
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const message = chatInput.value;
      const chatWindow = document.getElementById("chat-window");
      chatWindow.appendChild(makeUserMessage(message));
      chatWindow.appendChild(makeResponseMessage("I am a bot"));
      chatInput.value = "";
    }
  });
  chatWindow.appendChild(chatInput);

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

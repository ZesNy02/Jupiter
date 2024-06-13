export const makeChatWindow = () => {
    const chatWindow = document.createElement("div");
    chatWindow.id = "chat-window";

    const chatHeader = document.createElement("div");
    chatHeader.id = "chatHeader";

    const chatyName = document.createElement("h2");
    chatyName.id = "chatyName";
    chatyName.innerText = "Chaty";

    const closeButton = document.createElement("button");
    closeButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="120%" viewBox="0 -960 960 960" width="120%" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
    closeButton.id = "closeButton";
    closeButton.addEventListener("click", () => {
        chatWindow.style.display = "none";
    });

    chatHeader.appendChild(chatyName);
    chatHeader.appendChild(closeButton);
    chatWindow.appendChild(chatHeader);

    const wrapperPromptsContainer = document.createElement("div");
    wrapperPromptsContainer.id = "wrapper-prompts-container";

    const promptsContainer = document.createElement("div");
    promptsContainer.id = "prompts-container";
    wrapperPromptsContainer.appendChild(promptsContainer);
    chatWindow.appendChild(wrapperPromptsContainer);

    const wrapperChatInput = document.createElement("div");
    wrapperChatInput.id = "wrapperChatInput";

    const chatInputDiv = document.createElement("div");
    chatInputDiv.id = "chatInputDiv";

    const sendPrompt = () => {
        const message = chatInput.value;
        if (message === "" || message.replaceAll(" ", "") === "") {
            return;
        }
        const chatWindow = document.getElementById("prompts-container");
        const wrapperPromptsContainer = document.getElementById("wrapper-prompts-container");
        chatInput.value = "";

        const userMessage = makeUserMessage(message);
        chatWindow.appendChild(userMessage);
        prompts.set(userMessage.id, message);
        sendMessageAndFormat(userMessage.id, message, serverUrl);
    };

    const chatInputButton = document.createElement("button");
    chatInputButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>';
    chatInputButton.id = "chatInputButton";
    chatInputButton.addEventListener("click", () => {
        sendPrompt();
    });
    chatInputDiv.appendChild(chatInputButton);

    const chatInput = document.createElement("input");
    chatInput.id = "chat-input";
    chatInput.placeholder = "Type your message here";
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

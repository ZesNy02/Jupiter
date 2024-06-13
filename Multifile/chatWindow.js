//this whole method makes the chat window so every design choice
const makeChatWindow = () => {

    const makeResizeHandle = (container) => {
        const resizeHandle = document.createElement("div");
        resizeHandle.className = "resize-handle";
        resizeHandle.id = "resizeHandle";
        resizeHandle.innerHTML = '<svg viewBox="-1.92 -1.92 27.84 27.84" fill="#D9D9D9" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, -1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#D9D9D9" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M21 15L15 21M21 8L8 21" stroke="#D9D9D9" stroke-width="1.6799999999999997" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
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
    chatWindow.id = "chat-window";
    chatWindow.style.position = "fixed";
    chatWindow.style.bottom = "10px";
    chatWindow.style.left = "270px";
    chatWindow.style.width = "30vw";
    chatWindow.style.height = "50vh";
    chatWindow.style.zIndex = "100";
    chatWindow.style.display = "none";
    chatWindow.style.flexDirection = "column";
    chatWindow.style.backgroundColor = "#448CEB";
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
    chatyName.style.userSelect = "none";
    chatyName.innerText = "Chaty";
    chatyName.style.color="#D9D9D9";
    chatyName.style.margin = "0"; // Margin entfernen, um die Positionierung zu erleichtern
    chatyName.style.flexGrow = "1"; // Lässt den Namen den verfügbaren Platz einnehmen

// Chat Close Button
    const closeButton = document.createElement("button");
    closeButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="120%" viewBox="0 -960 960 960" width="120%" fill="#D9D9D9"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
    closeButton.id = "closeButton";
    closeButton.style.color = "#D9D9D9";
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
    chatHeader.appendChild(chatyName);
    chatHeader.appendChild(closeButton);
    chatHeader.appendChild(makeResizeHandle(chatWindow));
    chatWindow.appendChild(chatHeader);
    // -------------------------- Wrapper Prompts Container --------------------------
    const wrapperPromptsContainer = document.createElement("div");
    wrapperPromptsContainer.id = "wrapper-prompts-container";
    wrapperPromptsContainer.style.width = "100%";
    wrapperPromptsContainer.style.flexGrow = "1"; // Allow it to grow and take available space
    wrapperPromptsContainer.style.order = "1";
    wrapperPromptsContainer.style.zIndex = "100";
    wrapperPromptsContainer.style.padding = "10px";
    wrapperPromptsContainer.style.overflow = "hidden"; // Hide overflow to ensure container stays within bounds

    // -------------------------- Prompts Container --------------------------
    const promptsContainer = document.createElement("div");
    promptsContainer.id = "prompts-container";
    promptsContainer.style.display = "flex";
    promptsContainer.style.flexDirection = "column";
    promptsContainer.style.width = "100%";
    promptsContainer.style.height = "100%";
    promptsContainer.style.overflowY = "auto"; // Scroll vertically
    promptsContainer.style.scrollBehavior = "smooth";
    promptsContainer.style.backgroundColor = "lightgray";
    promptsContainer.style.borderRadius = "6px";
    promptsContainer.style.gap = "10px";
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
    chatInputDiv.style.borderRadius = "15px";

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
        sendMessageAndFormat(userMessage.id, message, serverUrl);
    };

    // -------------------------- Chat Input Button --------------------------
    const chatInputButton = document.createElement("button");
    chatInputButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>';
    chatInputButton.id = "chatInputButton";
    chatInputButton.class = "chatInputButton";
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
    chatInput.style.outline = "none";
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
window.makeChatWindow = makeChatWindow;
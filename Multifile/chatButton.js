const makeChatButton = () => {
    const chatButton = document.createElement("button");
    chatButton.id = "chat-button";
    chatButton.className = "chat-button";
    chatButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="90%" viewBox="0 -960 960 960" width="90%"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>';
    chatButton.addEventListener("click", () => {
        const chatWindow = document.getElementById("chat-window");
        chatWindow.style.display =
            chatWindow.style.display === "none" ? "flex" : "none";
    });
    return chatButton;
};

window.makeChatButton = makeChatButton;
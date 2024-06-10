function createChatbox() {
    const chatbox = document.createElement('div');
    chatbox.id = 'chatbox';
    chatbox.classList.add('chatbox');

    const chatboxHeader = document.createElement('div');
    chatboxHeader.classList.add('chatbox-header');
    chatboxHeader.innerText = 'Chatbox';

    const chatboxMessages = document.createElement('div');
    chatboxMessages.classList.add('chatbox-messages');

    const chatboxInputContainer = document.createElement('div');
    chatboxInputContainer.classList.add('chatbox-input-container');

    const chatboxInput = document.createElement('input');
    chatboxInput.type = 'text';
    chatboxInput.classList.add('chatbox-input');

    const chatboxButton = document.createElement('button');
    chatboxButton.innerText = 'Send';
    chatboxButton.classList.add('chatbox-button');

    chatboxInputContainer.appendChild(chatboxInput);
    chatboxInputContainer.appendChild(chatboxButton);

    chatbox.appendChild(chatboxHeader);
    chatbox.appendChild(chatboxMessages);
    chatbox.appendChild(chatboxInputContainer);

    document.body.appendChild(chatbox);
}

function sendMessage(message) {
    const chatboxMessages = document.querySelector('.chatbox-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbox-message');
    messageElement.innerText = message;
    chatboxMessages.appendChild(messageElement);
}

window.createChatbox = createChatbox;
window.sendMessage = sendMessage;
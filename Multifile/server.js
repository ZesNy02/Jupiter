const serverUrl = "http://localhost:3000/ai";
const ratingURL = "http://localhost:3000/rating";
const prompts = new Map();
const responseToPrompt = new Map();

function reloadPrompt(promptUUID) {
     //search the cached prompts to find the corresponding message
     const prompt = prompts.get(promptUUID);
     //sends the prompt to the server again to reload it
     sendMessageAndFormat(promptUUID,prompt,serverUrl);
}

function sendRatingToServer(responseUUID, rating) {
    GM_xmlhttpRequest({
        method: "POST",
        url: ratingURL,
        data: JSON.stringify({messageId: responseUUID, rating: rating}), // Send data as JSON
        headers: {
            "Content-Type": "application/json",
        },
        onload: function (response) {
            //Stub not used
        },
    });
}

function thumbsUp(responseUUID) {
    sendRatingToServer(responseUUID, 1);
}

function thumbsNeutral(responseUUID) {
    sendRatingToServer(responseUUID, 0);
}

function thumbsDown(responseUUID) {
    sendRatingToServer(responseUUID, -1);
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function sendMessageAndFormat(promptUUID, prompt, serverUrlToSendTo) {
    const chatWindow = document.getElementById("prompts-container");
    const wrapperPromptsContainer = document.getElementById("wrapper-prompts-container");

    // loading animation until response
    const loadingMessage = makeLoadMessage();
    chatWindow.insertBefore(loadingMessage, document.getElementById(promptUUID).nextSibling);

    //scrolls to the loading message
    loadingMessage.scrollIntoView({behavior: "smooth"});

    // Send the message to the server
    // When Server responds, add the response to the chat window
    GM_xmlhttpRequest({
        method: "POST",
        url: serverUrlToSendTo,
        data: JSON.stringify({messageId: promptUUID, message: prompt}), // Send data as JSON
        headers: {
            "Content-Type": "application/json",
        },
        onload: function (response) {

            //generate a UUID for the response and link it to the prompt
            const responseUUID = generateUUID();
            responseToPrompt.set(responseUUID, promptUUID);

            var responseMessage = undefined;
            //check if the operation was a success
            if (JSON.parse(response.responseText).Success !== undefined) {
                responseMessage = makeResponseMessage(responseUUID, JSON.parse(response.responseText).Success.response, true);
            } else {
                responseMessage = makeResponseMessage(responseUUID, JSON.parse(response.responseText).Failure.response, false);
            }
            //inserts the response in front of the loading message
            chatWindow.insertBefore(responseMessage, loadingMessage);
            //after loading the message remove loading message
            chatWindow.removeChild(loadingMessage);

            responseMessage.scrollIntoView({behavior: "smooth"});
        },
    });
}

// Expose the functions to the global scope
window.reloadPrompt = reloadPrompt;
window.sendRatingToServer = sendRatingToServer;
window.thumbsUp = thumbsUp;
window.thumbsNeutral = thumbsNeutral;
window.thumbsDown = thumbsDown;
window.generateUUID = generateUUID;
window.sendMessageAndFormat = sendMessageAndFormat;

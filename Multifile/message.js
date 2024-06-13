const makeUserMessage = (text) => {
    const userMessage = document.createElement("div");
    userMessage.className = "userMessage";
    userMessage.id = generateUUID();
    userMessage.innerHTML = text;
    return userMessage;
};

const makeResponseMessage = (responseUUID, text) => {

    // gets the promptUUID to give it to the buttons, so they can do their stuff
    const promptUUID = responseToPrompt.get(responseUUID);

    // creates the wrapper for the 3 buttons under the response
    const makeWrapperResponseMessageButtons = () => {
        // creates the reload button to put under the response message
        const createReloadButton = () => {
            const reloadButton = document.createElement("button");
            reloadButton.className = "reloadButton";
            reloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="30px"  width="30px"><path d="M164.67-160v-66.67H288l-15.33-12.66q-60-49.34-86.34-109Q160-408 160-477.33q0-107.67 63.83-192.84 63.84-85.16 167.5-115.83v69.33q-74 28-119.33 93.84-45.33 65.83-45.33 145.5 0 57 21.33 102.16 21.33 45.17 60 79.84L331.33-278v-115.33H398V-160H164.67Zm404.66-13.33v-70q74.67-28 119.34-93.84 44.66-65.83 44.66-145.5 0-47-21.33-94.16-21.33-47.17-58.67-84.5L630.67-682v115.33H564V-800h233.33v66.67h-124l15.34 14q56.33 53.66 83.83 115.5Q800-542 800-482.67 800-375 736.5-289.5 673-204 569.33-173.33Z"/></svg>';
            reloadButton.addEventListener("click", () => {
                if (reloadButton.style.cursor !== "cursor") {
                    reloadPrompt(promptUUID);
                }
            });
            return reloadButton;
        }

        // creates the thumbs up button to put under the response message
        const createThumbsUpButton = () => {
            const thumbsUpButton = document.createElement("button");
            thumbsUpButton.className = "thumbsUpButton";
            thumbsUpButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px"><path d="M717.33-120H274.67v-514.67L553.33-920 596-882.67q6.33 5.67 9.83 15.67t3.5 22.33v11.34l-44.66 198.66H850q26.67 0 46.67 20t20 46.67v81.23q0 7.1.33 14.77t-2.33 14.67L790.67-170q-8.92 20.83-29.73 35.42Q740.13-120 717.33-120Zm-376-66.67H726l124-292.66V-568H481.33l53.34-239.33-193.34 200.66v420Zm0-420v420-420Zm-66.66-28V-568H146v381.33h128.67V-120H79.33v-514.67h195.34Z"/></svg>';
            thumbsUpButton.addEventListener("click", () => {
                thumbsUp(responseUUID);
            });
            return thumbsUpButton;
        }

        // creates the thumbs down button to put under the response message
        const createThumbsDownButton = () => {
            const thumbsDownButton = document.createElement("button");
            thumbsDownButton.className = "thumbsDownButton";
            thumbsDownButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px"><path d="M241.33-840H684v514.67L405.33-40l-42.66-37.33Q356.33-83 352.83-93t-3.5-22.33v-11.34L394-325.33H108.67q-26.67 0-46.67-20T42-392v-81.23q0-7.1-.33-14.77-.34-7.67 2.33-14.67L168-790q8.92-20.83 29.73-35.42Q218.54-840 241.33-840Zm376 66.67H232.67l-124 292.66V-392h368.66L424-152.67l193.33-200.66v-420Zm0 420v-420 420Zm66.67 28V-392h128.67v-381.33H684V-840h195.33v514.67H684Z"/></svg>';
            thumbsDownButton.addEventListener("click", () => {
                thumbsDown(responseUUID);
            });
            return thumbsDownButton;
        }

        const wrapperResponseMessageButtons = document.createElement("div");
        wrapperResponseMessageButtons.className = "wrapperResponseMessageButtons";

        // attaches the buttons into the div
        wrapperResponseMessageButtons.appendChild(createReloadButton());
        wrapperResponseMessageButtons.appendChild(createThumbsUpButton());
        wrapperResponseMessageButtons.appendChild(createThumbsDownButton());

        return wrapperResponseMessageButtons;
    }

    const responseMessage = document.createElement("div");
    responseMessage.className = "responseMessage";
    responseMessage.id = responseUUID;
    responseMessage.innerHTML = text;

    // Der Wrapper wird mit dem Div für die Nachricht und den drei Buttons gefüllt
    const wrapperResponseMessage = document.createElement("div");
    wrapperResponseMessage.appendChild(responseMessage);
    wrapperResponseMessage.appendChild(makeWrapperResponseMessageButtons());

    return wrapperResponseMessage;
};

const makeLoadMessage = () => {
    const loadMessage = document.createElement("div");
    loadMessage.id = "loadMessage";
    loadMessage.innerHTML =
        "<div style=\"display: flex; justify-content: center; align-items: center; height: 100%;\">" +
        "<svg xmlns=\"http://www.w3.org/2000/svg\" alignment-baseline='central' height='30%' width='30%' viewBox=\"0 0 200 200\">" +
        "<circle fill=\"#4483e0\" stroke=\"none\" cx=\"20\" cy=\"100\" r=\"20\">" +
        "<animate attributeName=\"cx\" dur=\"1s\" values=\"20;180;20\" repeatCount=\"indefinite\" />" +
        "</circle>" +
        "<circle fill=\"#83b0f2\" stroke=\"none\" cx=\"180\" cy=\"100\" r=\"20\">" +
        "<animate attributeName=\"cx\" dur=\"1s\" values=\"180;20;180\" repeatCount=\"indefinite\" />" +
        "</circle>" +
        "</svg>" +
        "</div>";

    return loadMessage;
};

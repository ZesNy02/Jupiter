// main.js

(function() {
    'use strict';

    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function loadCSS(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }

    loadScript('https://zesny02.github.io/Jupiter/chatbox.js', function() {
        console.log("Chatbox script geladen");
        if (typeof createChatbox === 'function') {
            createChatbox();
        } else {
            console.error("createChatbox ist nicht definiert");
        }
    });

    loadCSS('https://zesny02.github.io/Jupiter/chatbox.css');
})();

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

window.onload = function () {
  "use strict";

  // Create a new textarea element
  var prompt = document.createElement("TEXTAREA");
  const serverUrl = "http://localhost:3000"; // URL of your Python server

  // Set the textarea's appearance
  prompt.style.position = "fixed";
  prompt.style.bottom = "10px";
  prompt.style.left = "260px";
  prompt.style.width = "250px";
  prompt.style.height = "200px";
  prompt.style.zIndex = "999";

  // Add the textarea to the body of the document
  document.body.appendChild(prompt);

  // Listen for the 'Enter' key to be pressed
  prompt.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the newline character

      // Get the current value of the textarea
      var dataToSend = prompt.value;

      // Make a POST request to the server
      GM_xmlhttpRequest({
        method: "POST",
        url: serverUrl,
        data: JSON.stringify({ message: dataToSend }), // Send data as JSON
        headers: {
          "Content-Type": "application/json",
        },
        onload: function (response) {
          // Handle the response from the server
          prompt.value = response.responseText;
        },
      });
    }
  });
};

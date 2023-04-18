console.log("Background script loaded.");

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log("Message received:", request);
//   sendResponse({ message: "Message received." });
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'sendGetRequest') {
        fetch(request.url)
            .then(response => response.text())
            .then(data => sendResponse(data))
            .catch(error => console.error(error));
        return true; // Return true to indicate that sendResponse will be called asynchronously
    }
    else if (request.action === "open_popup") {
        chrome.windows.create({
            url: chrome.extension.getURL("popup.html"),
            type: "popup",
            focused: true,
            top: 100,
            left: 100,
            width: 400,
            height: 400
        });
    }
    else {
        console.log("Message received:", request);
        sendResponse({ message: "Message received." });
    }
});

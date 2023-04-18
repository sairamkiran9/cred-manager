console.log("Background script loaded.");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log("Message received:", request);
//   sendResponse({ message: "Message received." });
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'sendGetRequest') {
        fetch(request.url)
            .then(response => response.text())
            .then(data => sendResponse(data))
            .catch(error => console.error(error));
        return true; // Return true to indicate that sendResponse will be called asynchronously
    }
});

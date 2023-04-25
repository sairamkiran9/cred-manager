console.log("Background script loaded.");

chrome.runtime.onInstalled.addListener(({ reason }) => {
    console.log("Extension installed.", reason);
});

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    if (tab) {
        console.log("activated tabs: ", tab);
        return tab;
    }
    return null;
}

chrome.tabs.onActivated.addListener(getCurrentTab);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'sendGetRequest') {
        console.log("request.url", request.url)
        fetch(request.url)
            .then(response => response.text())
            .then(data => sendResponse(data))
            .catch(error => console.error(error));
        return true;
    }
    else if (request.action === "save_creds_popup") {
        chrome.windows.create({
            url: chrome.runtime.getURL("bs.html")+"?url="+request.url,
            type: "popup",
            focused: true,
            top: 150,
            left: 150,
            width: 500,
            height: 500
        });
        console.log("save creds popup window created", request.url);
        fetch(request.url)
            .then(response => response.text())
            .then(data => sendResponse(data))
            .catch(error => console.error(error));
        return true;
    }
    else if (request.action === "saveCreds") {
        fetch(request.url)
            .then(response => response.text())
            .then(data => sendResponse(data))
            .catch(error => console.error(error));
        console.log("save creds");
        return true;
    }
    else {
        console.log("Message received:", request);
        sendResponse({ message: "Message received." });
    }
});
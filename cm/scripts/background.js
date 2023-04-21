console.log("Background script loaded.");

chrome.runtime.onInstalled.addListener(({ reason }) => {
    console.log("Extension installed.", reason);
});

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    if (tab) {
        console.log("activated tabs: ", tab.url);
        return tab;
    }
    return null;
}


// chrome.tabs.onUpdated.addListener(
//     function (tabId, changeInfo, tab) {
//         console.log("Updated tab ID:", tabId);
//         console.log("Updated tab URL:", tab.url);
//         console.log("status info", changeInfo.status);          
//     }
// );

// function check_button() {
//     var myButton = document.getElementById('myButton-yes');
//     console.log("button:", myButton);

//     if (myButton) {
//         myButton.addEventListener('click', function () {
//             data = {
//                 "username": "mp",
//                 "password": "9090"
//             }
//             const saveQueryString = "http://localhost:5000/saveuser?data=" + JSON.stringify(data);
//             chrome.runtime.sendMessage(
//                 {
//                     action: 'saveCreds',
//                     url: saveQueryString
//                 },
//                 function (response) {
//                     console.log("json response: ", JSON.parse(response))
//                 });
//         });
//     }
// }

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'sendGetRequest') {
        fetch(request.url)
            .then(response => response.text())
            .then(data => sendResponse(data))
            .catch(error => console.error(error));
        return true;
    }
    else if (request.action === "save_creds_popup") {
        chrome.windows.create({
            url: chrome.runtime.getURL("bs.html"),
            type: "popup",
            focused: true,
            top: 150,
            left: 150,
            width: 200,
            height: 200
        });
        console.log("save creds popup window created");
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


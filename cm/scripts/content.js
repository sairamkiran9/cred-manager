let prevUrl = location.href;

console.log('prevUrl: ', prevUrl);

const observer = new MutationObserver(() => {
    const curUrl = location.href;
    console.log('url: ', curUrl);
    // init on route change
    if (curUrl !== prevUrl) {
        prevUrl = curUrl;
        init(curUrl);
    }
});

observer.observe(document, {
    subtree: true,
    childList: true,
});


const isTest = document.getElementById('asdf');
console.log("isTest: ", isTest)
if(isTest!= null){
    isTest.innerHTML = "prevUrl";
}

const urlHref = document.getElementById('savecreds');
if(urlHref!=null){
    const url = prevUrl.split('?url=');
    urlHref.href = "http://localhost:3000/savecreds/" + "?url=" + url[url.length - 1];
    isTest.innerHTML = url[url.length - 1];
}

// init on load
init(location.href);

function init(curUrl) {

    const isTextField = document.querySelector('input[type="text"]');
    const isPasswordField = document.querySelector('input[type="password"]');

    if (isPasswordField) {
        autoFill(curUrl);
    }

    function autoFill(curUrl) {
        console.log("curUrl: ", curUrl, curUrl.match("http://localhost"))
        if (curUrl.match("http://localhost") == null) {
            getQueryString = "http://localhost:5000/fetchuser?url=" + curUrl
            console.log("query_String: ", getQueryString)
            chrome.runtime.sendMessage(
                {
                    action: 'sendGetRequest',
                    url: getQueryString
                },
                function (response) {
                    console.log("sendGetRequest response: ", response)
                    if (response.trim().length === 2) {
                        popupQuery = "http://localhost:5000/popup?url=" + curUrl
                        // popupQuery = "http://local"
                        console.log("In if for unsaved creds")
                        chrome.runtime.sendMessage({ action: "save_creds_popup", url: popupQuery });
                    }
                    else {
                        const data = JSON.parse(response)
                        console.log("lol: ", data);
                        isTextField.setAttribute('value', data.username);
                        isPasswordField.setAttribute('value', data.password);
                    }
                });
        }
    }
}
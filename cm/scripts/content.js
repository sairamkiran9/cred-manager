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

// init on load
init(location.href);

function init(curUrl) {

    const isTextField = document.querySelector('input[type="text"]');
    // const isEmailTypeField = document.querySelector('input[type="email"]');
    // const isTextField1 = Array.from(document.querySelectorAll('input[type="text"]'));
    const testField = document.querySelector('#test')
    console.log("testField:", testField)

    const isPasswordField = document.querySelector('input[type="password"]');

    if (isPasswordField) {
        autoFill(curUrl);
    }

    function autoFill(curUrl) {
        console.log("curUrl: ", curUrl)
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

                    // fetch(chrome.runtime.getURL('bs.html'))
                    //     .then(response => response.text())
                    //     .then(data => {
                    //         const newDiv = document.createElement('div');
                    //         newDiv.innerHTML = data;
                    //         isTextField.insertAdjacentElement('afterend', newDiv);
                    //         console.log("div popup element added");
                    //     });
                    console.log("In if for unsaved creds")
                    chrome.runtime.sendMessage({ action: "save_creds_popup" });
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

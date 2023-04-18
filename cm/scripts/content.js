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
        query_string = "http://localhost:5000/fetchuser?url=" + curUrl
        console.log("query_String: ", query_string)
        chrome.runtime.sendMessage(
            {
                action: 'sendGetRequest',
                url: query_string
            },
            function (response) {
                console.log(response.trim().length)
                if (response.trim().length === 2) {
                    const newDiv = document.createElement('div');
                    newDiv.innerHTML = '<p id="innertest"> No saved passwords </p>' +
                    '<button>Select</button>';
                    isTextField.insertAdjacentElement('afterend', newDiv);
                    console.log("div popup element added");
                    chrome.runtime.sendMessage({ action: "open_popup" });
                    
                } else {
                    const data = JSON.parse(response)
                    console.log("lol: ", data);
                    isTextField.setAttribute('value', data.username);
                    isPasswordField.setAttribute('value', data.password);
                }
            });
    }
}


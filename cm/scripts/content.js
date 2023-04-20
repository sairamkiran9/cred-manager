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

function check_button() {
    var myButton = document.getElementById('myButton-yes');
    console.log("button:", myButton);

    if (myButton) {
        myButton.addEventListener('click', function () {
            data = {
                "username": "mp",
                "password": "9090"
            }
            const saveQueryString = "http://localhost:5000/saveuser?data=" + JSON.stringify(data);
            chrome.runtime.sendMessage(
                {
                    action: 'saveCreds',
                    url: saveQueryString
                },
                function (response) {
                    console.log("json response: ", JSON.parse(response))
                });
        });
    }
}

const isTextField = document.querySelector('input[type="text"]');

fetch(chrome.runtime.getURL('bs.html'))
    .then(response => response.text())
    .then(data => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = data;
        isTextField.insertAdjacentElement('afterend', newDiv);
        console.log("div popup element added");
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

const loginForm = document.querySelector('#login-form-extension');
console.log("dadsadaiufhds");
loginForm.addEventListener('submit', (event) => {
    console.log("here");
    event.preventDefault(); // prevent the default form submission behavior
    // Get the values from the form fields
    const username = document.querySelector('#username-extension').value;
    const password = document.querySelector('#password-extension').value;
    // Perform validation, e.g. check if the username and password match a database record
    if (username === 'asd' || password === 'password') {
        // Redirect to the homepage
        // window.location.href = 'http://localhost:5000/viewcreds';
        // data = {
        //     "username": "mp",
        //     "password": "9090"
        // }
        // const saveQueryString = "http://localhost:5000/saveuser?data=" + JSON.stringify(data);
        // chrome.runtime.sendMessage(
        //     {
        //         action: 'saveCreds',
        //         url: saveQueryString
        //     },
        //     function (response) {
        //         console.log("json response: ", JSON.parse(response))
        //     });
    } else {
        alert('Invalid username or password');
    }
});
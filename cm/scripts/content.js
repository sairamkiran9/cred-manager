let prevUrl = location.href;
console.log('prevUrl: ', prevUrl);
const observer = new MutationObserver(() => {
    const url = location.href;
    console.log('url: ', url);
    // init on route change
    if (url !== prevUrl) {
        prevUrl = url;
        init();
    }
});

observer.observe(document, {
    subtree: true,
    childList: true,
});

// chrome.runtime.onInstalled.addListener(function() {
// Your code that uses chrome.storage.local goes here

const writeToDb = (key, value) => {
    // const data =  {key: value}
    chrome.storage.local.set({ key: value }, function () {
        console.log('Value is set', key, value);
    });
}

const clearDbByKey = (key) => {
    chrome.storage.local.remove([key], function () {
        console.log("Item removed");
    });
}

const clearDb = () => {
    chrome.storage.local.clear(function () {
        console.log('Storage cleared');
    });
}

const readFromDb = (key) => {
    chrome.storage.local.get(['2'], function (result) {
        console.log('Value currently is ' + result.value);
    });
}

// const sizeOfDb = () => {
//     localforage.length().then(function (numberOfKeys) {
//         console.log('Current size of Db:', numberOfKeys);
//     }).catch(function (err) {
//         console.log(err);
//     });
// }

const viewDb = () => {
    chrome.storage.local.get(null, function (items) {
        var allKeys = Object.keys(items);
        console.log(allKeys);
    });
}
// });

// init on load
init();

function init() {

    const isTextField = document.querySelector('input[type="text"]');
    // const isEmailTypeField = document.querySelector('input[type="email"]');
    const isTextField1 = Array.from(document.querySelectorAll('input[type="text"]'));
    // isTextField.forEach((item) => {
    //   console.log(item);
    // })

    const isPasswordField = document.querySelector('input[type="password"]');
    // console.log("fetched data: ", isTextField, isPasswordField);

    if (isPasswordField) {
        autoFill();
    }

    function autoFill() {
        console.log("hey 9090: ", isPasswordField);
        isPasswordField.setAttribute('value', '123456');
        // isTextField.setAttribute('value', 'kiran9');
        // console.log(isTextField);
        chrome.runtime.sendMessage({ action: 'sendGetRequest', url: 'http://localhost:5000/hello' }, function (response) {
            console.log("lol: ", response);
            isTextField.setAttribute('value', response);
        });

    }
}


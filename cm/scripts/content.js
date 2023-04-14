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
    // Your code that uses chrome.storage.sync goes here

const writeToDb = (key, value) => {
    const data =  {key: value}
    chrome.storage.sync.set({ data }, function () {
        console.log('Value is set', key, value);
    });
}

const clearDbByKey = (key) => {
    chrome.storage.sync.remove(key, function () {
        console.log("Item removed");
    });
}

const clearDb = () => {
    chrome.storage.local.clear(function() {
        console.log('Storage cleared');
    });      
}

const readFromDb = (key) => {
    chrome.storage.sync.get(key, function (result) {
        console.log('Value currently is ' + result);
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
    chrome.storage.sync.get(null, function(items) {
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
        console.log("hey: ", isPasswordField);
        isPasswordField.setAttribute('value', '123456');
        isTextField.setAttribute('value', 'kiran9');
        console.log(isTextField);    
        // for (let i = 0; i < isTextField1.length; i++) {
        //     console.log(isTextField1[i].id, isTextField1[i].name, isTextField1[i].type);
        // }
        // viewDb();
        // writeToDb(1,'kiran9');
        // readFromDb(1);
        // viewDb();
    }
}


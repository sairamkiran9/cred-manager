let prevUrl = location.href;
console.log('prevUrl: ',prevUrl)
const observer = new MutationObserver(() => {
  const url = location.href;
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
  
  // init on load
  init();

  function init() { 

    const isTextField = document.querySelector('input[type="text"]');

    const isEmailField = document.querySelector('input[type="email"]');

    const isPasswordField = document.querySelector('input[type="password"]');
  
    console.log("fetched data: ", isTextField, isEmailField, isPasswordField);

    if (isPasswordField) {
      myMain();
    }
  
    function myMain() {
        console.log("hey: ", isPasswordField);
        isPasswordField.setAttribute('value', '12345');
        isTextField.setAttribute('value', 'kiran9');
    }
}


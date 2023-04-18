import { DOMMessage, DOMMessageResponse } from './types';
 
// Function called when a new message is received
const messagesFromReactAppListener = (
   msg: DOMMessage,
   sender: chrome.runtime.MessageSender,
   sendResponse: (response: DOMMessageResponse) => void) => {
  
   console.log('[content.js]. Message received', msg);
 
//    const headlines = Array.from(document.getElementsByTagName<"h1">("h1"))
//                        .map(h1 => h1.innerText);

    const isTextField = document.querySelector('input[type="text"]') as HTMLDivElement;;
    const isPasswordField = document.querySelector('input[type="password"]') as HTMLDivElement;;

    isPasswordField.setAttribute('value', '123456');
    isTextField.setAttribute('value', 'kiran9');
    
    // Prepare the response object with information about the site
   const response: DOMMessageResponse = {
       username: isTextField.getAttribute('value'),
       password: isTextField.getAttribute('value')
   };
   console.log('sending response');
   sendResponse(response);
}
 
/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
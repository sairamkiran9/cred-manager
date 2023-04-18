import { useState, useEffect} from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './credManager/types';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

useEffect(() => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'GET_DOM' } as DOMMessage,
        (response: DOMMessageResponse) => {
          setUsername(response.username);
          setPassword(response.password);
        });
    });
  });

  return (
    <div className="App">
      <h1>SEO Extension built with React!</h1>

      <ul className="SEOForm">
        <li className="SEOValidation">
          <div className="SEOVAlidationFieldValue">
            {username} {password}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
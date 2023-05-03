import React, { useState } from "react";
import CryptoJS from "crypto-js";

const EncryptDecrypt = () => {
  const [inputText, setInputText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const encryptText = () => {
    const encrypted = CryptoJS.AES.encrypt(inputText, "secret key");
    setEncryptedText(encrypted.toString());
  };

  const decryptText = () => {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, "secret key");
    setDecryptedText(decrypted.toString(CryptoJS.enc.Utf8));
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={encryptText}>Encrypt</button>
      <button onClick={decryptText}>Decrypt</button>
      <p>Encrypted text: {encryptedText}</p>
      <p>Decrypted text: {decryptedText}</p>
    </div>
  );
};

export default EncryptDecrypt;


import { fireAuth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CryptoJS from "crypto-js";

function OTPVerification() {
    
    // const { state } = useLocation();
    const phoneNumber = "+18509434453";
    const [confirmationResult, setConfirmationCode] = useState("");
    const [code, setCode] = useState("");
    const [isVerified, setVerify] = useState(false);

    // console.log("state: ",state); 
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const url = urlParams.get('url');
    const username = urlParams.get('username');
    const password = urlParams.get('password');

    const sendOTP = async (phoneNumber) => {
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                console.log(response)
            },
            'expired-callback': () => {
                console.log("Response expired. Ask user to solve reCAPTCHA again")
            }
        }, fireAuth);
        const confirmationResult = await signInWithPhoneNumber(fireAuth, phoneNumber, recaptchaVerifier);
        return confirmationResult;
    };
    
    const verifyOTP = async (confirmationResult, code) => {
        confirmationResult.confirm(code).then((result) => {
            handleVerify();
        }).catch((error) => {
            console.log(error)
        });
    };

    const handleVerify = () => {
        setVerify(true);
    }

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleSendOTP = async (event) => {
        event.preventDefault();
        const confirmationCode = await sendOTP(phoneNumber);
        setConfirmationCode(confirmationCode);
        console.log("confirmationResult", confirmationResult);
    };

    const handleVerifyOTP = async (event) => {
        event.preventDefault();
        await verifyOTP(confirmationResult, code);
    };

    return (
        <div>
            <form onSubmit={handleSendOTP}>
                <p> Verify user to get credentials </p>
                <button type="submit">Send OTP</button>
            </form>
            
            <form onSubmit={handleVerifyOTP}>
                <label>
                    OTP Code:
                    <input
                        type="text"
                        name="code"
                        value={code}
                        onChange={handleCodeChange}
                    />
                </label>
                <button type="submit">Verify OTP</button>
            </form>
            <p>{url}{username}: {isVerified ? password : ""}</p>
            <div id="recaptcha-container"></div>
        </div>
    );
}

export default OTPVerification;

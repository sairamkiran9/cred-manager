
import { fireAuth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import firebase from "firebase/app";
import { useState } from 'react';

// fireAuth.settings.appVerificationDisabledForTesting = false;

const sendOTP = async (phoneNumber) => {
    console.log("asdasd")
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
    // const userCredential = await confirmationResult.confirm(code);
    // console.log("usercred", userCredential)
    confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log("user success", result, code)
        // ...
      }).catch((error) => {
        console.log(error)
      });
    // return userCredential;
};

function OTPVerification() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirmationResult, setConfirmationCode] = useState("");
    const [code, setCode] = useState("");

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value.toString());
    };

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
        // const userCredential = await verifyOTP(confirmationResult, code);
        // console.log("user verified", userCredential, "suc");
        await verifyOTP(confirmationResult, code);
    };

    return (
        <div>
            <form onSubmit={handleSendOTP}>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                </label>
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
            <div id="recaptcha-container"></div>
        </div>
    );
}

export default OTPVerification;

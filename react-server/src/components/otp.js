
import { fireAuth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function OTPVerification() {
    const phoneNumber = "+18509434453";
    const [confirmationResult, setConfirmationCode] = useState("");
    const [code, setCode] = useState("");
    const [isVerified, setVerify] = useState(false);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // const url = urlParams.get('url');
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
            <Card sx={{ minWidth: 275, margin: 5 }}>
                <CardActions>
                    <form onSubmit={handleSendOTP}>
                        <label>Verify user to get credentials 
                            <button style={{"margin":3}} type="submit">Send OTP</button></label>
                    </form>
                </CardActions>
                <CardActions>
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
                </CardActions>
                {isVerified && <CardContent>
                    <Typography variant="h6" component="div">
                        username: {username}
                    </Typography>
                    <Typography variant="h6" component="div">
                        password: {password}
                    </Typography>
                </CardContent>}
            </Card>
            <div id="recaptcha-container"></div>
        </div>

    );
}

export default OTPVerification;

# CredManager

**CredManager** is a Chrome extension designed to securely store passwords. This tool helps users maintain strong, unique passwords all in one place. It assists by automatically filling in usernames and passwords on login and signup pages.

## Architecture
  <img src="https://github.com/user-attachments/assets/b4cdad8b-d04a-480d-9cee-a774f6e44709" alt="image" width="600" height="500">

## Features

- **Auto-fill login** username and password
- **Strong password generator** to create secure passwords
- **Secure password storage** with encryption
- **Multi-factor authentication (MFA)** for enhanced security
- **Share passwords** securely with encryption

## How It Works

CredManager uses **Firebase** for user authentication and database management. Passwords are securely stored using **crypto-js** for encryption. When users need to view or share a password, they must complete multi-factor authentication (MFA), ensuring added security.

## Multi-Factor Authentication (MFA)

The MFA feature was implemented to securely display encrypted passwords from the CredManager dashboard. When users wish to view their credentials, they must complete MFA:

1. An OTP is sent to the user's registered mobile number.
2. After verifying a captcha, the credentials are displayed on the UI.

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome, go to `chrome://extensions/`, and enable "Developer mode."
3. Click "Load unpacked" and select the extension's directory.
4. Once loaded, you can start using the extension by navigating to login/signup pages.

## Security Measures

- Passwords are encrypted using **crypto-js**, ensuring no plain-text storage.
- **Firebase authentication** handles secure user logins.
- **Multi-factor authentication (MFA)** adds an additional layer of security before revealing stored credentials.
  
## Technologies Used

### Frontend:
- **React**: for the user interface
- **Firebase**: for authentication and database
- **crypto-js**: for encryption
- **Material-UI**: for styling and design
- **react-router-dom**: for routing

### Backend:
- **Python**: backend logic
- **Flask**: web framework for API handling
- **firebase-sdk**: for interacting with Firebase services

## Contribution

We welcome contributions! Please fork the repository and submit a pull request, or report any issues you find.

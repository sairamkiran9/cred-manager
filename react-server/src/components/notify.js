import React, { useEffect, useState } from "react";
import { fireAuth, users } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { getAllCreds } from '../utils/utils';


const Notify = () => {
    const [data, setData] = useState({ url: "", username: "", password: "" });
    const [view, setView] = useState(false);
    const [notify, setNotify] = useState(0);
    const [fireuser, setUser] = useState("");
    const [logout, setLogout] = useState(false);

    function compareObjects(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        for (const key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return true;
            }
        }
        return false;
    }

    const handleClick = () => {
        setView(true);
        setLogout(!logout);
        setNotify(notify - 1);
    }

    const handleNotification = () => {
        setNotify(notify + 1);
    }

    const openPopUp = () => {
        window.open(
            `/otp?url=${data.url}&username=${data.username}&password=${data.password}`,
            "popup",
            "width=400,height=400"
        );
        setView(false);
        setLogout(false);
        setData(prev => {
            return { ...prev, url: "", username: "", password: "" };
        })
    }
    const handleLogout = () => {
        fireAuth.signOut().then(() => {
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        fireAuth.onAuthStateChanged(async (user) => {
            if (user != null) {
                setUser(fireAuth.currentUser.email);
                const currData = await getAllCreds();
                onSnapshot(users, (querySnapshot) => {
                    querySnapshot.docChanges().forEach((change) => {
                        if (change.type === "modified" && change.doc.id === user.email) {
                            const updatedValue = change.doc.data().creds;
                            console.log("update: ", updatedValue)
                            for (let i = 0; i < updatedValue.length; i++) {
                                if (i < currData.length) {
                                    if (compareObjects(currData[i], updatedValue[i]) === true) {
                                        setData(prev => {
                                            return { ...prev, url: updatedValue[i].url, username: updatedValue[i].username, password: updatedValue[i].password };
                                        })
                                        handleNotification();
                                    }
                                }
                                else {
                                    handleNotification();
                                }
                            }
                        }
                    });
                });
            }
        });
    }, []);

    return (
        <div>
            {fireuser &&
                <button className="myuser-logo" onClick={handleClick}>
                    <span className="myuser-logo"> {fireuser.charAt(0)}</span>
                    {/* <img style={{ height: "40px", width: "40px" }} src={process.env.PUBLIC_URL + "CM1.png"} alt="Hidden" /> */}
                    <div className="notification-badge">
                        {notify > 0 && <span className="badge">{notify}</span>}
                    </div>
                </button>}

            {view && notify >= 0 && logout && <button onClick={openPopUp}>view shared creds</button>}

            {logout && <button onClick={handleLogout}>Logout</button>}
        </div>
    );
};

export default Notify;

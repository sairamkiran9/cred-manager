// Importing modules
import React, { useState, useEffect } from "react";
import "../App.css";
import { getCreds } from "../utils/utils";
import { fireAuth } from "../firebase";

function GetUrlCreds() {
    const [data, setData] = useState([]);
    let url = "";
    const urlParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        fireAuth.onAuthStateChanged(async (user) => {
            if (user) {
                for (const [key, value] of urlParams) {
                    if (key === "url") {
                        url = value;
                    }
                }
                const queryUrl = "/firedb/<" + url + ">";
                fetch(queryUrl).then(res => {
                    try {
                        const jsonData = JSON.parse(res);
                        console.log('Valid JSON:', jsonData);
                        res.json().then((creds) => {
                            setData(creds);
                            // console.log(creds);
                            // for (let i = 0; i < creds.length; i++) {
                            //     console.log(creds[i]);
                            //   }
                        })
                    } catch (error) {
                        console.error('Invalid JSON:', error);
                    }
                });
                console.log("in geturlcreds: ", data);
            }
        })
    }, []);

    return (
        // <div> adasd {JSON.stringify(data)} </div>
        "dads"
    );
}

export default GetUrlCreds;

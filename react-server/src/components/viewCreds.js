// Importing modules
import React, { useState, useEffect } from "react";
import "../App.css";

function ViewCreds(props) {
    const [creds, setCreds] = useState([]);

    useEffect(() => {
        fetch("/viewcreds").then((res) =>
            res.json().then((creds) => {
                setCreds(creds);
                creds.forEach(item => {
                    console.log(item);
                });
            })
        );
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Creds Database</h1>
                <div>
                    {creds.map((item) => (
                        <div key={item.id}>
                            <p>username: {item.username}</p>
                            <p>password: {item.password}</p>
                            <p>Email: {item.email}</p>
                            <p>URL: {item.url}</p>
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
}

export default ViewCreds;

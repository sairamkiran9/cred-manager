import { useState, useEffect } from 'react';
import { fireAuth } from "../firebase";
import { createUser, getCreds, getData, removeCreds,  } from "../utils/utils"

function Home() {
    const [creds, setCreds] = useState(null);

    useEffect(() => {
        fireAuth.onAuthStateChanged(async (user) => {
            console.log(user);
            if (user == null) {
                window.location.replace("/logins");
            } else {
                getData();
            }
        });
    }, []);

    const getData = async () => {
        setCreds(await getCreds());
    };

    return (
            "hii"
    );

}

export default Home;


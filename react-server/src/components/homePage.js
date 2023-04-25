import { useEffect } from 'react';
import { fireAuth } from "../firebase";

function Home() {
    useEffect(() => {
        fireAuth.onAuthStateChanged(async (user) => {
            console.log(user);
            if (user == null) {
                window.location.replace("/login");
            }
        });
    }, []);
    return (
            "hii"
    );

}

export default Home;


import { doc, getDoc, setDoc } from "firebase/firestore";
import { fireAuth, fireDb } from "../firebase";

export const addCreds = async (cred) => {
    const email = fireAuth.currentUser.email;
    let data = (await getDoc(doc(fireDb, "users", email))).data();
    if (data && data.creds.filter((e) => e.url !== cred.url)) {
        data.creds = data.creds.filter((e) => e.url !== cred.url);
        const docs = doc(fireDb, "users", email);
        data.creds.push(cred);
        await setDoc(docs, data);
        console.log("email: ", email);
    }
};

export const getCreds = async (url) => {
    const email = fireAuth.currentUser.email;
    const data = (await getDoc(doc(fireDb, "users", email))).data();
    data.creds = data.creds.filter((e) => e.url === url);
    return JSON.stringify(data.creds[0]);
    
};

export const getAllCreds = async () => {
    const email = fireAuth.currentUser.email;
    const data = (await getDoc(doc(fireDb, "users", email))).data();
    return data.creds;
};

export const removeCreds = async (cred) => {
    const email = fireAuth.currentUser.email;
    let data = (await getDoc(doc(fireDb, "users", email))).data();
    if (data.creds = data.creds.filter((e) => e.url !== cred.url)) {
        const docs = doc(fireDb, "users", email);
        await setDoc(docs, data);
        console.log("done");
    }
};

export const createUser = async (email) => {
    const docs = doc(fireDb, "users", email);
    await setDoc(docs, {
        creds: []
    });
};

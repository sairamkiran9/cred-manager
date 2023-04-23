import { doc, getDoc, setDoc } from "firebase/firestore";
import { fireAuth, fireDb } from "../firebase";

export const addCreds = async (cred) => {
    const email = fireAuth.currentUser.email;
    const docRef = await getDoc(doc(fireDb, "users", email));
    const data = docRef.data();
    if (data !== undefined) {
        const docs = doc(fireDb, "users", email);
        await setDoc(docs, {
            ...data,
            creds: [...data["creds"], cred],
        });
    }
};

export const removeCreds = async (cred) => {
    const email = fireAuth.currentUser.email;
    const docRef = await getDoc(doc(fireDb, "users", email));
    const data = docRef.data();
    if (data !== undefined) {
        await setDoc(doc(fireDb, "users", email), {
            ...data,
            creds: data["creds"].filter((e) => e !== cred),
        });
    }
};

export const editCreds = async (oldcred, newcred) => {
    const email = fireAuth.currentUser.email;
    const docRef = await getDoc(doc(fireDb, "users", email));
    const data = docRef.data();
    if (data !== undefined) {
        await setDoc(doc(fireDb, "users", email), {
            ...data,
            creds: data["creds"].map((str) =>
                str === oldcred ? newcred : str
            ),
        });
    }
};

export const getCreds = async () => {
    const email = fireAuth.currentUser.email;
    const docRef = await getDoc(doc(fireDb, "users", email));
    const data = docRef.data();
    console.log(data.creds);
    return data.creds;
};

export const createUser = async (email) => {
    const docs = doc(fireDb, "users", email);
    await setDoc(docs, {
        creds: {
            url: "",
            email: "",
            username: "",
            password: ""
        }
    });
};

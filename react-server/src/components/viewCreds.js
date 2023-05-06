// Importing modules
import React, { useState, useEffect } from "react";
import "../App.css";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fireAuth } from "../firebase";
import CryptoJS from "crypto-js";
import { addCreds } from "../utils/utils"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function ViewCreds() {
    const [data, setData] = useState([]);
    const [isHovered, setHover] = useState(null);
    const [isShared, setShare] = useState(null);
    const [email, setEmail] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleData = (index, password) => {
        return index != null && index === isHovered ? password : "**************"
    }

    const handleFocus = (index) => {
        setHover(index);
    }
    const handleBlur = () => {
        setHover(null);
    }

    const openPopupShare = async (url, username, password) => {
        console.log("details", url, username, password, email);
        await addCreds(email, {
            url: url,
            username: username,
            password: password,
        }, () => {
            console.log("Details updated successfully!");
        });
        console.log("Creds shared successfully");
        alert("creds shared successfully to " + email);
        setShare(null);
    }

    const openPopup = async (url, username, password) => {
        console.log("details", url, username, password, email);
        window.open(
            `/otp?url=${url}&username=${username}&password=${password}`,
            "popup",
            "width=400,height=400"
        );        
    }

    const handleClick = async (e, type, url, username, password) => {
        e.preventDefault();
        const decryptedPass = CryptoJS.AES.decrypt(password, "secret key").toString(CryptoJS.enc.Utf8);
        if(type==="share"){
            await openPopupShare(url, username, decryptedPass);
        }
        else {
            await openPopup(url, username, decryptedPass);
        }
    }

    const handleShare = (e, index) => {
        e.preventDefault();
        // console.log(url, username, password)
        setShare(index);
    }

    useEffect(() => {
        fireAuth.onAuthStateChanged(async (user) => {
            if (user != null) {
                fetch("/firedb").then((res) =>
                    res.json().then((creds) => {
                        for (let i = 0; i < creds.length; i++) {
                            creds[i]["password"] = CryptoJS.AES.encrypt(creds[i]["password"], "secret key").toString();
                        }
                        setData(creds);
                    })
                );
            }
            else {
                console.log("user", user);
                window.location.replace("/login");
            }
        })
    }, []);

    return (
        <div>
            <h1 style={{ color: "white" }}>CredManager Database</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead >
                        <TableRow>
                            <StyledTableCell style={{ backgroundColor: "#ba323c", maxWidth: "100px" }} align="center">url</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: "#ba323c", minWidth: "100px" }} align="center">username</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: "#ba323c", minWidth: "500px" }} align="center">password</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: "#ba323c" }} align="center"></StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: "#ba323c" }} align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((row, index) => (
                            <StyledTableRow key={row.url}>
                                <StyledTableCell align="center">{row.url}</StyledTableCell>
                                <StyledTableCell align="center">{row.username}</StyledTableCell>
                                <StyledTableCell align="center" id={row.password}>{handleData(index, row.password)}</StyledTableCell>
                                <StyledTableCell align="center"><button onMouseOver={() => handleFocus(index)} onMouseOut={handleBlur} onDoubleClick={async (e) => await handleClick(e, "popup", row.url, row.username, row.password)}> <img style={{ height: "30px", width: "30px", opacity: "30%" }} src={process.env.PUBLIC_URL + "/static/images/eyee.jpg"} alt="Hidden" /> </button>
                                </StyledTableCell>
                                <StyledTableCell align="center" id="share"> {(index != null && index === isShared) ? <form onSubmit={async (e) => await handleClick(e, "share", row.url, row.username, row.password)}>
                                    {/* Share credentials securely! */}
                                    <label>
                                        Share credentials securely with:
                                        <input
                                            type="text"
                                            name="email"
                                            placeholder="enter email here"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </label>
                                    <label>
                                        <button style={{ "margin": 3 }} type="submit">Share creds</button>
                                    </label>
                                </form> : <button onClick={(e) => handleShare(e, index)}> share</button>} </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ViewCreds;
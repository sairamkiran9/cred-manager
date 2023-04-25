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
import { getCreds, getAllCreds } from "../utils/utils";
import { fireAuth, fireDb } from "../firebase";
import CryptoJS from "crypto-js";


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

function ViewCreds(props) {
    // const [creds, setCreds] = useState([]);
    const [data, setData] = useState([]);
    const [isHovered, setHover] = useState(false);
    const handleFocus = () => {
        setHover(true);
    }
    const handleBlur = () => {
        setHover(false);
    }

    useEffect(() => {
        fireAuth.onAuthStateChanged(async (user) => {
            if (user) {
                fetch("/firedb").then((res) =>
                    res.json().then((creds) => {
                        for (let i = 0; i < creds.length; i++) {
                            creds[i]["password"] = CryptoJS.AES.encrypt(creds[i]["password"], "secret key").toString();
                        }
                        setData(creds);
                    })
                );
            }
        })

    }, []);

    return (
        <div>
            <h1>Creds Database</h1>
            {/* {test && (
                <div>
                    <p>{test.url}</p>
                    <p>{test.username}</p>
                    <p>{test.password}</p>
                </div>
            )} */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">url</StyledTableCell>
                            <StyledTableCell align="right">username</StyledTableCell>
                            <StyledTableCell align="right">password</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((row) => (
                            <StyledTableRow key={row.url}>
                                <StyledTableCell align="right">{row.url}</StyledTableCell>
                                <StyledTableCell align="right">{row.username}</StyledTableCell>
                                <StyledTableCell align="right" id="hide">{row.password}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ViewCreds;
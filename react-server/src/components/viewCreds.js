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
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">url</StyledTableCell>
                                <StyledTableCell align="right">username&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">password&nbsp;</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {creds.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.url}</StyledTableCell>
                                    <StyledTableCell align="right">{row.username}</StyledTableCell>
                                    <StyledTableCell align="right">{row.password}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </header>
        </div>
    );
}

export default ViewCreds;
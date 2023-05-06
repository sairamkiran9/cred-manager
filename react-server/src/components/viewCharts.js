import React from 'react';
import { addCreds } from "../utils/utils"
import { fireAuth, fireDb, Users, Logins } from '../firebase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { date: '05/02/23', logins: 10 },
    { date: '05/03/23', logins: 13 },
    { date: '05/04/23', logins: 8 },
    { date: '05/05/23', logins: 5 },
];

const legendItems = [
    { value: 'value', label: 'Sales' },
  ];

const ViewChart = () => {
    return (
        <div>
            <Card sx={{ justifyContent: "center", backgroundColor: "transparent" }} style={{ margin: "0 15px 0 15px", justifyContent: "center" }}>
                <CardActionArea >
                    <CardContent >
                        <Typography variant="h3" component="div" style={{ color: "white" }}>
                            <img style={{ height: "40px", width: "40px" }} src={process.env.PUBLIC_URL + "CM1.png"} alt="Hidden" />
                            CredManager Insights
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ backgroundColor: "white" }} style={{ margin: "0 15px 0 15px"}}>
                <CardActionArea >
                    <CardContent >
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Typography variant="h6" component="div" style={{ color: "black", marginBottom: "30px"}}>
                            Number of logins of user on each day
                        </Typography>
                        <LineChart width={500} height={300} data={data} backgroundColor={"white"}>
                            <XAxis dataKey="date" />
                            <YAxis dataKey="logins"/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="logins" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                        {/* </Typography> */}
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default ViewChart;

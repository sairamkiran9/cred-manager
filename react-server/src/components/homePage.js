import { useEffect } from 'react';
import { fireAuth } from "../firebase";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const style = {
    width: '100%',
    justifyContent: "center",
};

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    // top: '1000',
    ...theme.typography.body2,
    '& [role="separator"]': {
        margin: theme.spacing(0, 2),
    },
}));

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
        <List sx={style} component="nav" aria-label="mailbox folders" >
            <ListItem >
                <Card sx={{ justifyContent: "center", backgroundColor: "transparent" }} style={{ margin: "0 15px 0 15px", justifyContent: "center" }}>
                    <CardActionArea >
                        <CardContent >
                            <Typography variant="h3" component="div" style={{color: "white"}}>
                            <img style={{ height: "40px", width: "40px"}} src={process.env.PUBLIC_URL + "CM1.png"} alt="Hidden" />
                                CredManager
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </ListItem>
            <ListItem >
                <Card sx={style} style={{ margin: "0 15px 0 15px", justifyContent: "center", backgroundColor: "transparent" }}>
                    <CardActionArea >
                        <CardContent >
                            <Typography variant="p" component="div" style={{ fontSize: "20px", color: "white" }}>
                                One place to secure your passwords safely
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </ListItem>
            <ListItem style={{ justifyContent: "center" }}>
                <Card sx={{ minWidth: 345 }} style={{ margin: "0 15px 0 15px" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/insight.png"
                            alt="green iguana"
                            style={{ objectFit: "contain" }}
                        />
                        <CardContent >
                            <Typography gutterBottom variant="h5" component="div">
                                <a href="http://localhost:3000/home" id="home">Insights</a>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ minWidth: 345 }} style={{ margin: "0 15px 0 15px" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/lock.png"
                            alt="green iguana"
                            style={{ objectFit: "contain" }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <a href="http://localhost:3000/savecreds" id="savecreds">SaveCreds</a>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ minWidth: 345 }} style={{ margin: "0 15px 0 15px" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/eye.png"
                            alt="green iguana"
                            style={{ objectFit: "contain" }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <a href="http://localhost:3000/viewcreds" id="view_creds">ViewCreds</a>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

            </ListItem>
        </List>
    );

}

export default Home;
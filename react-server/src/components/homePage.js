import { useEffect } from 'react';
import { fireAuth } from "../firebase";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    top: '1000',
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
        // <div>
        //     <h1>CredManager</h1>
        //     <p> Some description to make sense about the extension </p>
        //     <p id="test-content"></p>
        //     <a href="http://localhost:3000/savecreds" id="savecreds">saveCreds</a>
        //     <a href="http://localhost:3000/home" id="dashboard">dashboard</a>
        //     <a href="http://localhost:3000/viewcreds" id="view_creds">view_creds</a>
        // </div>
        <Grid container sx={{}}>
            <div>
                <h1>CredManager</h1>
                <p> Some description to make sense about the extension </p>
                <p id="test-content"></p>
                <a href="http://localhost:3000/savecreds" id="savecreds">saveCreds</a>
                <a href="http://localhost:3000/home" id="dashboard">dashboard</a>
                <a href="http://localhost:3000/viewcreds" id="view_creds">view_creds</a>
            </div>
            <Grid item xs>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/hero.png"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/hero.png"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/hero.png"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>

    );

}

export default Home;
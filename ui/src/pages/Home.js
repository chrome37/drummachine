import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import AppHeader from '../components/AppHeader';
import Pads from '../components/Pads';

const useStyles = makeStyles({
    displayBox: {
        height: "270px",
    }
});

const Home = () => {
    const classes = useStyles();
    return (
        <div>
            <AppHeader title="Dram Machine"/>
            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <Box className={classes.displayBox}></Box>
                </Grid>
                <Grid item md={4} sm={3} xs={1}>
                </Grid>
                <Grid item md={4} sm={6} xs={10}>
                    <Pads/>
                </Grid>
                <Grid item md={4} sm={3} xs={1}>
                </Grid>
            </Grid>
        </div>
        )
}

export default Home;
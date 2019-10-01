import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import AppHeader from '../components/AppHeader';
import Pads from '../components/Pads';
import SampleTable from '../components/SampleTable';
import Display from '../components/Display';

const useStyles = makeStyles({
});

const Home = () => {
    const classes = useStyles();
    return (
        <div>
            <AppHeader title="Drum Machine"/>
            <Grid container spacing={5}>
                <Grid item md={12} sm={12} xs={12} container justify='center'>
                    <Display />
                </Grid>
                <Grid item md={4} sm={3} xs={1}>
                </Grid>
                <Grid item md={4} sm={6} xs={10}>
                    <Pads/>
                </Grid>
                <Grid item md={4} sm={3} xs={1} >
                    <SampleTable />
                </Grid>
            </Grid>
        </div>
        )
}

export default Home;
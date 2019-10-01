import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid'
import AppHeader from '../components/AppHeader';
import Pads from '../components/Pads';
import SampleTable from '../components/SampleTable';
import Display from '../components/Display';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    control: {
        marginTop: theme.spacing(4)
    }
}));

const Home = (props) => {
    const {app} = props;
    const classes = useStyles();

    const sampleData = [
        {pad: "Z", path: `${process.env.PUBLIC_URL}/kit_1/Kick_1.wav`, name: "Kick_1"},
        {pad: "X", path: `${process.env.PUBLIC_URL}/kit_1/Snare_1.wav`, name: "Snare_1"},
        {pad: "C", path: `${process.env.PUBLIC_URL}/kit_1/Hi_Hat_1.wav`, name: "Hi_Hat_1"}
    ]

    const [samples, setSamples] = useState(sampleData);

    return (
        <div>
            <AppHeader title={app.state.title}/>
            <Container component="main" maxWidth="md" >
                <div className={classes.paper}>
                    <Display />
                    <Grid container spacing={1} className={classes.control} justify="center">
                        <Grid item md={6} sm={6} xs={12}>
                            <Pads sampleData={samples}/>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12} >
                            <SampleTable sampleData={samples}/>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
        )
}

export default Home;
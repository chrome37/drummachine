import React from 'react';
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

    return (
        <div>
            <AppHeader title={app.state.title}/>
            <Container component="main" maxWidth="md" >
                <div className={classes.paper}>
                    <Display />
                    <Grid container spacing={1} className={classes.control} justify="center">
                        <Grid item md={6} sm={6} xs={12}>
                            <Pads/>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12} >
                            <SampleTable />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
        )
}

export default Home;
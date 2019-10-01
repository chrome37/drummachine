import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    display: {
        marginTop: '20px',
        marginBottom: '0px',
        height: '270px'
    }
});

const Display = (props) => {
    const classes = useStyles();
    return(
    <Grid item md={10}>
        <Paper className={classes.display}></Paper>
    </Grid>
    )
}

export default Display;
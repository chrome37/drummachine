import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    display: {
        width: '100%',
        height: '270px'
    }
}));

const Display = (props) => {
    const classes = useStyles();
    return(
        <Paper className={classes.display}>
        </Paper>
    )
}

export default Display;
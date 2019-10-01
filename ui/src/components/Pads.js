import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
    pad: {
        width: "100%",
        height: "auto",
        '&::before': {
            content: '""',
            display: "block",
            paddingTop: "100%"
        }
    }
})

const Pad = (props) => {
    const classes = useStyles();
    const {padName} = props;

    const handleClick = () => {
    }

    const handleKeyDown = (e) => {
        if (e.key === padName.toLowerCase()) {
            console.log(padName);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    });

    return (
            <Button onClick={() => {handleClick()}} 
                    variant='contained' 
                    className={classes.pad}>
                    {padName}
            </Button>
            )
}

const Pads = (props) => {
    const classes = useStyles();
    const padNames = ["1", "2", "3", "4", "Q", "W", "E", "R", "A", "S", "D", "F", "Z", "X", "C", "V"]

    const padArr = padNames.map(padName => {
        return (
            <Grid item md={3} sm={3} xs={3} key={padName}>
                <Pad padName={padName} />
            </Grid>
        )
    });

    return (
        <Grid container spacing={1} className={classes.pads} item md={12} justify='center'>
            {padArr}
        </Grid>
    )
}

export default Pads;
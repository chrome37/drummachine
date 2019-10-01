import React, { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';
import { Typography, makeStyles, TextField, Container, Checkbox, FormControlLabel, Button, Grid, Link} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = (props) => {
    const {app, router} = props;
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (app.state.isAuthenticated) {
            router.history.push('/home');
        }
    });

    const handleSubmit = async () => {
        const data = {
            email: email,
            password: password
        }
        const result = await app.login(data).catch(err => {
           console.log(err);
        });

        if (result) {
            router.history.push('/home');
        }
        
    }

    const handleInputEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleInputPassword = (e) => {
        setPassword(e.target.value);
    }

    return(
        <div>
            <AppHeader title={app.state.title}/>
            <Container component="main" maxWidth="xs"> 
                <div className={classes.paper}>
                <Typography variant="h5" component="h1">Sign In</Typography>
                <div className={classes.form}>
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="new-password"
                        value={email}
                        onChange={(e) => {handleInputEmail(e)}}
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        autoComplete="new-password"
                        onChange={(e) => {handleInputPassword(e)}}
                    />
                    <FormControlLabel 
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {handleSubmit()}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
                </div>
            </Container>
        </div>
    )
}

export default Login;
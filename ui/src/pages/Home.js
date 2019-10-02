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
    const [samples, setSamples] = useState([]);
    const [kit, setKit] = useState('user-5d92c2c944ffdbd2e2fe3e4b-kit-1');
    const [userId, setUserId] = useState('5d92c2c944ffdbd2e2fe3e4b');

    useEffect(() => {
        async function fetchData() {
            const result = await app.http().get(`http://localhost:5000/api/v1/users/${userId}/kits/${kit}`).catch(err => {
                console.log(err);
            });
            setSamples(result.data.contents);
        }
        fetchData();
    }, [kit]);
    
    const handleAssign = (sampleName, value) => {
        const newSamples = samples.map(item => {
            if(sampleName === item.name) {
                item.pad = value;
            }
            return item
        })
        setSamples(newSamples);
    }

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
                            <SampleTable sampleData={samples} handleAssign={handleAssign}/>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
        )
}

export default Home;
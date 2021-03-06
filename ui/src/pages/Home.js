import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import AppHeader from "../components/AppHeader";
import Pads from "../components/Pads";
import SampleTable from "../components/SampleTable";
import Display from "../components/Display";
import Container from "@material-ui/core/Container";
import constants from "../common/constants";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  control: {
    marginTop: theme.spacing(4)
  }
}));

const Home = props => {
  const { app } = props;
  const classes = useStyles();
  const [sampleData, setSampleData] = useState([]);

  const [padData, setPadData] = useState(
    constants.pads.map(item => {
      return {
        padName: item,
        sample: {
          name: "",
          path: ""
        }
      };
    })
  );

  const kit = "user-5d92c2c944ffdbd2e2fe3e4b-kit-1";
  const userId = "5d92c2c944ffdbd2e2fe3e4b";

  useEffect(() => {
    async function fetchData() {
      try {
        app.setLoading(true);
        const result = await app
          .http()
          .get(`/api/v1/users/${userId}/kits/${kit}`);
        setSampleData(result.data.contents);
      } catch (err) {
        app.handleHttpError(err);
      } finally {
        app.setLoading(false);
      }
    }
    fetchData();
  }, [app]);

  const handleAssign = (padName, value) => {
    const newPadData = padData.map(item => {
      if (item.padName === padName) {
        item.sample = value;
      }
      return item;
    });
    setPadData(newPadData);
  };

  return (
    <div>
      <AppHeader title={app.state.title} />
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Display />
          <Grid
            container
            spacing={1}
            className={classes.control}
            justify="center"
          >
            <Grid item md={6} sm={6} xs={12}>
              <Pads padData={padData} app={app} />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <SampleTable
                samples={sampleData}
                handleAssign={handleAssign}
                padData={padData}
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Home;

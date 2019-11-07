import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import AudioHelper from "../common/audioHelper";

const useStyles = makeStyles({
  pad: {
    width: "100%",
    height: "auto",
    "&::before": {
      content: '""',
      display: "block",
      paddingTop: "100%"
    }
  }
});

const Pad = props => {
  const classes = useStyles();
  const { padName, sample, app } = props;
  const [sound, setSound] = useState(null);
  const audioHelper = new AudioHelper(new AudioContext());
  const padRef = useRef(null);

  useEffect(() => {
    const fetchSample = async () => {
      if (sample.path) {
        try {
            app.setLoading(true)
            const sound = await audioHelper.load(sample.path, app.state.token);
            setSound(sound);
        }catch(err) {
            app.handleHttpError(err)
        } finally {
            app.setLoading(false)
        }
      } else if (sound) {
        setSound(null);
      }
    };
    fetchSample();
  }, [sample]);

  const handleClick = () => {
    if (sound) {
      const src = audioHelper.createSource(sound);
      src.start();
    }
  };

  const handleKeyDown = e => {
    if (e.key === padName.toLowerCase()) {
      handleClick();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <Button
      onClick={() => {
        handleClick();
      }}
      variant="contained"
      className={classes.pad}
      ref={padRef}
    >
      {padName}
    </Button>
  );
};

const Pads = props => {
  const classes = useStyles();
  const { padData, app } = props;

  const padArr = padData.map(pad => {
    return (
      <Grid item md={3} sm={3} xs={3} key={pad.padName}>
        <Pad padName={pad.padName} sample={pad.sample} app={app} />
      </Grid>
    );
  });

  return (
    <Grid
      container
      spacing={1}
      className={classes.pads}
      item
      md={12}
      justify="center"
    >
      {padArr}
    </Grid>
  );
};

export default Pads;

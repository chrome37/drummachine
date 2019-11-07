import React from "react";
import { Dialog, makeStyles, Box, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    opacity: 0.5,
    display: "inline",
    textAlign: "center"
  }
}));

const LoadingDialog = props => {
  const { open } = props;
  const classes = useStyles();
  return (
    <Dialog fullScreen open={open} className={classes.paper}>
      <Box mt="20vh">
        <CircularProgress />
      </Box>
    </Dialog>
  );
};

export default LoadingDialog;

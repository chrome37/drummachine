
import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  paper: {
    minWidth: 300
  },
  text: {
  },
  buttonArea: {
    justifyContent: "center"
  },
  button: {
    minWidth: 80
  }
}));
const MessageDialog = props => {
  const classes = useStyles();
  const { open, title, body, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText classes={{ root: classes.text }}>
          {body}
        </DialogContentText>
        <DialogActions classes={{ root: classes.buttonArea }}>
          <Button
            className={classes.button}
            onClick={() => onClose(true)}
            color="primary"
            variant="outlined"
            autoFocus
          >
            閉じる
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
export default MessageDialog;
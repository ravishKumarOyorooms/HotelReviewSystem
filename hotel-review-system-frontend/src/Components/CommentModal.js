import React, { Component } from "react";
import { withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Forum from '@material-ui/icons/Forum';
import DialogContentText from '@material-ui/core/DialogContentText';


const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={props.onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default class CommentModal extends Component {
   
   state={
       data:this.props.text,
       cid:this.props.cid
   }
  
CommentSubmit=(e)=>{
    e.preventDefault();
       const data={
           text:this.state.data,
           id:this.state.cid
       }
       this.props.EditComment(data);
   }
  render() {
      
    return (
      <div>
        <Dialog maxWidth="xl"
            maxHeight="xl"
          onClose={this.props.dismissModal}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.props.dismissModal}
          ><Typography align="center">
            <Forum fontSize="large" /> Edit Comment
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <form>
              <TextField 
              style = {{width: 300}}
              fullWidth="true"
              type="text"
              name="text"
              value={this.state.data}
              onChange={e => this.setState({ data: e.target.value })}
            ></TextField>
            </form>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.props.dismissModal} color="primary">
              Cancel
            </Button>
            <Button autoFocus onClick={this.CommentSubmit} color="primary">
              
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

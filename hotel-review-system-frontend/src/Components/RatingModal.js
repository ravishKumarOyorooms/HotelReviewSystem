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
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import DialogContentText from '@material-ui/core/DialogContentText';
import { Grid } from "@material-ui/core";



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
  },
  
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other} style={{width:"400px"}}>
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

const labels = {
  0.5: "Useless",
  1: "Useless",
  1.5: "Poor",
  2: "Poor",
  2.5: "Ok",
  3: "Ok",
  3.5: "Good",
  4: "Good",
  4.5: "Excellent",
  5: "Excellent"
};

const ratingTypes = [
  "food",
  "service",
  "locality",
  "cleanliness",
  "security",
  "accessiblity",
  "valueForMoney"
];
const initialRatingVal = {};
ratingTypes.forEach(type => {
  initialRatingVal[type + "Value"] = 1;
  initialRatingVal[type + "HoverValue"] = -1;
});

export default class RatingModal extends Component {
  state = { ...initialRatingVal };
  RatingSubmit = e => {
    e.preventDefault();
    const data = {};
    for (let type of ratingTypes) {
      data[type] = this.state[type + "Value"];
    }
    this.props.onRatingModalSubmit(data);
   
  };
  render() {
    return (
      <div>
        <Dialog 
          maxWidth="xl"
          onClose={this.props.dismissModal}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.props.dismissModal}
          >
            Add Rating
          </DialogTitle>
          <DialogContent dividers>
          
            {ratingTypes.map(type => (
              <div 
              key={type}  style={{    display: 'flex',}}>
                <Grid container >
                  <Grid item xs={4}>
                <Typography display="inline"> {type.toLowerCase()}&nbsp;&nbsp;  </Typography>
                </Grid>
                <Grid item xs={4}>
                <Rating
                  name={type}
                  
                  value={this.state[type + "Value"]}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    this.setState({ [type + "Value"]: newValue });
                  }}
                  onChangeActive={(event, newHover) => {
                    this.setState({ [type + "HoverValue"]: newHover });
                  }}
                />
                </Grid>
                <Grid item xs={4}>
                {this.state[type + "Value"] !== null && (
                  <Box ml={3}>
                    {
                      labels[
                        this.state[type + "HoverValue"] !== -1
                          ? this.state[type + "HoverValue"]
                          : this.state[type + "Value"]
                      ]
                    }
                  </Box>
                )}
                </Grid>
                </Grid>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.props.dismissModal} color="primary">
              Cancel
            </Button>
            <Button autoFocus onClick={this.RatingSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

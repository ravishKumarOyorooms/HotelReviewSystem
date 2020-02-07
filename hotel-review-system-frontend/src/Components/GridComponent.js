import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {Grid,CssBaseline} from '@material-ui/core/';
import LoginComponent from './LoginComponent';

const useStyles = theme => ({
  root: {
      height: "80vh",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

export class GridComponent extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        
        <Grid container spacing={3}>
        <Grid item xs={false} sm={1} md={2} lg={3}></Grid>
        <Grid item xs={12} sm={10} md={8} lg={6}>
            {/* All logic to be built here */}
          <LoginComponent/>
        </Grid>
        
        <Grid item xs={false} sm={1} md={2} lg={3} > </Grid>
      </Grid>
    </Grid>
    )
  }
}

export default withStyles(useStyles)( GridComponent)


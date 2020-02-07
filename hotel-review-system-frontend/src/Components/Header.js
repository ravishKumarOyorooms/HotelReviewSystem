import React, { Component } from 'react'
import { withStyles} from '@material-ui/core/styles';
import { AppBar,Toolbar,Typography,Button} from '@material-ui/core';
import AuthenticationService from './AuthenticationService.js'
import {withRouter,Redirect,Link} from 'react-router-dom'


const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});


class HeaderComponent extends Component {
  constructor(props) {
    super(props)
    this.logoutClicked = this.logoutClicked.bind(this);
}
logoutClicked(event){
AuthenticationService.logout();
const { history } = this.props;
      if(history) history.push('/signin');
            else console.log("history not present");

}


  
  render() {

    

    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    const{classes} = this.props;
    return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

        
          <Typography variant="h6" className={classes.title}>
          <Link to={"/hotels"} style={{textDecoration:"none",color:"white"}}> Rating & Feedback System </Link>
          </Typography>
          {!isUserLoggedIn &&<Link to="/signin" style={{textDecoration:"none",color:"white"}} ><Button color="inherit">Login</Button></Link> }
          {isUserLoggedIn && <Button color="inherit" onClick= {(event)=>this.logoutClicked(event)}>
      Logout</Button>   }
        </Toolbar>
      </AppBar>
    </div>
    )
  }
}

export default withRouter(withStyles(useStyles)( HeaderComponent))
import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { Grid, Link,Avatar, Typography, Button, CssBaseline,TextField, Chip } from "@material-ui/core";
import { Container, withStyles } from "@material-ui/core";

import Image from "../Images/background_login.jpg";
import {withRouter} from 'react-router-dom'




const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class LoginComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
        username: '',
        password: '',
        hasLoginFailed: false,
        successfullyLoggedIn : false,
        showMessage: '',
        emptyUsername:false,
        emptyPassword : false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.loginClicked = this.loginClicked.bind(this)
}


handleChange(event) {
  
  //console.log(this.state);
  this.setState(
      {
          [event.target.name]
              : event.target.value
      }
  )
}

loginClicked(event) {
  if(this.state.username =='' ){
    this.setState({emptyUsername:true})
    return;
  }
  else this.setState({emptyUsername:false})

  if(this.state.password==''){
    this.setState({emptyPassword:true})
    return;
  }else this.setState({emptyPassword:false})

  
   
 
  AuthenticationService
   .executeBasicAuthenticationService(this.state.username, this.state.password)
   .then((response) => {
            //console.log(response.data);
            let username= (Object.values(response.data)[0]).toString();
            let userId  = (Object.keys(response.data)[0]).toString();
            let invalidId = "-1";
            if(userId !== invalidId){
              //console.log("success")
              this.setState({showMessage:"Login Successful"})
             this.setState({successfullyLoggedIn:true})
             this.setState({hasLoginFailed:false})
             AuthenticationService.registerSuccessfulLogin(userId,username);
             const { history } = this.props;
            if(history) history.push('/hotels');
            else console.log("history not present");
            console.log(AuthenticationService.isUserLoggedIn());
             
            }
            else {
              console.log("failed");
              console.log(username);
              this.setState({showMessage:username})
              this.setState({hasLoginFailed:true})
              this.setState({successfullyLoggedIn:false})
            }
            
        })
        .catch(function (error) {
          alert("Login Failed");
        });

  
  

}


      

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
     
  
    </div>
                    
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div>
          {this.state.hasLoginFailed && <Chip label={this.state.showMessage} color="secondary"/>  }
           {this.state.successfullyLoggedIn &&<Chip label="Login Successful" color="primary" />  }
           {this.state.emptyPassword &&<Chip label="Please Enter Password" color="secondary" />  }
           {this.state.emptyUsername &&<Chip label="Please Enter Username" color="secondary" />  }
           
          </div>
           <TextField 
            variant="outlined" margin="normal" required fullWidth autoFocus
              id="username" label="Username" name="username" autoComplete="username" 
              value={this.state.username} onChange={this.handleChange} 
            />
            <TextField
              variant="outlined" margin="normal" required type="password"
              fullWidth name="password" label="Password" id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleChange}
              
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick= {(event)=>this.loginClicked(event)}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
                  <Grid item>
                  <Link href="/" variant="body2">
                     New User?&nbsp;Create an account.
                    </Link>
                  </Grid>
                </Grid>
        </div>
      </Container>
    );
  }
}
export default withRouter((withStyles(useStyles)(LoginComponent)));
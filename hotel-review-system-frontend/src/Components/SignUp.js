import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import {withRouter} from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Container, withStyles , Chip} from "@material-ui/core";
import AuthenticationService from "./AuthenticationService.js";




const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


export class SignUp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName : '',
            email: '',
            invalidFieldLabel: '',
            allFieldValid : true,
            userExists : false,
            registrationSuccess : false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.signupClicked = this.signupClicked.bind(this)
        this.validateFields = this.validateFields.bind(this);
    }
    validateFields(){
        console.log("validation called")
        if(this.state.firstName === ''){
            this.setState({invalidFieldLabel: 'First Name'})
            this.setState({allFieldValid :false})
            return false;
        }
        else if(this.state.email === ''){
            this.setState({invalidFieldLabel  : 'Email'})
            this.setState({allFieldValid : false})
            return false;
        }
        else if(this.state.username === ''){
            this.setState({invalidFieldLabel : 'Username'})
            this.setState({allFieldValid : false})
            return false;
        }
        else if(this.state.password === ''){
            this.setState({invalidFieldLabel : 'Password'})
            this.setState({allFieldValid : false})
            return false;
        }
        this.setState({allFieldValid :true})
        return true;
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
       
      signupClicked(event) {
        this.validateFields();
        AuthenticationService
   .executeBasicRegistrationService(this.state.username, this.state.password)
   .then((response) => {
            //console.log(response.data);
            let username= (Object.values(response.data)[0]).toString();
            let userId  = (Object.keys(response.data)[0]).toString();
            let invalidId = "-1";
            if(userId !== invalidId){
              //console.log("success")
             this.setState({registrationSuccess:true});
             this.setState({userExists:false});
             const { history } = this.props;
            if(history) history.push('/signin');
            else console.log("history not present");
            }
            else {
              console.log("failed");
              console.log(username);
              this.setState({userExists:true})
              this.setState({registrationSuccess:false})
              
            }
            
        })


    }
      
    render() {
        const { classes } = this.props;
        if(typeof (classes) === 'undefined')console.log("classes not defined")
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <div>
            
             {!this.state.allFieldValid &&<Chip label= {"Please enter " +this.state.invalidFieldLabel} color="secondary" />  }
             {this.state.userExists && <Chip label= {"User Exists, Login to Continue"} color="secondary" />}
             {this.state.registrationSuccess && <Chip label= {"Successfully Registered, Login to Continue"} color="primary" /> }
             
            </div>
            <div style={{height:"10px"}}></div>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={this.handleChange}
                    />
                    </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={this.handleChange}
                    />
                    </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      onChange={this.handleChange}
                    />
                    </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick= {(event)=>this.signupClicked(event)}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
            </div>
            
          </Container>
        );
    }
}

export default withRouter((withStyles(useStyles)(SignUp)))
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import App from "../../App";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


const styles = theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f1f1f1"
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  avatar: {
    margin: "0 auto",
    marginBottom: "12px",
    marginTop: "12px",
    backgroundColor: theme.palette.error.main
  }
});

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      openInfoModal: false,
      fullWidth: true,
      maxWidth: "sm",
      username: "",
      password: "",
      redirectTo: null,
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      //error messages
      usernameError: "",
      passwordError: "",
      firstNameError: "",
      lastNameError: "",
      emailError: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleClickOpen = () => {
    this.setState({
      open: true,
      usernameError: "",
      passwordError: "",
      firstNameError: "",
      lastNameError: "",
      emailError: ""
    });
  };

  handleClickOpen2 = () => {
    this.setState({
      openInfoModal: true
    });
  };
  handleClose2 = () => {
    this.setState({ openInfoModal: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Form Validation function

  validate = () => {
    let usernameError = "";
    let passwordError = "";
    let firstNameError = "";
    let lastNameError = "";
    let emailError = "";

    if (!this.state.username) {
      usernameError = "username cannot be empty";
    }
    if (!this.state.firstName) {
      firstNameError = "first name cannot be empty";
    }
    if (!this.state.lastName) {
      lastNameError = "last name cannot be empty";
    }
    if (!this.state.password) {
      passwordError = "no password provided";
    }
    if (!this.state.email.includes("@") || !this.state.email) {
      emailError = "invalid email";
    }
    if (
      emailError ||
      usernameError ||
      firstNameError ||
      lastNameError ||
      passwordError 
    ) {
      this.setState({
        emailError,
        usernameError,
        firstNameError,
        lastNameError,
        passwordError
      });
      return false;
    }

    return true;
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit");

    axios
      .post("/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
              loggedIn: true,
              id: response.data._id,
              username: response.data.username
          })
          // update the state to redirect to home
          
          this.setState({
            redirectTo: "/dash"
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  }

  handleSubmitForm(event) {
    // event.preventDefault();

    //FORM VALIDATION
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      this.setState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: ""
      });

      axios
        .post("/user", {
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          dob: this.state.dob
        })
        .then(response => {
          // console.log(response);
          if (!response.data.errmsg) {
            console.log("successful signup");
            this.setState({ open: false });
          } else {
            console.log("username already taken");
          }
        })
        .catch(error => {
          console.log("signup error: ");
          console.log(error);
        });
    } else {
      this.setState({ open: true });
    }
  }

  render() {
    const { classes } = this.props;
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{
            minHeight: "100vh",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1545179605-1296651e9d43?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <h1
            style={{
              fontFamily: "Lobster",
              color: "white",
              fontSize: "75px",
              margin: "0",
              zIndex: 99
            }}
          >
            ParkHere
          </h1>
          <Grid
            item
            xs={3}
            style={{
              minWidth: "250px",
              zIndex: 99
            }}
          >
            <Paper id="signin" className={classes.root} elevation={1} mx="auto">
              <Avatar className={classes.avatar} color="primary">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" align="center">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.username}
                  onChange={this.handleChange}
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
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
                  onClick={this.handleSubmit}
                >
                  Sign In
                </Button>
                <Grid container style={{ margin: "12px 0 0 0" }}>
                  <Grid item>
                    <Link
                      style={{ cursor: "pointer" }}
                      onClick={() => this.handleClickOpen()}
                      variant="body2"
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>

              <Dialog
                open={this.state.open}
                handleClickOpen={this.handleClickOpen}
                style={{ fontFamily: "Roboto" }}
              >
                <DialogTitle id="form-dialog-title">
                  Create an Account
                </DialogTitle>
                <DialogContent style={{ fontFamily: "Roboto" }}>
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      autoFocus
                      label="Username"
                      variant="outlined"
                      margin="normal"
                      required
                      id="username"
                      name="username"
                      type="text"
                      placeholder="username"
                      fullWidth
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                    <div
                      style={{
                        fontFamily: "Roboto",
                        color: "#DB5461",
                        fontSize: "12px"
                      }}
                    >
                      {this.state.usernameError}
                    </div>
                    <TextField
                      label="Password"
                      autoFocus
                      variant="outlined"
                      margin="normal"
                      required
                      name="password"
                      id="password"
                      type="password"
                      fullWidth
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <div
                      style={{
                        fontFamily: "Roboto",
                        color: "#DB5461",
                        fontSize: "12px"
                      }}
                    >
                      {this.state.passwordError}
                    </div>
                    <TextField
                      label="First Name"
                      autoFocus
                      variant="outlined"
                      margin="normal"
                      required
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      fullWidth
                      value={this.state.firstname}
                      onChange={this.handleChange}
                    />
                    <div
                      style={{
                        fontFamily: "Roboto",
                        color: "#DB5461",
                        fontSize: "12px"
                      }}
                    >
                      {this.state.firstnameError}
                    </div>
                    <TextField
                      label="Last Name"
                      autoFocus
                      variant="outlined"
                      margin="normal"
                      required
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      fullWidth
                      value={this.state.lastname}
                      onChange={this.handleChange}
                    />
                    <div
                      style={{
                        fontFamily: "Roboto",
                        color: "#DB5461",
                        fontSize: "12px"
                      }}
                    >
                      {this.state.lastnameError}
                    </div>

                    <TextField
                      label="Email Address"
                      autoFocus
                      variant="outlined"
                      margin="normal"
                      required
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email@email.com"
                      fullWidth
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <div
                      style={{
                        fontFamily: "Roboto",
                        color: "#DB5461",
                        fontSize: "12px"
                      }}
                    >
                      {this.state.emailError}
                    </div>

                    <TextField
                      label="Date of Birth"
                      variant="outlined"
                      margin="normal"
                      required
                      type="date"
                      defaultValue="01-01-1990"
                      id="dob"
                      name="dob"
                      value={this.state.dob}
                      onChange={this.handleChange}
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => this.handleSubmitForm()}
                    color="primary"
                    variant="outlined"
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => this.handleClose()}
                    color="primary"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </Paper>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // open={this.state.openInfoModal}
              onClick={() => this.handleClickOpen2()}
              style={{
                fontFamily: "Roboto",
                margin: "20px 0",
                backgroundColor: "#FA9F42",
                color: "#f1f1f1",
                fontSize: "20px",
                fontWeight: "bold"
              }}
            >
              How to Use
            </Button>

            <Dialog
              open={this.state.openInfoModal}
              handleClickOpen={this.handleClickOpen2}
              style={{
                fontFamily: "Roboto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#84817a"
              }}
              fullWidth={this.state.fullWidth}
              maxWidth={this.state.maxWidth}
            >
              <DialogTitle id="info-modal">
                <Typography
                  style={{
                    color: "#93b7be",
                    fontSize: 20,
                    fontWeight: "bold"
                  }}
                >
                  How to use
                </Typography>
              </DialogTitle>
              <DialogContent style={{ fontFamily: "Roboto" }}>
                <Typography
                  style={{
                    fontFamily: "Roboto",
                    color: "#84817a",
                    fontSize: "16px"
                  }}
                >
                  ParkHere is a web appl that allows users to
                  search, list, and rent private parking spaces.
                </Typography>
                <hr />
                <Typography
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    color: "#93b7be",
                    fontSize: "16px",
                    marginTop: "5px"
                  }}
                >
                  1. Create an account.
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    color: "#ef7939",
                    fontSize: "16px",
                    marginTop: "5px"
                  }}
                >
                  Credentials:
                </Typography>
                  {/* example credentials */}
                <Typography
                  style={{
                    fontFamily: "Roboto",
                    color: "#84817a",
                    fontSize: "16px"
                  }}
                >
                  <strong>Username:</strong> example
                </Typography>

                <Typography
                  style={{
                    fontFamily: "Roboto",
                    color: "#84817a",
                    fontSize: "16px"
                  }}
                >
                  <strong>Password:</strong> example
                </Typography>

                <Typography
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    color: "#93b7be",
                    fontSize: "16px",
                    marginTop: "5px"
                  }}
                >
                  <hr />
                  2. Search for parking spots available for rent by location and
                  date.
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Roboto",

                    color: "#84817a",
                    fontSize: "16px",
                    marginTop: "5px"
                  }}
                >
                  3. Create your own listing.
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Roboto",

                    color: "#84817a",
                    fontSize: "16px",
                    marginTop: "5px"
                  }}
                >
                  Users can create listings for their own parking spots by clicking "Create".
                  <br />
                  You will be guided through submitting listing details,
                  choosing availability, and confirming the new listing.
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    color: "#93b7be",
                    fontSize: "16px",
                    marginTop: "5px"
                  }}
                >
                  <hr />
                  4. Dashboard.
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Roboto",

                    color: "#84817a",
                    fontSize: "16px",
                    marginTop: "5px"
                  }}
                >
                  The Listings view allows users to view, edit and remove all of
                  their active listings.
                  <br />
                  The reservation view allows users to see all upcoming
                  reservations, cancel reservations entirely or partially.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => this.handleClose2()}
                  color="error"
                  variant="outlined"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <div className="overlay" />
        </Grid>
      );
    }
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
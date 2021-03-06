import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      dob: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    console.log("sign-up handleSubmit, username: ");
    console.log(this.state.username);
    event.preventDefault();

    //request to server to add a new username/password
    axios
      .post("/user/", {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        dob: this.state.dob
      })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful signup");
          this.setState((window.location.href = "/"));
        } else {
          console.log("username already taken");
        }
      })
      .catch(error => {
        console.log("signup error: ");
        console.log(error);
      });
  }

  render() {
    return (
      <div
        className="modal fade"
        id="signUpModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="SignupForm modal-content">
            <div className="modal-header">
              <h5 className="signUpModal" id="signUpModalTitle">
                Create an Account:
              </h5>
            </div>
            <form className="form-horizontal">
              {/* Username */}
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {/* password */}
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="password">
                    Password:{" "}
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    placeholder="password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {/* FirstName */}
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="firstnNme">
                    First Name
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {/* Last Name */}
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="lastName">
                    Lastname
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {/* email */}
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="email@email.com"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {/* DOB */}
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="dob">
                    Date of Birth
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    type="text"
                    id="dob"
                    name="dob"
                    placeholder="dd/mm/yy"
                    value={this.state.dob}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group ">
                <div className="col-7"></div>
                <button
                  className="btn btn-primary col-1 col-mr-auto"
                  onClick={this.handleSubmit}
                  type="submit"
                  data-dismiss="modal"
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
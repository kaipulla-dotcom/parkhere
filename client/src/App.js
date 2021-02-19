import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import SignUp from "./pages/Signup/index";
import LoginForm from "./pages/Signin/index";
import Main from "./pages/Main/index";
import Calendar from "./pages/Calendar";
import Dash from "./pages/Dash";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
      role: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("/user/").then(response => {
      console.log(response.data);
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id,
          role: response.data.user.role
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/main" component={Main} />
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={LoginForm} />
            <Route exact path="/dash" component={Dash} />
            <Route exact path="/calendar" component={Calendar} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
import React, { Component } from "react";
import moment from "moment";
import ListingCard from "../../components/ListingCard";
import ReservCard from "../../components/ReservCard";
import API from "../../util/API";
import "./style.css";
import Nav from "../../components/Nav";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

const drawerWidth = 240;

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: "8px" }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex"
  },
  tabs: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 1,
    margin: "auto",
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%"
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1
  },
  large: {
    width: 150,
    height: 150,
    marginTop: "20px"
  }
});

class Dash extends Component {
  state = {
    listing: [],
    reserved: [],
    user: {},
    userId: "",
    username: "",
    firstName: "",
    lastName: "",
    photo: "",
    reservationsObject: {},
    // For tabs
    value: 0,
    mobileOpen: false
  };

  componentDidMount() {
    this.userInfo();
    this.loadListings();
  }

  userInfo = () => {
    console.log("user information = ", this.props.user);
    API.getUser(this.props.user)
      .then(res => {
        console.log("=======");
        console.log(res);
        console.log("=======");
        this.setState({ user: res.data });
        this.setState({ userId: res.data._id });
        this.setState({ username: res.data.username });
        this.setState({ firstName: res.data.firstName });
        this.setState({ lastName: res.data.lastName });
        this.loadListings();
        this.loadReserved();
      })
      .catch(err => console.log(err));
  };

  tester() {
    console.log("testing user");
    console.log(this.state);
  }

  loadListings = () => {
    console.log("user id before load listings = ", this.props.user);
    API.getListingsForProf(this.props.user)
      .then(res => {
        console.log("received the listing information for the user ", res.data);
        this.setState({ listing: res.data });
      })
      .catch(err => console.log(err));
  };

  processReserved = reserved => {
    // array isn't great for listing by date so we create an object
    let reservationsObject = {};
    if(reserved != null) {
    reserved.forEach(reservation => {
      reservationsObject[reservation.listing] =
        reservationsObject[reservation.listing] || reservation; // init listing key with reservation
      reservationsObject[reservation.listing].reservations =
        reservationsObject[reservation.listing].reservations || []; // create empty array
      reservationsObject[reservation.listing].reservations = [
        ...reservationsObject[reservation.listing].reservations,
        { date: reservation.date, reservationId: reservation._id }
      ]; //add new reservation to listing
    });
  }
    this.setState({
      reservationsObject
    });
  };

  loadReserved = () => {
    API.getReservForProf(this.props.user)
      .then(res => {
        console.log("inside loadReserved method = ", res);
        this.processReserved(res.data);
        this.setState({ reserved: res.data });
      })

      .catch(err => console.log(err));
  };

  loadReserved3 = () => {
    API.getReservForProf(this.props.user)
      .then(res => {
        this.setState({ reserved: res.data });
        console.log("RESERVATIONS3");
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };
  loadReserved2 = () => {
    API.getReservForProf(this.props.user)
      .then(res => {
        this.setState({ reserved: res.data });
        console.log("RESERVATIONS2");
        console.log(res.data);
      })

      .catch(err => console.log(err));
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;
    const { value, reservationsObject } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />

        <List
          className={classes.drawerList}
          style={{
            fontFamily: "Roboto",
            color: "#545454",
            fontSize: "18px"
          }}
        >
          <Avatar
            width="200"
            src={
              !this.state.photo
                ? "https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-512.png"
                : this.state.photo
            }
            className={classes.large}
          />
          <h3 style={{ textAlign: "center" }}>
            Welcome back, {this.state.firstName}!
          </h3>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} elevation={0}>
          <Nav />
        </AppBar>

        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <div>
            <div className={classes.root}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  {/* //Begin Tabs Menu// */}
                  <Paper className={classes.tabs} square={true} elevation={0}>
                    <Tabs
                      value={this.state.value}
                      onChange={this.handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      centered
                      variant="fullWidth"
                    >
                      <Tab label="Listings" />
                      <Tab label="Reservations" />
                    </Tabs>
                  </Paper>
                  {/* End Tabs Menu// */}
                  {value === 0 && (
                    <TabContainer>
                      <Paper className={classes.paper} elevation={0}>
                        <div>
                          <h1>LISTINGS</h1>
                          <div className={classes.cardContainer}>
                            {this.state.listing.map(listing => {
                              console.log("listing is an array = ", listing.city)
                              if (listing.user === this.state.userId) {
                                return (
                                  <div>
                                    <ListingCard
                                      loadListings={this.loadListings}
                                      key={listing._id}
                                      id={listing._id}
                                      title={listing.title}
                                      photo={listing.photo}
                                      address={listing.address}
                                      city={listing.city}
                                      state={listing.state}
                                      zip={listing.zip}
                                      handleEditListing={this.handleEditListing}
                                    />
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      </Paper>
                    </TabContainer>
                  )}
                  {value === 1 && (
                    <TabContainer>
                      <Paper className={classes.paper} elevation={0}>
                        <div>
                          <h1>RESERVATIONS</h1>
                          <div className={classes.cardContainer}>
                            {Object.keys(this.state.reservationsObject).map(
                              key => {
                                console.log("jknasjdnasjnd", key);
                                if (
                                  reservationsObject[key].renter ===
                                  this.state.userId
                                )
                                  return (
                                    <div>
                                      <ReservCard
                                        date={moment(
                                          reservationsObject[key].date
                                        ).format("LL")}
                                        reservations={
                                          reservationsObject[key].reservations
                                        }
                                        id={reservationsObject[key]._id}
                                        address={
                                          reservationsObject[key].address
                                        }
                                        title={reservationsObject[key].title}
                                        photo={reservationsObject[key].photo}
                                        loadReserved={this.loadReserved}
                                      />
                                    </div>
                                  );
                              }
                            )}
                          </div>
                        </div>
                      </Paper>
                    </TabContainer>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Dash.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dash);
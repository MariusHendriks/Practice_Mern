import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import { clearCurrentProfile } from "./actions/profileActions";

//import components
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Footer from "./components/layouts/Footer";

//import Dashboard
import Dashboard from "./components/dashboard/Dashboard";
//import auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

//import css
import "./App.css";

//Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and is Auth
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());

    store.dispatch(clearCurrentProfile());
    //redirect to logoin
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

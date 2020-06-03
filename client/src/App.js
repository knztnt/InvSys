import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import Navbar from "./components/navbar.component";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardStudent from "./components/board-student.component";
import BoardAcademic from "./components/board-academic.component";
import BoardNonac from "./components/board-nonacademic.component";
import BoardAdmin from "./components/board-admin.component";

class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path={["/", "/home"]} component={Home} />
          <div className="container mt-3">
            <Switch>
              
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/student" component={BoardStudent} />
              <Route path="/academic" component={BoardAcademic} />
              <Route path="/non-academic" component={BoardNonac} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
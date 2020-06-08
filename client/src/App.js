import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthService from "./services/auth.service";
// import "bootswatch/dist/yeti/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import Sidebar from "./components/sidebar.component";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardStudent from "./components/board-student.component";
import BoardAcademic from "./components/board-academic.component";
import BoardNonac from "./components/board-nonacademic.component";
import BoardAdmin from "./components/board-admin.component";
import AddItem from "./components/item/add-item.component";
import ViewItems from "./components/item/list-item.component";
import UpdateItems from "./components/item/update-item.component";
import AddService from "./components/item/add-service.component";
import ViewService from "./components/item/view-services.component";
import UpdateService from "./components/item/update-service.component";
import RequestItem from "./components/item/request-item.component";
import RequestService from "./components/item/request-service.component";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />

          {currentUser ? (
            <div className="container-fluid">
              <div className="row">
                <Sidebar />
                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 px-md-4"
                >
                  <div className="container d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mt-3 border-bottom">
                    <Switch>
                      <Route exact path={["/", "/home"]} component={Profile} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/profile" component={Profile} />
                      <Route path="/student" component={BoardStudent} />
                      <Route path="/academic" component={BoardAcademic} />
                      <Route path="/non-academic" component={BoardNonac} />
                      <Route path="/admin" component={BoardAdmin} />
                      <Route path="/add-item" component={AddItem} />
                      <Route path="/view-items" component={ViewItems} />
                      <Route path="/update-items/:item_no" component={UpdateItems} />
                      <Route path="/add-service" component={AddService} />
                      <Route path="/view-services" component={ViewService} />
                      <Route path="/update-services/:service_no" component={UpdateService} />
                      <Route path="/item/request/:item_no" component={RequestItem} />
                      <Route path="/service/request/:service_no" component={RequestService} />
                    </Switch>
                  </div>
                </main>
              </div>
            </div>) : (
              <div>
                <Switch>
                  <Route exact path={["/", "/home"]} component={Home} />
                  <Route exact path="/login" component={Login} />
                  {/* <div className="container d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mt-3 border-bottom">
                    
                    <Route exact path="/register" component={Register} />
                  </div> */}
                </Switch>
              </div>
            )}
        </div>
      </Router>
    );
  }
}

export default App;

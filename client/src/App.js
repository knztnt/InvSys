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
import Dashboard from "./components/dashboard.component";
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
import StudItemReq from "./components/request/approve-item-req.component";
import StudServiceReq from "./components/request/approve-service-req.component";
import ReviewItemReq from "./components/request/review-item-req.component";
import ReviewServiceReq from "./components/request/review-service-req.component";
import ViewAcReq from "./components/issue/view-ac-req.component";
import IssueAcReq from "./components/issue/issue-ac-req.component";
import ViewServAcReq from "./components/proceed/view-ac-req.component";
import ProceedAcReq from "./components/proceed/proceed-ac-req.component";
import ViewStudReq from "./components/issue/view-stud-req.component";
import IssueStudReq from "./components/issue/issue-stud-req.component";
import ViewServStudReq from "./components/proceed/view-stud-req.component";
import ProceedStudReq from "./components/proceed/proceed-stud-req.component";

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
                      <Route exact path={["/", "/home", "/dashboard"]} component={Dashboard} />
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
                      <Route path="/approve/item-requests" component={StudItemReq} />
                      <Route path="/approve/service-requests" component={StudServiceReq} />
                      <Route path="/approve-item-requests/:requestId" component={ReviewItemReq} />
                      <Route path="/approve-service-requests/:requestId" component={ReviewServiceReq} />
                      <Route exact path="/issue/item/ac" component={ViewAcReq} />
                      <Route path="/issue/item/ac/:requestId" component={IssueAcReq} />
                      <Route exact path="/proceed/service/ac" component={ViewServAcReq} />
                      <Route path="/proceed/service/ac/:requestId" component={ProceedAcReq} />
                      <Route exact path="/issue/item/" component={ViewStudReq} />
                      <Route path="/issue/item/:requestId" component={IssueStudReq} />
                      <Route exact path="/proceed/service/" component={ViewServStudReq} />
                      <Route path="/proceed/service/:requestId" component={ProceedStudReq} />
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

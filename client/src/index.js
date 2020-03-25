import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'bootswatch/dist/flatly/bootstrap.min.css';

import App from './components/App';
// import Login from './views/Login';

// ReactDOM.render(
//     <BrowserRouter>
//         <Switch>
//             <Route path="/" exact render={props => <App {...props} />} />
//             {/* <Route
//           path="/landing-page"
//           exact
//           render={props => <Landing {...props} />}
//         /> */}
//             <Route path="/auth/login" exact render={props => <Login {...props} />} />

//             <Redirect to="/" />
//         </Switch>
//     </BrowserRouter>,
//     document.getElementById("root")
// );

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

const store = createStore(() => reducers, {}, applyMiddleware());

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);
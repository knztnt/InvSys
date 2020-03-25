import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './DemoNavbar';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <Route path="/dashboard" component={Dashboard} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
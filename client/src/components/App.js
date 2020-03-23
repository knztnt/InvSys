import React from 'react';

import DemoNavbar from './DemoNavbar';
import Login from '../views/Login';

class App extends React.Component {
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }
    render() {
        return (
            <>
                <main ref="main">
                    <DemoNavbar />
                    <Login />

                </main>
            </>
        );
    }
}

export default App;
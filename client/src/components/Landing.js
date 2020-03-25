import React from 'react';

import Login from '../views/Login';

class Landing extends React.Component {
    // componentDidMount() {
    //     document.documentElement.scrollTop = 0;
    //     document.scrollingElement.scrollTop = 0;
    //     this.refs.main.scrollTop = 0;
    // }
    render() {
        return (
            <>
                <main ref="main">
                    <Login />
                </main>
            </>
        );
    }
}

export default Landing;
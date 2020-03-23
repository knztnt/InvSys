import React from 'react';

class Login extends React.Component {
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }
    render() {
        return (
            <>
                <main ref="main">
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-md-4 mx-auto">
                                <div className="card card-body">
                                    <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i> Login</h1>

                                    <form action="/auth/login" method="POST">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password" name="password" className="form-control"
                                                placeholder="Enter Password" />
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                                    </form>
                                    <p className="lead mt-4">
                                        No Account? <a className="text-info" href="/auth/register">Register</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

export default Login;
import React from 'react'
import "./scss/login.scss"

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };

        this.input = this.input.bind(this);
        this.login = this.login.bind(this);
    }

    input(event) {
        const target = event.target;
        this.setState({ [target.name]: target.value });
    }

    login(event) {
        event.preventDefault();

        this.loginSubmit().then(data => {
            localStorage.setItem('token', data.token);
            window.location.pathname = "/";
        }).catch(data => console.log(data));
    }

    async loginSubmit() {
        const response = await fetch("/api/auth/login", {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        });

        return response.json();
    }

    render() {
        return (
            <div id="landing-login-body">
                <form>
                    <div className="header">
                        <h1>Sign In With</h1>
                    </div>
                    {/* <div className="social">
                        <a href="/oauth/login/google-oauth2/" className="google">Login with Google</a>
                        <a href="/oauth/login/reddit/" className="reddit">Login with Reddit</a>
                        <a href="/oauth/login/twitter/" className="twitter">Login with Twitter</a>
                        <a href="/oauth/login/github/" className="github">Login with Github</a>
                    </div> */}
                    <div className="form-body">
                        <label>Username
                            <input onChange={this.input} type="text" name="username" value={this.state.username} />
                        </label>
                        <label>Password <span><u><em>forgot?</em></u></span>
                            <input onChange={this.input} type="password" name="password" value={this.state.password} />
                        </label>
                        <button onClick={this.login} id="login" name="login">Login</button>
                        <p>Not a Member?
                            <button id="sign_up" type="button"><u><em>Sign up now</em></u></button>
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}
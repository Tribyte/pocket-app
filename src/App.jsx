import React from 'react'
import Index from './components/index.js';
import Login from './components/login.js'

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: localStorage.getItem("token")
        }
    }

    componentDidMount() {
        if(window.location.pathname.substr(0, 7) === "/token=") {
            localStorage.setItem('token', window.location.pathname.substr(7, window.location.pathname.length - 1));
            window.location = "/";
            return;
        }

        if(window.location.pathname === "/logout") {
            localStorage.removeItem("token");

            this.setState({ user: localStorage.getItem("token") });
            window.location.pathname = "/api/logout";
            return;
        }

        // if(this.state.user === "undefined"){  }
    }

    render() {
        if (this.state.user !== "undefined" && this.state.user){
            return (<Index />)
        }
        return (<Login />)
    }
}
import React from 'react'
import "./scss/nav.scss"

import { ReactComponent as BackUp } from "./icons/back-up-ico.svg";

export default class Nav extends React.Component {
    render() {
        let pagedata;
        if(this.props.search){
            pagedata = (
                <form>
                    <input type="text" name="search" placeholder="Search..." />
                </form>
            )
        }
        else {
            pagedata = <h1>{this.props.title}</h1>
        }
        return (
            <div className="nav">
                {this.props.previous && <button className="back" onClick={this.props.previous}><BackUp /></button>}
                {pagedata}
            </div>
        )
    }
}
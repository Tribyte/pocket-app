import React from 'react'
import "./scss/bottomNav.scss"
import { ReactComponent as Menu } from "./icons/menu-ico.svg";

export default class BottomNav extends React.Component {
    render() {
        return (
            <div className={(this.props.navClosed ? "active " : "") + "bottom-nav"}>
                <div className="nav-flex">
                    {this.props.menu ?
                        <button className="menu">{this.props.menu}</button> :
                        <button className="menu" onClick={this.props.toggleNav}><Menu /></button>
                    }
                    {this.props.one && <button className="dropdown one">{this.props.one}</button>}
                    {this.props.two && <button className="dropdown two">{this.props.two}</button>}
                </div>
            </div>
        )
    }
}
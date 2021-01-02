import React from 'react'
import "./scss/card.scss"

export default class CardCard extends React.Component {
    constructor(props) {
        super(props);

        this.setPage = this.setPage.bind(this);
    }

    setPage() {
        this.props.setPage("card form", this.props.values.id);
    }
    //in the app, this only will need the img and title :P
    render() {
        return (
            <div onClick={this.setPage} className="cardCard">
                <div className="img"></div>
                <h1 className="title">{this.props.values.name}</h1>
            </div>
        )
    }
}
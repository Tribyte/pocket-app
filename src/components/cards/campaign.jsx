import React from 'react'
import "./scss/campaign.scss"

export default class CampaignCard extends React.Component {
    constructor(props){
        super(props);

        this.setPage = this.setPage.bind(this);
    }

    setPage(){
        this.props.setPage("campaign", this.props.values.id);
    }
    //in the app, this only will need the img and title :P
    render() {
        return (
            <div onClick={this.setPage} className="campaignCard">
                <h1 className="title">{this.props.values.title}</h1>
            </div>
        )
    }
}
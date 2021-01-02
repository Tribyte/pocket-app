import React from 'react'
import "./scss/deck.scss"
import Nav from "../nav"
import BottomNav from "../bottomNav"
import CampaignCard from '../cards/campaign'

import { ReactComponent as Plus } from "../icons/plus-ico.svg";
import { ReactComponent as Download } from "../icons/download-ico.svg";

export default class DeckPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            campaigns: [],
        }

        this.campaignForm = this.campaignForm.bind(this);
    }

    componentDidMount(){
        this.loadUserCampaigns();
    }

    campaignForm(){ this.props.setPage("campaign form", -1); }

    loadUserCampaigns(){
        this.getUserCampaigns().then(data => {
            let campaigns = []
            data.forEach(value => { campaigns.push({
                id: value.id,
                title: value.title
            }); });
            this.setState({campaigns: campaigns})
        }).catch(data => console.log(data))
    }

    async getUserCampaigns() {
        const response = await fetch("/api/campaigns/", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Token ' + localStorage.getItem("token")
            }
        });
        
        return response.json();
    }

    render() {
        return (
            <div>
                <Nav search={true} />

                <div className="deckPage">
                    {this.state.campaigns.map((value, i) => (
                        <CampaignCard key={i} setPage={this.props.setPage} values={value} />
                    ))}
                </div>

                <BottomNav
                    navClosed={this.props.navClosed}
                    toggleNav={this.props.toggleNav}
                    one={<Plus onClick={this.campaignForm} />}
                    two={<Download />} setPage={this.setPage}
                />
            </div>
        )
    }
}
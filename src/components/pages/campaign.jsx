import React from 'react'
import "./scss/deck.scss"
import Nav from "../nav"
import BottomNav from "../bottomNav"
import CardCard from '../cards/card'

import { ReactComponent as Filter } from "../icons/filter-ico.svg";
import { ReactComponent as Plus } from "../icons/plus-ico.svg";

export default class CampaignPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
        }

        this.cardForm = this.cardForm.bind(this);
    }

    cardForm(){ this.props.setPage("card form", -1); }

    componentDidMount(){
        this.loadCards();
    }
    
    loadCards(){
        this.getCards().then(data => {
            this.setState({cards: data.cards});
        }).catch(data => console.log(data))
    }

    async getCards() {
        const response = await fetch("/api/campaigns/" + this.props.id, {
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
                <Nav search={true} previous={this.props.previous} />

                <div className="campaignPage">
                    {this.state.cards.map((value, i) => (
                        <CardCard key={i} setPage={this.props.setPage} values={value} />
                    ))}
                </div>

                <BottomNav
                    navClosed={this.props.navClosed}
                    toggleNav={this.props.toggleNav}
                    one={<Filter />}
                    two={<Plus onClick={this.cardForm}/>}
                    setPage={this.setPage}
                />
            </div>
        )
    }
}
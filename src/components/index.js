import React, { Component } from 'react';
import DeckPage from "./pages/deck"
import CampaignPage from "./pages/campaign"
import CampaignForm from "./forms/campaign"
import CardForm from "./forms/card"
import "./scss/index.scss"

class Index extends Component {
    constructor(props){
        super(props);

        this.state = {
            pages: [],
            page: { type: "index", id: 0 }, //smthn like this?
            navClosed: true

        }

        this.setPage = this.setPage.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.previous = this.previous.bind(this);
    }

    setPage(type, id){
        this.setState({ navClosed: true });
        this.setState({page: {type: type, id: id}});
        this.setState({pages: [...this.state.pages, {type: type, id: id}]});
    }

    previous(){
        this.setState({ navClosed: true });
        let pages = this.state.pages;
        pages.pop();
        if(pages.length === 0){
            this.setState({page: { type: "index", id: 0 }});
            this.setState({pages: []});
        }
        else {
            this.setState({page: pages[pages.length - 1]});
            this.setState({pages: pages});
        }
    }

    toggleNav(){ this.setState({ navClosed: !this.state.navClosed }); }

    render() {
        let pagedata;

        if(this.state.page.type === "index"){
            pagedata = <DeckPage toggleNav={this.toggleNav} navClosed={this.state.navClosed} setPage={this.setPage} />
        }

        if(this.state.page.type === "campaign"){
            pagedata = <CampaignPage toggleNav={this.toggleNav} navClosed={this.state.navClosed} setPage={this.setPage} previous={this.previous} id={this.state.page.id} />
        }

        if(this.state.page.type === "campaign form"){ 
            if(this.state.page.id === -1){
                pagedata = <CampaignForm toggleNav={this.toggleNav} navClosed={this.state.navClosed} setPage={this.setPage} previous={this.previous} />
            }
        }

        if(this.state.page.type === "card form"){ 
            if(this.state.page.id === -1){
                pagedata = <CardForm id={this.state.pages[this.state.pages.length - 2].id} toggleNav={this.toggleNav} navClosed={this.state.navClosed} setPage={this.setPage} previous={this.previous} />
            }
            if(this.state.page.id >= 0){
                pagedata = <CardForm cardid={this.state.page.id} id={this.state.pages[this.state.pages.length - 2].id} toggleNav={this.toggleNav} navClosed={this.state.navClosed} setPage={this.setPage} previous={this.previous} />
            }
        }

        return (
            <div className="footer-fix">
                {pagedata}
            </div>
        )
    }
}

export default Index;

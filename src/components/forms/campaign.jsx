import React from 'react'
import Nav from "../nav"
import BottomNav from "../bottomNav"
import "./scss/campaign.scss"

import { ReactComponent as Save } from "../icons/save-ico.svg";

export default class CampaignForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
        }

        this.index = this.index.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.input = this.input.bind(this);
        this.submit = this.submit.bind(this);
    }

    index(){ this.props.setPage("index", 0); }

    handleKeyDown(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    input(event) {
        const target = event.target;
        this.setState({ [target.name]: target.value });
    }

    submit(event) {
        event.preventDefault();
        this.campaignSubmit().then(data => {
            this.setState({
                title: "",
                description: ""
            })
            this.props.previous();
        });
    }

    async campaignSubmit() {
        const response = await fetch("/api/campaigns/", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Token ' + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                private: "true",
            })
        });

        return response.json();
    }
    //in the app, this only will need the img and title :P
    render() {
        return (
            <div>
                <Nav search={false} previous={this.props.previous} title={"Create Campaign"} />

                <form className="campaign-form">
                    <div className="img"></div>
                    <input
                        onChange={this.input}
                        type="text" name="title"
                        placeholder="Title"
                        value={this.state.title}
                        autoComplete="off"
                    />
                    <label>Description:</label>
                    <textarea
                        onChange={this.input}
                        name="description"
                        value={this.state.description}
                        onKeyDown={this.handleKeyDown}
                    ></textarea>
                </form>

                <BottomNav
                    navClosed={this.props.navClosed}
                    toggleNav={this.props.toggleNav}
                    menu={<Save onClick={this.submit}/>}
                    setPage={this.setPage}
                />
            </div>
        )
    }
}
import React from 'react'
import Nav from "../nav"
import BottomNav from "../bottomNav"
import "./scss/card.scss"

import { ReactComponent as Save } from "../icons/save-ico.svg";

export default class CampaignForm extends React.Component {
    constructor(props) {
        super(props);

        this.mode = 'cors';
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': ' Token ' + localStorage.getItem("token")
        };

        this.state = {
            name: "",
            description: "",
            notes: [],
            tags: []
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.togglePrivate = this.togglePrivate.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
        this.noteChange = this.noteChange.bind(this);
        this.tagChange = this.tagChange.bind(this);
        this.input = this.input.bind(this);
        this.addNote = this.addNote.bind(this);
        this.addTag = this.addTag.bind(this);
        this.loadTags = this.loadTags.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        if(this.props.cardid){
            this.loadCards();
        }
        else {
            this.loadTags();
        }
    }

    handleKeyDown(event) {
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    togglePrivate(event){
        const target = event.target;
        const notes = this.state.notes;
        notes[target.name].private = !notes[target.name].private;
        this.setState({notes: notes});
    }

    toggleSelected(event){
        const target = event.target;
        const tags = this.state.tags;
        tags[target.name].selected = !tags[target.name].selected;
        this.setState({ tags: tags });
    }

    noteChange(event){
        const target = event.target;
        const notes = this.state.notes;
        notes[target.name].note = target.value;
        this.setState({ notes: notes });
    }

    tagChange(event) {
        const target = event.target;
        const tags = this.state.tags;
        tags[target.name].tag = target.value;
        this.setState({ tags: tags });
    }

    input(event) {
        const target = event.target;
        this.setState({ [target.name]: target.value });
    }

    addNote(event){
        event.preventDefault();
        this.setState({notes: [...this.state.notes, {id: -1, private: true, note: ""}]});
    }

    addTag(event){
        event.preventDefault();
        this.setState({tags: [...this.state.tags, {id: -1, selected: false, tag: ""}]});
    }

    loadCards() {
        this.getCards().then(data => {
            this.setState({name: data.name});
            this.setState({description: data.description});
            data.notes.map((value, i) => (
                this.getNote(value).then(data => {
                    this.setState({notes: [...this.state.notes, {id: data.id, private: data.private, note: data.note}]})
                })
            ));
            let cardTags = data.tags;
            this.getTags().then(data => {
                data.tags.forEach(item => {
                    let s = false;
                    cardTags.forEach(ctag => {if(item.id === ctag){s = true;}})
                    this.setState({tags: [...this.state.tags, {id: item.id, selected: s, tag: item.tag}]});
                })
            }).catch(data => console.log(data))
        }).catch(data => console.log(data))
    }

    async getNote(noteid) {
        const response = await fetch("/api/notes/" + noteid, { method: 'GET', mode: this.mode, headers: this.headers });
        return response.json();
    }

    async getCards() {
        const response = await fetch("/api/cards/" + this.props.cardid, { method: 'GET', mode: this.mode, headers: this.headers });
        return response.json();
    }

    loadTags() {
        this.getTags().then(data => {
            data.tags.forEach((item, i) => {
                this.setState({tags: [...this.state.tags, {id: item.id, selected: false, tag: item.tag}]});
            })
        }).catch(data => console.log(data))
    }

    async getTags() {
        const response = await fetch("/api/campaigns/" + this.props.id, { method: 'GET', mode: this.mode, headers: this.headers });
        return response.json();
    }

    submit(event) {
        event.preventDefault();
        if(this.props.cardid){
            this.cardEditSubmit(this.props.cardid).then(data => {
                this.state.tags.forEach(value => {
                    if(value.id === -1){
                        if(value.selected){ this.tagSubmit(value.tag, this.props.cardid).then(data => {}); }
                        else { this.tagCampaignSubmit(value.tag).then(data => {}); }
                    }
                    else { this.tagEditSubmit(value.tag, this.props.cardid, value.id, value.selected); }
                });
                this.state.notes.forEach(value => {
                    if(value.id === -1){ this.noteSubmit(value.note, value.private, this.props.cardid).then(data => { }); }
                    else { this.noteEditSubmit(value.note, value.private, value.id).then(data => { }); }
                });
                this.props.previous();
            });
        }
        else {
            this.cardSubmit().then(data => {
                let cardid = data.id;
                this.state.tags.forEach(value => {
                    if(value.id === -1){
                        if(value.selected){ this.tagSubmit(value.tag, cardid).then(data => {}); }
                        else { this.tagCampaignSubmit(value.tag).then(data => {}); }
                    }
                    else { this.tagEditSubmit(value.tag, cardid, value.id, value.selected); }
                });
                this.state.notes.forEach(value => {
                    if(value.id === -1){ this.noteSubmit(value.note, value.private, cardid).then(data => { }); }
                    else { this.noteEditSubmit(value.note, value.private, value.id).then(data => { }); }
                });
                this.props.previous();
            });
        }
    }

    async noteSubmit(notetxt, priv, cardid) {
        const response = await fetch("/api/notes/", {
            method: 'POST',
            mode: this.mode,
            headers: this.headers,
            body: JSON.stringify({
                campaign: this.props.id,
                card: cardid,
                note: notetxt,
                private: priv,
            })
        });

        return response.json();
    }

    async noteEditSubmit(notetxt, priv, noteid) {
        const response = await fetch("/api/notes/" + noteid + "/", {
            method: 'PUT',
            mode: this.mode,
            headers: this.headers,
            body: JSON.stringify({
                note: notetxt,
                private: priv,
            })
        });

        return response.json();
    }

    async tagSubmit(tag, cardid) {
        const response = await fetch("/api/tags/", {
            method: 'POST',
            mode: this.mode,
            headers: this.headers,
            body: JSON.stringify({
                campaign: this.props.id,
                card: cardid,
                tag: tag,
            })
        });

        return response.json();
    }

    async tagCampaignSubmit(tag) {
        const response = await fetch("/api/tags/", {
            method: 'POST',
            mode: this.mode,
            headers: this.headers,
            body: JSON.stringify({
                campaign: this.props.id,
                tag: tag,
            })
        });

        return response.json();
    }

    async tagEditSubmit(tag, cardid, tagid, selected) {
        const response = await fetch("/api/tags/" + tagid + "/", {
            method: 'PUT',
            mode: this.mode,
            headers: this.headers,
            body: JSON.stringify({
                card: cardid,
                remove: !selected,
                tag: tag,
            })
        });

        return response.json();
    }

    async cardSubmit() {
        const response = await fetch("/api/cards/", {
            method: 'POST',
            mode: this.mode,
            headers: this.headers,
            body: JSON.stringify({
                campaign: this.props.id,
                name: this.state.name,
                description: this.state.description,
            })
        });

        return response.json();
    }

    async cardEditSubmit(cardid) {
        const response = await fetch("/api/cards/" + cardid + "/", {
            method: 'PUT',
            mode: this.mode,
            headers: this.headers,
            body: JSON.stringify({
                campaign: this.props.id,
                name: this.state.name,
                description: this.state.description,
            })
        });

        return response.json();
    }

    render() {
        return (
            <div>
                <Nav search={false} previous={this.props.previous} title={"Create Card"} />

                <form className="card-form">
                    <div className="top">
                        <div className="img"></div>
                        <input placeholder="Name" onChange={this.input} value={this.state.name} type="text" name="name" autoComplete="off"/>
                        <label>Description:</label>
                        <textarea onKeyDown={this.handleKeyDown} onChange={this.input} name="description" value={this.state.description}></textarea>
                    </div>
                    <div className="notes">
                        <button className="add-note" onClick={this.addNote}>Note +</button>
                        {this.state.notes.map((value, i) =>
                            <div className="note" key={i}>
                                <label className="switch">
                                    <input type="checkbox" name={i} checked={value.private} onChange={this.togglePrivate}/>
                                    <span className="slider round"></span>
                                </label>
                                <p>{value.private ? "Private" : "Public"} </p>
                                <textarea name={i} onKeyDown={this.handleKeyDown} onChange={this.noteChange} value={value.note}></textarea>
                            </div>
                        )}
                    </div>
                    <div className="tags">
                        <button className="add-tag" onClick={this.addTag}>tag +</button>
                        {this.state.tags.map((value, i) =>
                            <div className="tag" key={i}>
                                <label className="checkbox bounce">
                                    <input type="checkbox" name={i} className={value.selected? "checked" : ""} onChange={this.toggleSelected}/>
                                    <svg viewBox="0 0 21 21">
                                        <polyline points="5 10.75 8.5 14.25 16 6">
                                        </polyline>
                                    </svg>
                                </label>
                                <input name={i} value={value.tag} onChange={this.tagChange}/>
                            </div>
                        )}
                    </div>
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
//<BackUp onClick={this.index} />
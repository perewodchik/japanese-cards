import React from 'react';
import Card from './Card';
import characters from "./characters.json";
import "./CardFabric.css"

export class CardFabric extends React.Component {
    constructor(props) {
        super(props);
        this.state = {focusedCardIndex: 0};
        this.cardRefs = [];
        this.cardComponents = [];
        this.initializeCards();
    }

    initializeCards() {
        for(var i in characters.cards) {
            this.cardRefs[i] = React.createRef();
            this.cardComponents[i] =  <Card notify={this.notify} key={i} ref={this.cardRefs[i]} charInfo={characters.cards[i]}/>;
        }
    }

    notify = (sender, event) => {
        if(event === "focus") {
            for(var i in this.cardRefs) {
                if(sender !== this.cardRefs[i].current) {
                    this.cardRefs[i].current.execute["blur"]();
                }
                else {
                    this.setState({
                        focusedCardIndex: i
                    })
                }
            }
            document.getElementById("blocker").style.visibility = "visible";
        }
    }

    handleClickBlocker = () => {
        for(var i in this.cardRefs) {
            this.cardRefs[i].current.execute["unblur"]();
        }
        document.getElementById("blocker").style.visibility = "hidden";
        this.cardRefs[this.state.focusedCardIndex].current.execute["unfocus"]();
    }

    render() {
        return (
            <div id="CardFabric">
                {this.cardComponents}
                <div onClick={this.handleClickBlocker} id="blocker"></div>
            </div>
        );
    }
    
}
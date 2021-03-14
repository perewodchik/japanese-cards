import React from 'react';
import './Card.css'

export default class BasicCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charInfo: this.props.charInfo,
            isFocused: false,
            style: {
                zIndex: 0,
                filter: "blur(0px)",
                boxShadow: "rgb(0,0,0,0.2) 4px 4px 8px 0px"
            }
        };
        this.ref = React.createRef()
    }

    //Creating shadow on hover
    handleMouseEnter = (e) => {
        this.execute["increaseShadow"]();
    }

    //Removing shadow on unhover
    handleMouseLeave = (e) => {
        this.execute["decreaseShadow"]();
    }

    //Focusing on card
    handleClick = (e) => {
        if(this.state.isFocused){
            //Do something cool
            return;
        }
        this.execute["focus"]();
        this.props.notify(this, "focus");
    }

    execute = {
        focus: () =>  {
            const rect = this.ref.current.getBoundingClientRect(); 
            const scaleFactor = 2;
            this.setState({
                style: {
                    ...this.state.style,
                    zIndex: 1000,
                    transform: `translate(
                        ${window.innerWidth / 2 - rect.x - rect.width / 2}px, 
                        ${window.innerHeight / 2 - rect.y - rect.height / 2}px) 
                        scale(${scaleFactor})`
                },
                isFocused: true
        });
        },
        unfocus: () => {
            this.setState({
                style: {
                    ...this.state.style,
                    transform: "scale(1)",
                    zIndex: 0
                },
                isFocused: false
            });
        },
        blur: () => {
            this.setState({
                style: {
                    ...this.state.style,
                    filter: "blur(8px)"
                }
            });
        },
        unblur: () => {
            this.setState({
                style: {
                    ...this.state.style,
                    filter: "blur(0px)"
                }
            });
        },
        increaseShadow: () => {
            this.setState({
                style: {
                    ...this.state.style,
                    boxShadow: "rgb(0,0,0,0.4) 8px 8px 16px 0px"
                    
                }
            })
        },
        decreaseShadow: () => {
            this.setState({
                style: {
                    ...this.state.style,
                    boxShadow: "rgb(0,0,0,0.2) 4px 4px 8px 0px",
                }
            })
        }
    }

    render() {
        return (
            <div ref={this.ref}
                key={this.state.charInfo.kanji}
                className="card"
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave}
                style={this.state.style}
            >
                <p className="card__kanji">{this.state.charInfo.kanji}</p>
                <p className="card__translation">{this.state.charInfo.translation}</p>
                <p className="card__kunReading">Kun: {this.state.charInfo.kunReadings.join(', ')}</p>
                <p className="card__onReading">On: {this.state.charInfo.onReadings.join(', ')}</p>
            </div>
        )
    }
}
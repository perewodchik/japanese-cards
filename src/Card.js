import React from 'react';
import './Card.css'

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charInfo: this.props.charInfo,
            isFocused: false,
            isFlipped: false,
            style: {
                zIndex: 0,
                filter: "blur(0px)",
            }
        };
        this.ref = React.createRef()
    }

    // Creating shadow on hover
    handleMouseEnter = (e) => {
        if(!this.state.isFocused)
            this.execute["increaseShadow"]();
    }

    //Removing shadow on unhover
    handleMouseLeave = (e) => {
        if(!this.state.isFocused)
            this.execute["decreaseShadow"]();
    }

    //Focusing on card
    handleClick = (e) => {
        if(this.state.isFocused){
            this.execute['flip']();
            return;
        }
        this.execute["focus"]();
        
        this.props.notify(this, "focus");
    }

    execute = {
        flip: () => {
            if(this.state.isFlipped === false){
                this.ref.current.getElementsByClassName("cardInner")[0].style.transform = "rotateY(-180deg)";
                this.setState({
                    isFlipped: true 
                })
            }
            else {
                this.ref.current.getElementsByClassName("cardInner")[0].style.transform = "rotateY(0deg)";
                this.setState({
                    isFlipped: false 
                })
            }
        },
        focus: () =>  {
            const rect = this.ref.current.getBoundingClientRect(); 
            const scaleFactor = 2;
            
            this.setState({
                isFocused: true,
                style: {
                    ...this.state.style,
                    zIndex: 1000,
                    transform: `translate(
                        ${window.innerWidth / 2 - rect.x - rect.width / 2}px, 
                        ${window.innerHeight / 2 - rect.y - rect.height / 2}px) 
                        scale(${scaleFactor})`,
                    boxShadow: "rgb(0,0,0,0) 0px 0px 0px 0px"
                }
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
            this.ref.current.getElementsByClassName("cardInner")[0].style.transform = "rotateY(0deg)";
        },
        blur: () => {
            this.setState({
                ...this.state,
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
        },
    }

    render() {
        return (
            <div
                ref={this.ref}
                key={this.state.charInfo.kanji}
                className="card"
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave}
                style={this.state.style}
            >
               <div className="cardInner">
                    <div className="cardFront">
                        <p className="card__kanji">{this.state.charInfo.kanji}</p>
                        <p className="card__translation">{this.state.charInfo.translation}</p>
                        <p className="card__kunReading">Kun: {this.state.charInfo.kunReadings.join(', ')}</p>
                        <p className="card__onReading">On: {this.state.charInfo.onReadings.join(', ')}</p>
                    </div>
                    <div className="cardBack">
                        <img className="card__strokeOrder" alt={this.state.charInfo.kanji} src={this.state.charInfo.strokeOrder} />
                    </div>
               </div>
            </div>
            
        )
    }
}
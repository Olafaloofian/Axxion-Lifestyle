import React, { Component } from 'react'
import axios from 'axios'
import './cheers.css'
import cheersDefault from './media/cheers_default.png'
import cheersHover from './media/cheers_hover.png'
import cheersLoading from './media/cheers_loading.png'
import Confetti from 'react-confetti'


export default class Cheers extends Component {
    constructor() {
        super()

        this.state = {
            cheers: '',
            cheering: false,
            hovering: false,
            confetti: false,
            runConfetti: false,
        }
    }


    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.props.id &&
        axios.get(`/api/cheers?id=${this.props.id}`).then(res => {
            this.setState({
                cheers: res.data[0].count
            })
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        const main = document.querySelectorAll('html')[0].getBoundingClientRect();
        return {
            height: main.height,
            width: main.width
        }
    }

    cheer = () => {
        setTimeout(() => {
            this.setState({
                confetti: false,
            })
        }, 1500)
        this.setState({
            cheering: true,
            runConfetti: true,
            confetti: true,
        })
        axios.post(`/api/cheers?id=${this.props.id}`).then(res => {
            this.setState({
                cheering: false,
                cheers: res.data[0].count
            })
        })

    }

    render() {
        // console.log('------------ this,updateWindowDimensions()', this.updateWindowDimensions())
        return(
            <div className='cheers-container'>
                <div className="cheer-text">Cheer for this article!</div>
                <div className="cheers-body">
                    <div className='cheers-number'>{this.state.cheers}</div>
                    {this.state.cheering ? 
                        <img id='cheer-icon' src={cheersLoading} alt=""/>
                        :
                        this.state.hovering ?
                            <img onMouseLeave={() => this.setState({ hovering: false })} onClick={() => this.cheer()} id='cheer-icon' src={cheersHover} alt=""/>
                            :
                            <img onMouseOver={() => this.setState({ hovering: true })} onClick={() => this.cheer()} id='cheer-icon' src={cheersDefault} alt=""/>
                    }
                </div>
                <div  id='confetti' style={{position: 'fixed', width: '100%'}}>
                    <Confetti 
                        confettiSource={{
                            x: 0,
                            y: 0,
                            w: this.updateWindowDimensions().width,
                            h: 0
                        }}
                        width={this.updateWindowDimensions().width}
                        numberOfPieces={400}
                        height={this.updateWindowDimensions().height}
                        recycle={this.state.confetti || false}
                        run={this.state.runConfetti}
                    />
                </div>
            </div>
        )
    }
}
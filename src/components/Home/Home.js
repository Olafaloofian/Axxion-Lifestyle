import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home.css'
import meditation from './media/meditation.jpg'
import rope from './media/rope.jpg'
import bands from './media/exercisebands.jpg'
import shake from './media/healthyshake.jpg'

export default class Home extends Component {
    constructor() {
        super()

        this.state = {
            active: false,
            autoplay: 0
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                autoplay: 5000
            })
        }, 1000)
        setTimeout(() => {
            this.setState({
                active: true
            })
        }, 4000)
    }

    render() {
        return(
            <div className='home-container'>
            {/* onTouchMove={() => this.setState({ active: true })} onScroll={() => this.setState({ active: true })} onClick={() => this.setState({ active: true })} */}
                <div className='axxion-header'>
                    <div className='axxion-container'><div className={this.state.active ? 'image' : 'noimage'}></div></div>
                    <div className='axxion-background'></div>
                </div>
                <div className='flavor-text-container'>
                    <div>
                        Live Next-Level!
                    </div>
                </div>
                <Link to='/articles'>
                    <div className='articles'>
                        <div className="carousel-container">
                            <Carousel 
                                showArrows={false}
                                showStatus={false}
                                showIndicators={false}
                                showThumbs={false}
                                infiniteLoop={true}
                                autoPlay={true}
                                swipeable={false}                     
                            >
                                <div className='carousel-image'>
                                    <img src='https://i1.wp.com/axxionlifestyle.com/wp-content/uploads/2018/02/joshua-earle-63441-unsplash.jpg?resize=696%2C464&ssl=1' alt=""/>
                                </div>
                                <div className='carousel-image'>
                                    <img src="https://axxionlifestyle.com/wp-content/uploads/2018/02/pexels-photo-708392.jpeg?w=1462" alt=""/>
                                </div>
                                <div className='carousel-image'>
                                    <img src="https://axxionlifestyle.com/wp-content/uploads/2018/02/pexels-photo-416528.jpeg?w=1462" alt=""/>
                                </div>
                                <div className='carousel-image'>
                                    <img src="https://axxionlifestyle.com/wp-content/uploads/2018/02/fitness-3168246_1280.jpg?w=1462" alt=""/>
                                </div>
                            </Carousel>
                            <div className="inner-box"><div>Articles</div></div>
                        </div>
                    </div>
                </Link>
                <div className="separator"></div>
                <Link to='/products'>
                    <div className='products'>
                        <div className="carousel-container">
                            <Carousel 
                                showArrows={false}
                                showStatus={false}
                                showIndicators={false}
                                showThumbs={false}
                                infiniteLoop={true}
                                autoPlay={true} 
                                interval={this.state.autoplay}
                                swipeable={false}                 
                            >
                                <div className='carousel-image'>
                                    <img src={bands} alt=""/>
                                </div>
                                <div className='carousel-image'>
                                    <img src={shake} alt=""/>
                                </div>
                                <div className='carousel-image'>
                                    <img src={meditation} alt=""/>
                                </div>
                                <div className='carousel-image'>
                                    <img src={rope} alt=""/>
                                </div>
                            </Carousel>
                            <div className="inner-box"><div>Products</div></div>
                        </div>
                    </div>
                </Link>
                <div className="separator"></div>
            </div>   
        )
    }
}
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './articles.css'

export default class ArticlesCategories extends Component {
    constructor() {
        super()

        this.state = {
            articles: []
        }
    }

    render() {
        return(
            <div className="category-container">
                <div className="category-master">
                    <Link to='/articles/fitness'>
                        <div className='fitness category'>
                            <div className="inner-box">Fitness</div>
                        </div>
                    </Link>
                    <div id="separator"></div>
                    <Link to='/articles/nutrition'>
                        <div className='nutrition category'>
                            <div className="inner-box">Nutrition</div>
                        </div>
                    </Link>
                    <div id="separator"></div>
                    <Link to='/articles/wellness'>
                        <div className='wellness category'>
                            <div className="inner-box">Wellness</div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}
import React from 'react'
import { Link } from 'react-router-dom'
import '../Home/home.css'

export default function ProductsCategory() {
    return (
        <div className='category-container'>
            <div className="category-master">
                <Link to='/products/exercise'><div className='exercise-products category'>
                    <div className="inner-box">Exercise</div>
                </div></Link>
                <div id="separator"></div>
                <Link to='/products/wellness'><div className='wellness-products category'>
                    <div className="inner-box">Wellness</div>
                </div></Link>
                <div id="separator"></div>
                <Link to='/products/diet'><div className='nutrition-products category'>
                    <div className="inner-box">Nutrition</div>
                </div></Link>
            </div>
        </div>   
    )
}
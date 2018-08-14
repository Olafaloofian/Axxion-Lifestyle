import React from 'react'
import './footer.css'
import facebook from './media/facebook.png'
import instagram from './media/instagram.png'
import youtube from './media/youtube.png'

export default function Footer() {
    let date = new Date()
    let year = date.getFullYear()

    return(
        <div className="footer-container">
            <div className="social-media">
                <a href='https://instagram.com/axxionlifestyle/?hl=en' target="_blank" rel="noopener noreferrer"><div className="icon"><img src={instagram} alt=""/></div></a>
                <a href='https://www.youtube.com/channel/UCnC7Fhdz8ZVN6IGi161qOfA' target="_blank" rel="noopener noreferrer"><div className="icon"><img src={youtube} alt=""/></div></a>
                <a href='https://facebook.com/axxionlifestyle/' target="_blank" rel="noopener noreferrer"><div className='icon'><img src={facebook} alt=""/></div></a>
            </div>
            <div className="copyright">
                © Axxion Health {year}
            </div>
        </div>
    )
}
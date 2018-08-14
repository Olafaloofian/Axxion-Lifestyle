import React, { Component } from 'react'
import axios from 'axios'
import video from './media/Video.png'

export default class Articles extends Component {
    constructor() {
        super()

        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        axios.get(`/api/articles/${this.props.match.params.category}`).then(res => {
            console.log('------------ Get articles res', res)
            this.setState({
                articles: res.data
            })
        })
    }
    
    redirect(url) {
        this.props.history.push(`/article/${url}`)
    }

    render() {
        console.log('------------ this.state', this.state)
        return(
            <div className='category-container'>
                <div className="background">
                    {this.state.articles.map(article => {
                        return(
                            <div key={article.id} onClick={() => this.redirect(article.urlTitle)} className='article'>
                                {article.picture ? 
                                    <div>{article.contentType === 'video' ? 
                                        <div className='vidoc'>
                                            <img className='article-image' src={article.picture} alt={article.title} width='400'/>
                                            <img id='video' src={video} width='100' alt=""/>
                                        </div> 
                                        : 
                                        <img src={article.picture} alt={article.title} width='400'/>}
                                    </div> 
                                    : 
                                    <div>Loading...</div>}
                                <div className='title'>{article.title}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
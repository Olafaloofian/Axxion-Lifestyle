import React, { Component } from 'react'
import axios from 'axios'
import './articles.css'
import Comments from '../Comments/Comments'
import Cheers from '../Cheers/Cheers';

export default class Article extends Component {
    constructor() {
        super()

        this.state = {
            article: [],
            id: '',
            comments: []
        }
    }

    componentDidMount() {
        axios.get(`/api/article/${this.props.match.params.urlTitle}`).then(res => {
            this.setState({
                article: res.data,
                id: res.data.id
            })
        })
    }

    render() {
        // console.log('------------ this.state.article.id', this.state.article.id)
        return(
            <div className='body-container'>
                <div className='article-title' dangerouslySetInnerHTML={{__html: this.state.article.title}}></div>
                <div className="article-body">
                    <div dangerouslySetInnerHTML={{__html: this.state.article.body}}></div>
                    {this.state.id ?
                    <div className="social-container">
                        <div className="cheers">
                            <Cheers id={this.state.id} />
                        </div>
                        <div className="comments">
                            <Comments id={this.state.id} />
                        </div>
                    </div>
                    :
                    <div>Loading comments...</div>
                    }
                    {/* <div className="social-container">
                        <div className="cheers">
                            <Cheers id={this.state.id} />
                        </div>
                        <div className="comments">
                            <Comments id={this.state.id} />
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class RecentActivity extends Component {
    constructor() {
        super()

        this.state = {
            profile: '',
            activity: '',
            articles: ''
        }
    }

    componentDidMount() {
        axios.get(`/api/user/comments?id=${this.props.userid}`).then(comments => {
            console.log('------------ get comments res', comments)
            axios.get(`/api/profile?id=${this.props.userid}`).then(profile => {
                axios.get('/api/article').then(article => {
                    console.log('------------ Limited article response', article)
                    this.setState({
                        articles: article.data,
                        profile: profile.data[0],
                        activity: comments.data.filter(comment => comments.data.indexOf(comment) <= 6)
                    })
                }).catch(error => console.log('------------ get limited articles error', error))
            }).catch(error => console.log('---------- get profile error', error))
        }).catch(error => console.log('------------ get user comments error', error))
    }

    render() {
        const { activity } = this.state
        console.log('------------ this.state', this.state)
        const { username } = this.state.profile
        return(
            <div>
                {activity ? 
                    activity.length ?
                        <div>Recent activity:
                            {activity.map(post => {
                                const urlTitle = this.state.articles.find(e => e.id === post.article_id).urlTitle
                                const title = this.state.articles.find(e => e.id === post.article_id).title
                                return (
                                    <div key={post.id}>
                                        {this.props.personal ? <span>You</span> : username} commented on <Link to={`/article/${urlTitle}`}>{title}</Link>: "{post.body}"
                                    </div>
                                )
                            }
                        )}</div> 
                        : <div>No recent activity.</div>
                : <div>Loading recent activity...</div>}
            </div>
        )
    }
}

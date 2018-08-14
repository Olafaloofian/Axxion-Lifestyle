import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './comments.css'

class Comments extends Component {
    constructor() {
        super()

        this.state = {
            comments: [],
            newComment: '',
            editing: false,
            editComment: '',
            editId: ''
        }
    }

    componentDidMount() {
        // console.log('------------ this.props', this.props)
        axios.get(`/api/comments?id=${this.props.id}`).then(res => {
            // console.log('------------ Get comments res', res)
            this.setState({
            comments: res.data
        })})
    }

    addComment = () => {
        if(this.state.newComment) {
            axios.post('/api/comment', { body: this.state.newComment, article_id: this.props.id, user_id: this.props.user.id }).then(res => {
                // console.log('------------ res.', res)
                const copiedComments = [...this.state.comments]
                copiedComments.push(res.data[0])
                this.setState({
                    comments: copiedComments,
                    newComment: ''
                })
            }).catch(error => console.log('------------ POST comment error', error))
        }
    }

    deleteComment = (id) => {
        axios.delete(`/api/comment?id=${id}`).then(res => {
            console.log('------------ Delete Comment res', res)
            const copiedComments = [...this.state.comments]
            copiedComments.splice(copiedComments.findIndex(e => e.id === id), 1)
            this.setState({
                comments: copiedComments,
                editing: false
            })
        })
    }

    clicky = (id, text) => {
        this.setState({
            editing: true,
            editComment: text,
            editId: id
        })
    }

    submitEdit = () => {
        axios.put('/api/comment', { body: this.state.editComment, id: this.state.editId}).then(res => {
            console.log('------------ submitEdit res', res)
            this.setState({
                editing: false,
                editComment: '',
                editId: ''
            })
            axios.get(`/api/comments?id=${this.props.id}`).then(res => {
                console.log('------------ Get comments res', res)
                this.setState({
                comments: res.data
            })})
        })
    }

    cancel = () => {
        this.setState({
            editing: false,
            editComment: '',
            editId: ''
        })
        axios.get(`/api/comments?id=${this.props.id}`).then(res => {
            console.log('------------ Get comments res', res)
            this.setState({
            comments: res.data
        })})
    }

    login() {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback?prevPath=${window.location.pathname}`)
    
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    }

    render() {
        // console.log('------------ this.props', this.props)
        // console.log('------------ this.state.comment', this.state.comments)
        return (
            <div className='comment-container'>{this.state.comments.length ? 
                <div className = 'comments-background'>
                    <div className="comments-background">
                    <hr/>
                        {this.state.comments.map(comment => {
                            return (
                                <div className='comments-background' key={comment.id}>
                                <div className='comment-master'>
                                    <Link to={comment.user_id === this.props.user.id ? `/profile` : `/profile/${comment.user_id}`}>
                                        <div className='media-container'>
                                            <div className="profile-image-container">
                                                <img className='profile-photo' src={comment.picture || this.props.user.picture} alt="" width='50'/> 
                                            </div>
                                            <span>{comment.username || this.props.user.username}</span>
                                        </div>
                                    </Link>
                                    
                                    {this.props.login 
                                    ?
                                    <div>
                                        <div>{
                                            this.state.editId === comment.id 
                                            ? 
                                            <div>
                                                <textarea value={this.state.editComment} onChange={(e) => this.setState({ editComment: e.target.value})} cols="30" rows="10"></textarea>
                                                <button onClick={() => this.submitEdit()}><span>Submit</span></button>
                                                <button onClick={() => this.cancel()}><span>Cancel</span></button>
                                            </div> 
                                            :
                                            <div className="comment-text">{comment.body} </div>
                                        }</div>
                                        <div>{
                                                comment.user_id === this.props.user.id 
                                                && 
                                                <div>{
                                                    !this.state.editing 
                                                    && 
                                                    <button onClick={() => this.clicky(comment.id, comment.body)}><span>Edit</span></button>
                                                    }
                                                    <button onClick={() => this.deleteComment(comment.id)}><span>Delete</span></button>
                                                </div>
                                        }</div>
                                    </div> 
                                    :
                                    <div className="comment-text">{comment.body}</div>    
                                    }
                                </div>
                            <hr/>
                            </div>
                            )
                        })
                    }
                </div>
                {this.props.login ?
                    <div>{!this.state.editing && 
                        <div>
                            <textarea value={this.state.newComment} cols="30" rows="10" onChange={(e) => this.setState({newComment: e.target.value})}></textarea>
                            <div><button onClick={() => this.addComment()}><span>Add Comment</span></button></div>
                        </div>}
                    </div>
                    :
                    <div>
                        <button onClick={() => this.login()}><span>Log In</span></button> to post a comment!
                    </div>
                }
            </div>
            : 
            this.props.login ? 
                <div>
                        <div>No comments yet! Be the first to add one!</div>
                        <textarea placeholder='Type here' name="" id="" cols="30" rows="10" onChange={(e) => this.setState({newComment: e.target.value})}></textarea>
                        <button onClick={() => this.addComment()}><span>Add Comment</span></button>
                </div>
            :
            <div>
                <div>No comments yet! Log in and be the first to add one!</div>
                <div>
                    <button onClick={() => this.login()}><span>Log In</span></button> 
                </div>
            </div>
            }
            </div>
            
        )
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
        login: store.login
    }
}

export default connect (mapStateToProps)(Comments)
import React, { Component } from 'react'
import axios from 'axios'
import RecentActivity from './RecentActivity'

export default class OtherProfile extends Component {
    constructor() {
        super()

        this.state = {
            profile: ''
        }
    }

    componentDidMount() {
        axios.get(`/api/profile?id=${this.props.match.params.id}`).then(res => {
            this.setState({
                profile: res.data[0]
            })
        }).catch(error => console.log('---------- error', error))
    }

    render() {
        console.log('------------ this.state', this.state)
        const { picture, username, bio } = this.state.profile
        if(this.state.profile) {
            return (
                <div className="master">
                    Profile
                    <div className="profile_container">
                        <div className="profile_overview">
                            <img src={picture} width="230" alt=""/>
                            <div>{username}</div>
                        </div>
                        <div className="personal">
                            <div>Bio: <br/> {bio}</div>
                        </div>
                    </div>
                    <RecentActivity userid={this.props.match.params.id} />
                </div>
            )
        } else {
            return(
                <div>
                    Loading profile...
                </div>
            )
        }
    }
}
import React, { Component } from 'react'
import axios from 'axios'
import './profile.css'
import { updateLogin, updateUser, clearUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import RecentActivity from './RecentActivity';

class Profile extends Component {
    constructor() {
        super()

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            picture: '',
            bio: '',
            address: '',
            auth0_id: '',
            id: '',
            new_first_name: '',
            new_last_name: '',
            new_email: '',
            new_username: '',
            new_picture: '',
            new_bio: '',
            new_address: ''
        }
    }

    componentDidMount = () => {
        axios.get('/api/session/user').then(res => {
            console.log('------------ Get User response', res);
            const {first_name, last_name, email, username, picture, bio, address, auth0_id, id} = res.data
            if(res.data.first_name) {
                this.setState({
                    first_name,
                    last_name,
                    email,
                    username,
                    picture,
                    bio,
                    address,
                    auth0_id,
                    id,
                    new_first_name: first_name,
                    new_last_name: last_name,
                    new_email: email,
                    new_username: username,
                    new_picture: picture,
                    new_bio: bio,
                    new_address: address,
                    editing: false,
                    loggedIn: true
                })
                this.props.updateUser(res.data)
                this.props.updateLogin(true)
            } else {
                setTimeout(() => {
                    this.login()
                }, 3000)
            };
        })
    }

    updateState = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    updateProfile = () => {
        const {new_first_name, new_last_name, new_email, new_username, new_picture, new_bio, new_address, auth0_id} = this.state
        const emailArray = new_email.split('')
        if(new_username.split('').includes(' ')) {
            alert('Username can not contain spaces.')
            return null
        }
        if(new_first_name.split('').includes(' ')) {
            alert('First name can not contain spaces.')
            return null
        }
        if(new_last_name.split('').includes(' ')) {
            alert('Last name can not contain spaces.')
            return null
        }
        if(emailArray.includes(' ') || !emailArray.filter(e => e === '@').length || !emailArray.filter(e => e === '.').length) {
            alert('Please enter a valid email address.')
            return null
        }
        if(new_username && new_email && new_bio && new_picture && new_first_name && new_last_name) {
            axios.post('/api/user', {new_first_name, new_last_name, new_email, new_username, new_picture, new_bio, new_address, auth0_id}).then(res => {
                const {first_name, last_name, email, username, picture, bio, address} = res.data[0]
                console.log('------------ UpdateProfile response', res)
                this.setState({
                    first_name,
                    last_name,
                    email,
                    username,
                    picture,
                    bio,
                    address,
                    editing: false
                })
                alert('Profile updated!')
                this.props.updateUser(res.data[0])
                this.props.updateLogin(true)
            })
        } else {
            alert('Completed profile required to continue. Please fill out all information below.')
        }
    }

    warningMessage = (id) => {
        const validate = window.confirm('WARNING! Deleting your profile can not be undone! Are you sure you want to continue?')
        if (validate) {
            axios.delete(`/api/user?id=${id}`)
            .then(res => {
                console.log('------------ Delete res', res)
                this.props.updateLogin(false)
                this.props.clearUser()
                sessionStorage.clear()
                this.props.history.push('/')
                axios.post('/api/session/end').then(res => console.log('------------ end session res', res))
            })
            .catch(error => console.log('---------- Delete profile error', error))
        }
    }

    login = () => {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback?prevPath=${this.props.location.pathname}`)
    
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    }

    logOut = () => {
        axios.post('/api/user/logout').then(res => {
            this.props.history.push('/')
            this.props.updateLogin(false)
            this.props.clearUser()
            sessionStorage.clear()
        })
    }

    render() {
        const {first_name, last_name, email, username, picture, bio, new_picture, new_first_name, new_last_name, new_email} = this.state
        console.log('------------ this.state', this.state)
        if(first_name) {
            if(!email || !bio || !username || !first_name || !last_name || !picture) {
                return(
                    <div className="master">
                        PLEASE FILL IN PROFILE INFORMATION BELOW<br/>
                        Profile
                        <div className="profile_container">
                            <div className="profile_overview">
                                <div><img src={new_picture} width="230" alt=""/></div>
                                <div><input type='text' placeholder='Profile picture URL' value={this.state.new_picture} onChange={(e) => this.updateState('new_picture', e.target.value)}/></div>
                                <div>First: <input type='text' value={this.state.new_first_name} placeholder={new_first_name} onChange={(e) => this.updateState('new_first_name', e.target.value)}/> Last: <input type='text' value={this.state.new_last_name} placeholder={new_last_name} onChange={(e) => this.updateState('new_last_name', e.target.value)}/></div>
                                <div>Username: <input type='text' value={this.state.new_username} placeholder={username} onChange={(e) => this.updateState('new_username', e.target.value)}/></div>
                                <div>Email:<input type='text' value={this.state.new_email} placeholder={new_email} onChange={(e) => this.updateState('new_email', e.target.value)} /></div>
                            </div>
                            <div className="personal">
                                {bio ? <div>Bio: <br/> {bio}</div> : <textarea placeholder='Type a short bio here!' onChange={(e) => this.updateState('new_bio', e.target.value)}></textarea>}
                            </div>
                        </div>
                        <button className='update-button' onClick={() => this.updateProfile()}>Update Profile</button>
                        <button onClick={() => this.logOut()}>Logout</button>
                    </div>
                )
            } else if (this.state.editing) {
                return(
                    <div className="master">
                            Edit Profile
                            <div className="profile_container">
                                <div className="profile_overview">
                                    <img src={new_picture} width="230" alt=""/> <div><input type='text' placeholder='Profile picture URL' onChange={(e) => this.updateState('new_picture', e.target.value)} value={this.state.new_picture}/></div>
                                    <div>First Name: <input type="text" placeholder={first_name} onChange={(e) => this.updateState('new_first_name', e.target.value)} value={this.state.new_first_name}/> Last Name: <input type="text" placeholder={last_name} onChange={(e) => this.updateState('new_last_name', e.target.value)}value={this.state.new_last_name}/></div>
                                    <div>Username: <input type='text' placeholder={username} onChange={(e) => this.updateState('new_username', e.target.value)} value={this.state.new_username}/></div>
                                    <div>Email: <input type='text' placeholder={email} onChange={(e) => this.updateState('new_email', e.target.value)} value={this.state.new_email}/></div>
                                </div>
                                <div className="personal">
                                    <div> Bio: <br/> <textarea placeholder={bio} onChange={(e) => this.updateState('new_bio', e.target.value)} value={this.state.new_bio}></textarea></div>
                                </div>
                            </div>
                            <button className='update-button' onClick={() => this.updateProfile()}>Save Changes</button>
                            <br/>
                            <button className='update-button' onClick={() => this.setState({editing: false})}>Cancel</button>
                            <br/>
                            <button className='update-button' onClick={() => this.warningMessage(this.state.id)}>Remove Profile</button>
                        </div>
                    )
            } else {
                return(
                    <div className="master">
                        Profile
                        <div className="profile_container">
                            <div className="profile_overview">
                                <img src={picture} width="230" alt=""/>
                                <div>{`${first_name} ${last_name}`}</div>
                                <div>{username}</div>
                                <div>{email}</div>
                            </div>
                            <div className="personal">
                                <div>Bio: <br/> {bio}</div>
                            </div>
                        </div>
                        <button onClick={() => this.logOut()}>Logout</button>
                        <br/>
                        <button onClick={() => this.setState({editing: true})}>Edit Profile</button>
                        <RecentActivity userid={this.state.id} personal={true}/>
                    </div>
                )
            }
        } else if (!this.props.login) {
            return(
                <div>
                    <div className="notlogged">No user logged in!<br/>Redirecting to login portal...</div> 
                </div>
            )
        } else {
            return(
                <div>
                    <div className="notlogged">Loading...</div> 
                </div>
            )
        }
    }
}

const mapStateToProps = (store) => {
    return {
        login: store.login
    }
}

export default connect(mapStateToProps, {updateLogin, updateUser, clearUser})(Profile)
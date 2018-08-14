import React, { Component } from 'react';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import routes from './routes'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: props.login,
      alerted: false,
      showPopup: false,
      userFirstName: '',
      userEmail: '',
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.login !== prevProps.login) {
  //     this.setState({ login: this.props.login });
  //   }
  // }

componentDidMount(){
  document.querySelectorAll('html')[0].getBoundingClientRect().width <= 900 && setTimeout(() => {
    this.setState({
      showPopup: true
    })
  }, 1000 * 60)
}
  
  alert = () => {
    if(!this.state.alerted)  {
      this.setState({
        showPopup: true,
        alerted: true
      })
    }
  }
  
  closePopup = () => {
    this.setState({
      showPopup: false
    })
  }
  
  sendEmail = () => {
    axios.post('/api/guest', { firstName: this.state.userFirstName, email: this.state.userEmail }).then(res => {
      console.log('------------ make guest res', res)
      axios.post('/api/email/prospect', { email: this.state.userEmail, name: this.state.userFirstName})
      this.setState({
        alerted: true,
        showPopup: false,
        userEmail: '',
        userFirstName: ''
      })
    }).catch(error => console.log('------------ make guest error', error))
  }
  
  render() {
    // console.log('------------ this.state.login', this.state.login)
    // console.log('------------ this.props.login', this.props.login)
    if(this.props.login) {
      return(
        <div className="App">
          <Header />
           <div className="padding"></div>
           { routes }
          <Footer />
        </div>
      )
    } else {
      return (
        <div className="App" onMouseLeave={() => this.alert()}>
          <div>{this.state.showPopup &&
            <div className='popup-container'>
              <div className="popup">
                <div className="close">
                  <div><button onClick={() => this.closePopup()}>X</button></div>
                </div>
                <div className='popup-text'>
                  <div>Sign up to recieve our free eBook: 5 Steps to Living a Next-Level Life!</div>
                  <input type="text" placeholder='First Name' onChange={(e) => this.setState({ userFirstName: e.target.value })}/>
                  <input type="text" placeholder='Email' onChange={(e) => this.setState({ userEmail: e.target.value })}/>
                  <div><button onClick={() => this.sendEmail()}>Sign up!</button></div>
                </div>
              </div>
            </div>}
          </div>
            <Header />
            <div className="padding"></div>
            { routes }
            <Footer />
          </div>
        );
    }
  }
}

const mapStateToProps = (store) => {
  return {
    login: store.login
  }
}

export default withRouter(connect(mapStateToProps)(App));

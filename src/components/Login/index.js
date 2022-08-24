import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', errorMessage: ''}

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  LoginButtonClicked = async event => {
    const {username, password} = this.state
    const userDetails = {username, password}
    event.preventDefault()
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      console.log(data)
      this.setState({errorMessage: `*${data.error_msg}`})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errorMessage} = this.state
    return (
      <div className="login-container">
        <div className="login">
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />

          <form onSubmit={this.LoginButtonClicked} className="login-form">
            <label className="label-text" htmlFor="loginUsername">
              USERNAME
            </label>
            <input
              value={username}
              onChange={this.onUsernameChange}
              className="login-input"
              id="loginUsername"
              type="text"
              placeholder="Username"
            />
            <label className="label-text" htmlFor="loginPassword">
              PASSWORD
            </label>
            <input
              value={password}
              onChange={this.onPasswordChange}
              className="login-input"
              id="loginPassword"
              type="password"
              placeholder="Password"
            />

            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          <p className="error-message">{errorMessage}</p>
        </div>
      </div>
    )
  }
}

export default Login

import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userInput: '',
    passwordInput: '',
    errorMsg: '',
    showSubmitError: false,
  }

  setCookies = jwtToken => {
    const {history} = this.props
    history.replace('/')

    Cookies.set('jwt_token', jwtToken, {expires: 1})
  }

  onChangeUser = event => {
    this.setState({userInput: event.target.value})
  }

  onChangePass = event => {
    this.setState({passwordInput: event.target.value})
  }

  login = async event => {
    event.preventDefault()
    const {userInput, passwordInput} = this.state

    const userDetails = {
      user_id: userInput,
      pin: passwordInput,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/ebank/login', options)

    const data = await response.json()

    if (response.ok) {
      this.setCookies(data.jwt_token)
    } else {
      this.setState({showSubmitError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {userInput, passwordInput, showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="col-1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
        </div>
        <div className="col-2">
          <h1>Welcome Back!</h1>
          <form className="login-form-container" onSubmit={this.login}>
            <label htmlFor="1">User ID</label>
            <input
              type="text"
              id="1"
              className="input-bar"
              placeholder="Enter User ID"
              value={userInput}
              onChange={this.onChangeUser}
            />
            <label htmlFor="2">PIN</label>
            <input
              type="password"
              id="2"
              className="input-bar"
              placeholder="Enter PIN"
              value={passwordInput}
              onChange={this.onChangePass}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login

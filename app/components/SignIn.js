import React from 'react';
import { connect } from 'react-redux'
import Helmet from 'react-helmet';

import { TextField, RaisedButton } from 'material-ui';
import { login } from '../redux/user';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: ''
    }
    this.updateEmail = this.updateEmail.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // Update the email based on user input
  updateEmail(email) {
    let newState = {};
    newState.email = email;
    if (this.state.error) newState.error = null;
    this.setState(newState);
  }

  handleLogin(evt) {
    evt.preventDefault();

    // Make sure there is code in the textarea
    if (!this.state.email) {
      this.setState({ error: 'Email is required for login' })
    } else {
      try {
        this.props.login(this.state.email, err => this.setState({ error: `Error: ${err}` }));
      } catch (e) {
        this.setState({ error: 'Issue with login. Please try again later.' })
      }
    }
  }

  render() {
    return (
      <div id="sign-in">
        <Helmet defaultTitle="Inspect.ion" />
        <div className="sign-in-wallpaper" />
        <div className="sign-in-content">
          <h1>INSPECT.ION</h1>
          <div className="login">
            <form onSubmit={ this.handleLogin }>
              <TextField
                type = 'email'
                value={ this.state.email }
                onChange={ evt => this.updateEmail(evt.target.value) }
                floatingLabelText="Email"
                floatingLabelStyle={{ color: 'white', fontWeight: '500' }}
                inputStyle={{ color: 'white' }}
                fullWidth={true}
              />
              { // Error displayed on unsuccessful login
                this.state.error ?
                  <p className="error-text">{ this.state.error }</p> : null
              }
              <RaisedButton
                label="Sign In"
                labelColor="white"
                type="submit"
                backgroundColor="blue"
                fullWidth={true}
                style={{ marginTop: '15px' }}
                disableFocusRipple={ true }
                disableTouchRipple={ true }
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapDispatchtoProps = dispatch => ({
  login: (email, displayErr) => {
    dispatch(login(email, displayErr))
  }
})

export default connect(null, mapDispatchtoProps)(SignIn);

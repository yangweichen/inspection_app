import React from 'react';
import { connect } from 'react-redux'
import Helmet from 'react-helmet';
import { login } from '../redux/user';

// components and style
import { TextField, RaisedButton } from 'material-ui';
import { palette } from './mui-theme'

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
            <div className="login-background"></div>
            <form onSubmit={ this.handleLogin }>
              <TextField
                type = 'email'
                value={ this.state.email }
                errorText={ this.state.error }
                onChange={ evt => this.updateEmail(evt.target.value) }
                floatingLabelText="Email"
                floatingLabelStyle={{ color: palette.alternateTextColor }}
                floatingLabelFocusStyle={{ color: palette.alternateFocusColor }}
                underlineStyle={{ borderBottomColor: palette.alternateTextColor }}
                underlineFocusStyle={{ borderBottomColor: palette.alternateFocusColor }}
                inputStyle={{ color: palette.alternateTextColor }}
                fullWidth={true}
              />
              <RaisedButton
                label="Sign In"
                type="submit"
                fullWidth={true}
                style={{ marginTop: '15px' }}
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

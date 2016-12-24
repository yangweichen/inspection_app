import React from 'react';
import Helmet from 'react-helmet';

import { TextField, RaisedButton } from 'material-ui';

export default () => (
  <div id="home">
    <Helmet defaultTitle="Inspect.ion" />
    <div className="home-wallpaper" />
    <div className="home-content">
      <h1>INSPECT.ION</h1>
      <div className="login">
        <form>
          <TextField
            floatingLabelText="Email"
            floatingLabelStyle={{ color: 'white', fontWeight: '500' }}
            type = 'email'
            fullWidth={true}
          />
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
);

import React from 'react';
import { connect } from 'react-redux';

// Material components and style
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import { palette } from './mui-theme'

// Profile picture icon when signed in
const profileAvatar = (imgURL, imgSize) =>
  <Avatar
    src={ imgURL }
    size={ imgSize }
    style={{
      border: `2px solid ${palette.alternateTextColor}`,
      boxSizing: 'border-box',
      marginTop: ((64 - imgSize) / 2) - 8,
      marginRight: 16 }}
  />

// Navbar that sits fixed at the top of every authed page
const Navbar = ({ userPicURL }) => (
  <AppBar
    title="INSPECT.ION"
    titleStyle={{ fontWeight: 300, letterSpacing: 2.5 }}
    showMenuIconButton={ false }
    iconElementRight={ userPicURL ? profileAvatar(userPicURL, 47) : null }
  />
);

const mapStateToProps = ({ user }) => ({
  userPicURL: user.profilePicURL
});

export default connect(mapStateToProps)(Navbar);

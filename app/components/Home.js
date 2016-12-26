import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { RaisedButton } from 'material-ui';

// All admin and basic user actions
const adminActions = [
  { href: '#all', label: 'View All Reports' }
];
const basicActions = [
  { href: '#truck', label: 'View Truck Reports' },
  { href: '#new', label: 'New Report' }
];
const getActions = isAdmin =>
  [ ...(isAdmin ? adminActions : []), ...basicActions ];

// Creates a button with the input label and link
const homeButton = (href, label) =>
  <div key={ href } className='action-button'>
    <Link to={ href }>
      <RaisedButton
        label={ label }
        labelColor="white"
        backgroundColor="blue"
        fullWidth={ true }
        disableFocusRipple={ true }
        disableTouchRipple={ true }
      />
    </Link>
  </div>

const Home = ({ isAdmin, company }) => (
  <div id="home">
    <Helmet title="Home" />
    <p><span>Company: </span>{ company.companyName }</p>
    <div className="actions">
    {
      // Create action buttons based on admin level
      getActions(isAdmin).map(action =>
        homeButton(action.href, action.label)
      )
    }
    </div>
  </div>
)

// -=-=-=-=-= CONTAINER =-=-=-=-=-=-

const mapStateToProps = ({ user }) => ({
  isAdmin: user.isAdmin,
  company: user.company
});

export default connect(mapStateToProps)(Home);

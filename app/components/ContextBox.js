import React from 'react';
import { connect } from 'react-redux';

// Info pane to help keep users aware of current context
const ContextBox = props => (
  <div id="context-box">
  {
    // Create a <p> tag for every context attribute
    Object.keys(props)
      .filter(attr => attr !== 'dispatch')
      .map(attr =>
        <p key={ attr } className="context-item">
          <span>{ `${attr}: ` }</span>{ props[attr] }
        </p>
      )
  }
  </div>
)

const mapStateToProps = ({ user }) => ({
  Name: `${user.firstName} ${user.lastName}`,
  Company: user.company.companyName
});

export default connect(mapStateToProps)(ContextBox);

import React from 'react';
import Helmet from 'react-helmet';

export default ({ children }) => (
  <div id="main">
    <Helmet
      defaultTitle="Inspect.ion"
      titleTemplate="%s | Inspect.ion"
    />
    <div id="content">
      { children }
    </div>
  </div>
);

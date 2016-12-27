import React from 'react';
import Helmet from 'react-helmet';
import Navbar from './Navbar';

export default ({ children }) => (
  <div id="main">
    <Helmet
      defaultTitle="Inspect.ion"
      titleTemplate="%s | Inspect.ion"
    />
    <Navbar />
    <div id="content-wrapper">
      <div id="content">
        { children }
      </div>
    </div>
  </div>
);

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Scanner from './Scanner'

// VIN barcode scanner
export default (props) => (
  <div id="vin-scan">
    <Helmet title="New Report" />
    <h1>Scan VIN</h1>
    <Scanner />
  </div>
)

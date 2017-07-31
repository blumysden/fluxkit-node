
import React from 'react';
// import Router from 'react-router/lib/Router';
// import browserHistory from 'react-router/lib/browserHistory';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import routes from '../routes';

// We need a Root component for React Hot Loading.
function Root() {
  return (
    <Router>
      { routes }
    </Router>
  );
}

export default Root;

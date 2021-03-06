import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props => (authed
      ? <Component {...props} />
      : <Redirect to="/login" />)
    }
  />
);

export default withRouter(PrivateRoute);

// props => (
//   authed
//     ? <Component {...props} />
//     : <Redirect to="/login" />
// );

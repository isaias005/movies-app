import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../hoc/Auth/context';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route {...rest} render={
      (props) => {
        if (auth.currentUser) {
          return (
            <div className="content overflow-y--auto">
              <Component {...props} />
            </div>
          )
        } else {
          return <Redirect to={
            {
              pathname: "/",
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default withAuth(ProtectedRoute);
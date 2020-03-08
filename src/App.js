import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Movies from './components/Movies/Movies';
import Favorites from './components/Favorites/Favorites';
import UserProfile from './components/UserProfile/UserProfile';
import NotMatch from './components/NotMatch'
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import { withAuth } from './hoc/Auth';

const App = ({ auth }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.getCurrentUser()
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        return err;
      })
  }, [auth])

  if(loading) return <LoadingSpinner />

  return (
    <BrowserRouter>
      <TopBar/>
      <div className="flex-row fill-height">
        <SideBar setLoading={setLoading}/>
        <Switch>
          <Route exact path="/">
            <div className="login-background flex-row">
              <Home />
            </div>
          </Route>
          <Route exact path="/signup">
            <div className="login-background flex-row">
              <Signup />
            </div>
          </Route>
          <ProtectedRoute exact path="/movies" component={Movies}/>
          <ProtectedRoute exact path="/favorites" component={Favorites}/>
          <ProtectedRoute exact path="/user-profile" component={() => <UserProfile setLoading={setLoading}/>} />
          <Route path="*" component={NotMatch} />
        </Switch>
      </div>
    </BrowserRouter >
  );
}

export default withAuth(App);

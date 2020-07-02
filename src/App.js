import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';


import { useDispatch } from 'react-redux';
import Login from './home/Login';
import Signup from './home/signup';

import Feed from './components/Feed';
import Profile from './components/Profile';
import Addfeed from './components/Addfeed';
import Navigation from './navigation/Navigation';

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [isLogin, setIsLogin] = useState(false);
  // const [userinfo, setUserinfo] = useState({});
  
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('myJWT');
    if (token) {
      setIsLogin(true);
      dispatch({ type: 'get_feeds_request', items: token });
    }
  }, [dispatch]);
  return (
    <div>

      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={() => (
              <Login />
            )}
          />
          <Route
            path="/signup"
            render={() => <Signup isLogin={isLogin} />}
          />
          <Route
            path="/feed"
            render={() => (
              <>
              <Navigation warn={isLogin} />
              <Feed />
            </>
            )}
          />
          <Route
            path="/profile"
            render={() => (
              <>
                <Navigation warn={isLogin} />
                <Profile />
              </>
            )}
          />
          <Route
            path="/addFeed"
            render={() => (
              <>
                <Navigation warn={isLogin} />
                <Addfeed />
              </>
            )}
          />
          <Route
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/feed" />;
              }
              return <Redirect to="/login" />;
            }}
          />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

import  { Meteor } from 'meteor/meteor';
import React  from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, withRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory'
import { Tracker } from 'meteor/tracker';
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';

import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';

const history = createHistory();

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/links']
let isUnauthenticatedPage = true;
let isAuthenticatedPage = false;

const ChangeTracker = withRouter(({match, location, history}) => {
    const pathName = location.pathname;
    isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    isAuthenticatedPage = authenticatedPages.includes(pathName);

    return false;
});

const routes = (
  <Router history={history}>
      <div>
        <Switch>
          <PublicRoute exact path="/" authed={false} redirectTo="/" component={Login} text="This route is for unauthed users"/>
          <PublicRoute exact path="/signup" authed={false} redirectTo="/signup" component={Signup} text="This route is for unauthed users"/>
          <PrivateRoute exact path="/links" authed={true} redirectTo="/links" component={Link} text="This is a private route"/>
          // <Route path="/signup" component={Signup}/>
          // <Route path="/links" component={Link}/>
          //not working
          <Route component={NotFound}/>
        </Switch>

        <ChangeTracker/>

      </div>
  </Router>
);

Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId();
    if (isAuthenticated){
      if (isUnauthenticatedPage){
        history.push('/links');
      }
    }else{
        history.push('/');
      }

       console.log('Authenticated?', isAuthenticated);
});


Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});

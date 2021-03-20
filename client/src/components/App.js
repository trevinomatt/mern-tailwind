import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import ForgotPasswordPage from './views/ForgotPasswordPage/ForgotPasswordPage';
import NavBar from './views/NavBar/NavBar';
import Auth from '../hoc/auth';

function App() {

  return (
    <Router>
      <div className="bg-gray-100">
        <NavBar />

        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/forgotpassword" component={Auth(ForgotPasswordPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

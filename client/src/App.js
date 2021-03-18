import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import { TailwindNavbar } from "tailwind-navbar-react";

function App() {
  const links = [
    {
      name: "Sign In",
      link: "/login"
    },
    {
      name: "Sign Up",
      link: "/register"
    }
  ];
  return (
    <Router>
      <div className="bg-gray-100">
        <TailwindNavbar
          brand={
            <img
              src="https://media.discordapp.net/attachments/694834406493257762/729067815499202651/matthew_border.png"
              width="40"
              height="40"
              alt="Brand logo"
            />
          }
          className="py-1"
        >
          <nav>
            <ul className="items-center justify-between pt-4 text-base lg:flex lg:pt-0">
              {links.map(link => {
                return (
                  <li key={link.name.toString()}>
                    <a
                      className="block px-0 py-3 border-b border-transparent lg:p-4 hover:border-white transition-all duration-200"
                      href={link.link}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </TailwindNavbar>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

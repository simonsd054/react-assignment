import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreatePost from "./components/create-post";
import EditPost from "./components/edit-post";
import PostsList from "./components/get-posts";

import logo from "./logo.svg";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a
            className="navbar-brand"
            href="https://simonsd054.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} width="30" height="30" alt="Google.com" />
          </a>
          <Link to="/" className="navbar-brand">
            React-Assignment
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Posts
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  Create Post
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Route path="/" exact component={PostsList} />
        <Route path="/edit/:id" component={EditPost} />
        <Route path="/create" component={CreatePost} />
      </div>
    </Router>
  );
}

export default App;

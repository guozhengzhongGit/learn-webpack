
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { routes } from '../config/router.config';

import List from 'pages/list';
import Home from 'pages/home';
import Detail from 'pages/detail';
import Tools from 'pages/tools';
class App extends PureComponent {

  render() {
    return (
      <Router>
        <div>
          <header>
            {
              routes.map(route => <nav key={route.key}><Link to={route.path}>{route.name}</Link></nav>)
            }
          </header>
          <div>
            <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/list">
              <List />
            </Route>
            <Route path="/detail">
              <Detail />
            </Route>
            <Route path="/tools">
              <Tools />
            </Route>
          </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render (
  <App />,
  document.getElementById('root')
)
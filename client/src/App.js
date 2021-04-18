import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/home/Home';

// user routes
import UserRoute from './components/routes/UserRoute';
import Poker from './pages/games/Poker';

// admin routes

function App() {
  return (
    <div className="App h-screen">
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <UserRoute exact path="/poker" component={Poker} />
        </Switch>
      </Fragment>
    </div>
  );
}

export default App;

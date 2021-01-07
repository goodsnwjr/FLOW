import React from 'react';

import { main } from 'pages';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { routes } from 'routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.path} component={main} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';

import { main, content } from 'pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from 'routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.main[0].path} component={main} exact />;
        <Route path={routes.content[0].path} component={content} exact />;
      </Switch>
    </BrowserRouter>
  );
}

export default App;

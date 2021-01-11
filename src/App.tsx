import React from 'react';
import 'antd/dist/antd.css';

import { MainPage, ContentPage } from 'pages';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { routes } from 'routes';

function App() {
  console.log(routes);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.main[0].path} component={MainPage} exact />;
        <Route path={routes.content[0].path} component={ContentPage} exact />;
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}
export default App;

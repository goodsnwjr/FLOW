import React from 'react';
import 'antd/dist/antd.css';
import { main, content } from 'pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from 'routes';

function App() {
  const project = {
    project: [
      {
        id: 1,
        title: '[SI] 현대캐피탈-신차영업팀',
        people: 21,
        favorites: false,
      },
      {
        id: 2,
        title: '[아이엠폼] 공지',
        people: 81,
        favorites: false,
      },
      {
        id: 3,
        title: '[IMS] 통합 관리',
        people: 25,
        favorites: false,
      },
      {
        id: 4,
        title: '[SI] FLOW.TEAM',
        people: 64,
        favorites: false,
      },
      {
        id: 5,
        title: '1:1 문의하기',
        people: 21,
        favorites: false,
      },
      {
        id: 6,
        title: '[시스템1팀] 정리중',
        people: 21,
        favorites: false,
      },
    ],
  };

  localStorage.setItem('project', JSON.stringify(project.project));
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

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favorite, remove, selectProjects } from 'store';

//components
import { MainBox } from 'components';
import { checkFavorit } from 'modules/project/favoriteProject';

const MainContainer = () => {
  const projectsList = useSelector(selectProjects);
  const dispatch = useDispatch();

  const removeProject = (e: any) => {
    const removeProjectList = [...projectsList].filter((item) => {
      return item.id !== Number(e.target.parentNode.getAttribute('data-id'));
    });

    dispatch(remove(removeProjectList));
  };
  return (
    <div>
      <h2 style={{ padding: '20px 0px 0 20px', margin: 0 }}>참여중</h2>
      <MainBox removeProject={removeProject} checkFavorit={(e) => checkFavorit(e, projectsList, dispatch, favorite)} />
    </div>
  );
};

export default MainContainer;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove, favorite, selectProjects } from 'modules/slices/projectsSlice';

//components
import MainBox from '../../components/mainBox';

const MainContainer = () => {
  const projectsList = useSelector(selectProjects);
  const dispatch = useDispatch();

  const checkFavorit = (e: any) => {
    const favoriteProjectList = [...projectsList].map((item) => {
      const itemId = Number(
        e.target.parentNode.parentNode.getAttribute('data-id')
      );
      if (item.id === itemId) {
        return Object.assign({}, item, {
          favorites: item.favorites === true ? false : true,
        });
      } else {
        return item;
      }
    });
    dispatch(favorite(favoriteProjectList));
  };

  const removeProject = (e: any) => {
    const removeProjectList = [...projectsList].filter((item) => {
      return item.id !== Number(e.target.parentNode.getAttribute('data-id'));
    });

    console.log(removeProjectList);
    dispatch(remove(removeProjectList));
  };
  return <MainBox removeProject={removeProject} checkFavorit={checkFavorit} />;
};

export default MainContainer;

import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { favorite, selectProjects } from 'store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { checkFavorit } from 'modules/project/favoriteProject';

//components
const FavoritesProjectStyle = styled(FontAwesomeIcon)`
  color: block;
  margin-right: 10px;
`;

export const ContentContainer = () => {
  const history = useHistory();

  const projectsList = useSelector(selectProjects);

  function findProject(projectsList: any) {
    return projectsList.id === Number(history.location.pathname.split('/')[1]);
  }

  const selectProject = projectsList.find(findProject);

  const dispatch = useDispatch();

  return (
    <h2 data-id={selectProject.id}>
      <FavoritesProjectStyle
        style={{
          color: selectProject.favorites === true ? 'yellow' : 'black',
        }}
        className="favorites-project"
        icon={faStar}
        onClick={(e) => checkFavorit(e, projectsList, dispatch, favorite)}
      ></FavoritesProjectStyle>
      {selectProject.title}({selectProject.people})
    </h2>
  );
};

export default ContentContainer;

import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectProjects } from 'modules/slices/projectsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import MainLayout from '../../layouts/mainLayout';

const FavoritesProjectStyle = styled(FontAwesomeIcon)`
  color: block;
  margin-right: 10px;
`;

const Content = () => {
  const history = useHistory();

  const productList = useSelector(selectProjects);

  function findProject(productList: any) {
    return productList.id === Number(history.location.pathname.split('/')[1]);
  }

  const selectProject = productList.find(findProject);

  console.log(selectProject);

  return (
    <MainLayout>
      <h2>
        <FavoritesProjectStyle
          style={{
            color: selectProject.favorites === true ? 'yellow' : 'black',
          }}
          className="favorites-project"
          icon={faStar}
          // onClick={(e) => checkFavorit(e)}
        ></FavoritesProjectStyle>
        {selectProject.title}({selectProject.people})
      </h2>
    </MainLayout>
  );
};

export default Content;

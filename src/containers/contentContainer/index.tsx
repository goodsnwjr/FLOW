import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectProjects } from 'store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

//components
import { Tabs } from 'antd';
import { ContentChart, ContentTicket, ContentAside } from 'components';

const { TabPane } = Tabs;

const ContentStyle = styled.div`
  display: flex;

  > div:nth-child(1) {
    width: 60%;
  }
  > div:nth-child(2) {
    width: 40%;
  }

  .project-title {
    background: #fff;
    pdding: 5px;
    text-align: center;
  }
`;
const FavoritesProjectStyle = styled(FontAwesomeIcon)`
  color: block;
  margin-right: 10px;
`;

const ContentBox = styled.div`
  width: 80%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
`;

function callback(key: any) {
  console.log(key);
}

const ContentContainer = () => {
  const history = useHistory();

  const productList = useSelector(selectProjects);

  function findProject(productList: any) {
    return productList.id === Number(history.location.pathname.split('/')[1]);
  }

  const selectProject = productList.find(findProject);

  console.log(selectProject);

  return (
    <ContentStyle>
      <div>
        <div className="project-title">
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
        </div>
        <ContentBox>
          <ContentChart />
        </ContentBox>
        <ContentBox>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </ContentBox>
        <ContentBox>
          <h4>상단고정글</h4>
          <ul>
            <li>
              [업무] B2B매거진 대리점현황 요류 <span>진행</span>
            </li>
          </ul>
        </ContentBox>
        <ContentBox>
          <ContentTicket />
        </ContentBox>
      </div>
      <ContentAside />
    </ContentStyle>
  );
};

export default ContentContainer;

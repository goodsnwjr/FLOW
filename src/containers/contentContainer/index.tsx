import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { update, favorite, selectProjects } from 'store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

//components
import { Tabs } from 'antd';
import { ContentChart, ContentTicket, ContentAside } from 'components';
import { checkFavorit } from 'modules/project/favoriteProject';

const { TabPane } = Tabs;

const ContentStyle = styled.div`
display: flex;
padding: 20px 20px;
box-sizing: border-box;

  > div:nth-child(1) {
    width: 60%;
  }
  > div:nth-child(2) {
    width: 40%;
  }

  .project-title {
    h2 {
      line-height: 1;
      margin: 0;
  }
`;
const FavoritesProjectStyle = styled(FontAwesomeIcon)`
  color: block;
  margin-right: 10px;
`;

const ContentBox = styled.div`
  width: 95%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #fff;
  margin-top: 5px;
`;

function callback(key: any) {
  //tab
  console.log(key);
}

const ContentContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [participantName, setParticipantName] = useState<string>('');

  const projectsList = useSelector(selectProjects);

  const dispatch = useDispatch();
  const history = useHistory();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const productList = useSelector(selectProjects);

  function findProject(productList: any) {
    return productList.id === Number(history.location.pathname.split('/')[1]);
  }

  const addParticipants = () => {
    dispatch(
      update({
        projectid: Number(history.location.pathname.split('/')[1]),
        name: participantName,
        auth: '게스트',
      })
    );
    setIsModalVisible(false);
  };

  const selectProject = productList.find(findProject);

  return (
    <ContentStyle>
      <div>
        <ContentBox className="project-title">
          <h2 data-id={selectProject.id}>
            <FavoritesProjectStyle
              style={{
                color: selectProject.favorites === true ? 'yellow' : 'black',
              }}
              className="favorites-project"
              icon={faStar}
              onClick={(e) => checkFavorit(e, projectsList, dispatch, favorite)}
            ></FavoritesProjectStyle>
            {selectProject.title}({selectProject.people.length})
          </h2>
        </ContentBox>
        <ContentBox>
          <ContentChart />
        </ContentBox>
        <ContentBox>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="글쓰기" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="할 일" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </ContentBox>
        <ContentBox>
          <h4>상단고정글</h4>
          <ul>
            <li>
              [업무] B2B매거진 대리점현황 오류 <span>진행</span>
            </li>
          </ul>
        </ContentBox>
        <ContentBox>
          <ContentTicket />
        </ContentBox>
      </div>
      <ContentAside
        selectProject={selectProject}
        addParticipants={addParticipants}
        handleCancel={handleCancel}
        showModal={showModal}
        isModalVisible={isModalVisible}
        setParticipantName={setParticipantName}
      />
    </ContentStyle>
  );
};

export default ContentContainer;

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { update, favorite, selectProjects, writeContent, topToggle } from 'store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbtack } from '@fortawesome/free-solid-svg-icons';

//components
import { ContentChart, ContentTicket, ContentAside } from 'components';
import { checkFavorit } from 'modules/project/favoriteProject';
import { ContentWrite } from 'components/contentWrite';
import { Divider } from 'antd';

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
  }
`;
const FavoritesProjectStyle = styled(FontAwesomeIcon)`
  color: block;
  margin-right: 10px;
`;

interface ContentBoxProps {
  bgColor?: string;
}

const ContentBox = styled.div<ContentBoxProps>`
  width: 95%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  background: ${(props) => (props.bgColor ? props.bgColor : '#fff')};
  margin-top: 5px;
`;

const Line = styled(Divider)`
  margin-top: 5px;
  margin-bottom: 0px;
`;

interface ticketProps {
  content: string;
  id: number;
  like: boolean;
  makeTop: boolean;
  managers: string[];
  status: string;
  statusKo: string;
  title: string;
  type: string;
}

const ContentContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [participantName, setParticipantName] = useState<string>('');
  const [makeTopLength, setMakeTopLength] = useState<number>(0);

  const projectsList = useSelector(selectProjects);
  const writeList = useSelector(writeContent);

  const dispatch = useDispatch();
  const history = useHistory();

  const invite = useRef<HTMLInputElement | null>(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const projectList = useSelector(selectProjects);

  function findProject(projectList: { id: number }) {
    return projectList.id === Number(history.location.pathname.split('/')[1]);
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
    if (invite.current !== null) {
      invite.current.value = '';
    }
  };

  const selectProject = projectList.find(findProject);

  function findWrite(writeList: { id: number }, itemId: number) {
    return writeList.id === itemId;
  }

  const checkPin = (item: { id: number }, calc: string) => {
    setMakeTopLength((prevState) => (calc === 'plus' ? prevState + 1 : prevState - 1));
    const selectWrite = writeList.find((write: { id: number }) => findWrite(write, item.id));
    dispatch(topToggle(selectWrite));
  };
  return (
    <ContentStyle>
      <div>
        <ContentBox className="project-title" bgColor={`${selectProject.mainColor}`}>
          <h2 data-id={selectProject.id}>
            <FavoritesProjectStyle
              style={{
                color: selectProject.favorites === true ? 'yellow' : 'black',
              }}
              className="favorites-project"
              icon={faStar}
              onClick={(e) => checkFavorit(e, projectsList, dispatch, favorite)}
            ></FavoritesProjectStyle>
            {selectProject.title}({selectProject.participants.length})
          </h2>
        </ContentBox>
        <ContentBox>
          <ContentChart />
        </ContentBox>
        <ContentBox>
          <ContentWrite participants={selectProject.participants} mainColor={selectProject.mainColor} />
        </ContentBox>

        {makeTopLength > 0 && (
          <ContentBox>
            <h4 style={{ display: 'inline' }}>상단고정글</h4>
            <h4 style={{ display: 'inline' }}>&nbsp;{makeTopLength}</h4>
            {writeList.map((item: ticketProps, idx: number) => {
              return (
                item.makeTop && (
                  <div key={`top-${idx}`}>
                    <br></br>
                    <span style={{ fontSize: 19, fontWeight: 'bold' }}>[{item.type}]</span>
                    &nbsp;
                    <span style={{ fontSize: 17 }}>{item.title}</span>
                    <FontAwesomeIcon
                      style={{ float: 'right', marginTop: 7 }}
                      icon={faThumbtack}
                      onClick={() => checkPin(item, 'minus')}
                      color={item.makeTop ? selectProject.mainColor : ''}
                    ></FontAwesomeIcon>
                    <span style={{ fontSize: 17, paddingRight: 15, float: 'right' }}>{item.statusKo}</span>
                    <Line />
                  </div>
                )
              );
            })}
          </ContentBox>
        )}
        {writeList.length > 1 ? (
          writeList.map((ticket: ticketProps, idx: number) => {
            console.log(ticket);
            return (
              <ContentTicket
                key={`ticket-${idx}`}
                checkPin={() => checkPin(ticket, 'plus')}
                ticket={ticket}
                mainColor={selectProject.mainColor}
              />
            );
          })
        ) : (
          <ContentBox style={{ textAlign: 'center', padding: '40px 0' }}>
            <div>등록된 게시글이 없습니다.</div>
          </ContentBox>
        )}
      </div>
      <ContentAside
        selectProject={selectProject}
        addParticipants={addParticipants}
        handleCancel={handleCancel}
        showModal={showModal}
        isModalVisible={isModalVisible}
        setParticipantName={setParticipantName}
        mainColor={selectProject.mainColor}
        invite={invite}
      />
    </ContentStyle>
  );
};

export default ContentContainer;

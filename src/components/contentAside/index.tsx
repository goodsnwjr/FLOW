import React from 'react';

//modules
import { Modal } from 'antd';
import { faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

interface ButtonStyleProps {
  bgColor?: string;
}
const ButtonStyle = styled.div<ButtonStyleProps>`
  background: ${(props) => (props.bgColor ? props.bgColor : '#fff')};
  padding: 20px 10px;
  box-sizing: border-box;
  text-align: center;
  font-style: bord;

  h3 {
    margin: 0;
  }
`;

const ParticipantsListStyle = styled.div`
  background: #fff;
  margin-top: 5px;
  padding: 20px 10px;
  box-sizing: border-box;
  text-align: left;
  font-style: bord;

  ul {
    list-style: none;
    padding: 30px 10px;
    margin-top: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

interface contentAsideProps {
  selectProject: object;
  showModal: () => void;
  handleCancel: () => void;
  addParticipants: () => void;
  isModalVisible: boolean;
  setParticipantName: React.Dispatch<React.SetStateAction<string>>;
}

export const ContentAside = ({
  selectProject,
  addParticipants,
  handleCancel,
  showModal,
  setParticipantName,
  isModalVisible,
}: contentAsideProps) => {
  return (
    <div>
      <ButtonStyle>
        <h3> &lt; 이전화면으로 </h3>
      </ButtonStyle>
      <ButtonStyle bgColor="red" onClick={showModal}>
        <h3>
          <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 10 }}></FontAwesomeIcon>참여자 초대하기{' '}
        </h3>
      </ButtonStyle>
      <Modal title="참여자 추가" visible={isModalVisible} onOk={addParticipants} onCancel={handleCancel}>
        <input
          onChange={(e) => {
            setParticipantName(e.target.value);
          }}
          className="participants"
          type="text"
          placeholder="참여자명"
        />
      </Modal>
      <ParticipantsListStyle>
        전체 참여자 {Object.values(selectProject)[2].length}명
        <ul>
          {selectProject &&
            Object.values(selectProject)[3].map((participants: { name: string }, idx: number) => {
              console.log(participants.name);
              return (
                <li key={`participant-${idx}`}>
                  <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: 10 }}></FontAwesomeIcon>
                  {participants.name}
                </li>
              );
            })}
        </ul>
      </ParticipantsListStyle>
    </div>
  );
};

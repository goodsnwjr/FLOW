/* eslint-disable array-callback-return */
import React, { MutableRefObject } from 'react';
import { Link } from 'react-router-dom';

//modules
import { Modal, Radio } from 'antd';
import { faUserCircle, faUserPlus, faCrown } from '@fortawesome/free-solid-svg-icons';
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
  font-weight: bold;

  ul {
    list-style: none;
    padding: 10px 10px;
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
  setParticipantAuth: any;
  mainColor: string;
  invite: MutableRefObject<HTMLInputElement | null>;
}

export const ContentAside = ({
  selectProject,
  addParticipants,
  handleCancel,
  showModal,
  setParticipantName,
  setParticipantAuth,
  isModalVisible,
  mainColor,
  invite,
}: contentAsideProps) => {
  return (
    <div>
      <Link to="/">
        <ButtonStyle>
          <h3> &lt; 이전화면으로 </h3>
        </ButtonStyle>
      </Link>
      <ButtonStyle style={{ marginTop: 5 }} bgColor={`${mainColor}`} onClick={showModal}>
        <h3>
          <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 10, cursor: 'pointer' }}></FontAwesomeIcon>참여자
          초대하기
        </h3>
      </ButtonStyle>
      <Modal title="참여자 추가" visible={isModalVisible} onOk={addParticipants} onCancel={handleCancel}>
        <input
          ref={invite}
          onChange={(e) => {
            setParticipantName(e.target.value);
          }}
          className="participants"
          type="text"
          placeholder="참여자명"
        />
        <Radio.Group
          name="auth"
          onChange={(e) => setParticipantAuth(e.target.value)}
          style={{ marginTop: 10, display: 'block' }}
        >
          <Radio value={'admin'}>관리자</Radio>
          <Radio value={'guest'}>게스트</Radio>
        </Radio.Group>
      </Modal>
      <ParticipantsListStyle style={{ height: '84%' }}>
        <h3>전체 참여자 {Object.values(selectProject)[2].length}명</h3>
        <ul>
          <li>
            <h3>관리자</h3>
          </li>
          {selectProject &&
            Object.values(selectProject)[2].map((participant: { name: string; auth: string }, idx: number) => {
              if (participant.auth === 'admin') {
                return (
                  <li key={`participant-admin-${idx}`}>
                    <FontAwesomeIcon icon={faCrown} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <span style={{ verticalAlign: 'text-bottom' }}>{participant.name}</span>
                  </li>
                );
              }
            })}
        </ul>
        <ul>
          <li>
            <h3>외부참여자</h3>
          </li>
          {selectProject &&
            Object.values(selectProject)[2].map((participant: { name: string; auth: string }, idx: number) => {
              if (participant.auth !== 'admin') {
                return (
                  <li key={`participant-guest-${idx}`} className="guest">
                    <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: 10 }}></FontAwesomeIcon>
                    <span style={{ verticalAlign: 'text-bottom' }}>{participant.name}</span>
                  </li>
                );
              }
            })}
        </ul>
      </ParticipantsListStyle>
    </div>
  );
};

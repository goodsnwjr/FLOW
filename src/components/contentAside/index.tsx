import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';
const Back = styled.div`
  background: #fff;
  padding: 20px 10px;
  box-sizing: border-box;
  text-align: center;
  font-style: bord;
`;

const ParticipantsListStyle = styled.div`
  background: #fff;
  padding: 20px 10px;
  box-sizing: border-box;
  text-align: center;
  font-style: bord;
`;

interface selectProjrctProps {
  selectProject: any;
  participants: number;
}

export const People = ({ participants }: selectProjrctProps) => {
  return;

  for (let i = 0; i < participants; i++) {
    <Col>sdfsdfdsfsd</Col>;
  }
};

export const ContentAside = ({ selectProject }: selectProjrctProps) => {
  console.log(Object.entries(selectProject));
  const participants = Object.entries(selectProject)[2][1];
  return (
    <div>
      <Back>
        <h3> &lt; 이전화면으로 </h3>
      </Back>
      <ParticipantsListStyle>
        참여자
        {/* {selectProject && 
          <People selectProject={participants}></People>
        } */}
      </ParticipantsListStyle>
    </div>
  );
};

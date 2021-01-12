import React from 'react';
import styled from 'styled-components';

const MakeTicket = styled.div`
  display: flex;
  div:nth-child(1) {
    width: 40px;
  }
`;

export const ContentTicket = () => {
  return (
    <>
      <MakeTicket>
        <div>이미지</div>
        <div>
          <div>관리자 1</div>
          <div>2021-01-08 10:27</div>
        </div>
      </MakeTicket>
    </>
  );
};

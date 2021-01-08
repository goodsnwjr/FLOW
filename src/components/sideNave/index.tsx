import React from 'react';

//modules
import {
  faBars,
  faInbox,
  faStar,
  faCheck,
  faArchive,
  faAt,
  faChalkboardTeacher,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEnvelope,
  faCalendar,
  faBookmark,
  faFolder,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Menu, Button } from 'antd';

const SideStyle = styled.div`
  width: 11rem;
  display: inline-block;
  border-right: 1px solid gray;
  padding: 10px 20px;
  box-sizing: border-box;
  background: #fff;
  ul {
    margin-top: 1.5rem;
    border: none;
  }
`;
const SideNave = () => {
  return (
    <SideStyle>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Button> + 새 프로젝트</Button>
      </div>
      <Menu>
        <Menu.Item>
          <FontAwesomeIcon icon={faBars} />
          전체
        </Menu.Item>
        <Menu.Item>
          <FontAwesomeIcon icon={faInbox} />
          미보관
        </Menu.Item>
        <Menu.Item>
          <FontAwesomeIcon icon={faEnvelope} />
          읽지않음
        </Menu.Item>
        <Menu.Item>
          <FontAwesomeIcon icon={faStar} />
          즐겨찾기
        </Menu.Item>
      </Menu>
      <Menu>
        <h3>모아보기</h3>
        <Menu.Item>
          <FontAwesomeIcon icon={faCheck} />
          전체 업무
        </Menu.Item>
        <Menu.Item>
          <FontAwesomeIcon icon={faCalendar} />
          전체 일정
        </Menu.Item>
        <Menu.Item>
          <FontAwesomeIcon icon={faArchive} />
          전체 파일
        </Menu.Item>
        <Menu.Item>
          <FontAwesomeIcon icon={faBookmark} />
          담아둔 글
        </Menu.Item>
        <Menu.Item>
          <FontAwesomeIcon icon={faAt} />
          나를 지정
        </Menu.Item>
        <Menu.Item>
          <FontAwesomeIcon icon={faChalkboardTeacher} />내 게시물
        </Menu.Item>
      </Menu>
      <Menu>
        <h3>보관함</h3>
        <Menu.Item>
          <FontAwesomeIcon icon={faFolder} /> 마케팅
        </Menu.Item>
        <Menu.Item>
          <FontAwesomeIcon icon={faFolder} />
          디자인
        </Menu.Item>
        <Menu.Item>
          <FontAwesomeIcon icon={faFolder} />
          엔지니어링
        </Menu.Item>
        <Menu.Item>
          <FontAwesomeIcon icon={faEyeSlash} />
          숨김
        </Menu.Item>
      </Menu>
    </SideStyle>
  );
};

export default SideNave;

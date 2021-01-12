import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { faEnvelope, faCalendar, faBookmark, faFolder } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Menu, Button, Modal } from 'antd';
import { add, menuChange, selectProjects } from 'store';

const SideStyle = styled.div`
  width: 20%;
  min-width: 11rem;
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

export const SideNav = () => {
  const [newProject, setNewProject] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const projectsList = useSelector(selectProjects);

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const newProjrct = () => {
    setIsModalVisible(false);
    const numRandom = Math.random();
    // const projectList = JSON.parse(localStorage.project);
    const newProjectList = [...projectsList];

    newProjectList.push({
      id: Math.floor(numRandom * 1000),
      title: newProject,
      participants: [],
      favorites: false,
    });

    dispatch(add(newProjectList));
    // localStorage.setItem('project', JSON.stringify(projectList));
  };

  const onChangeMenuAll = () => {
    dispatch(menuChange('all'));
  };

  const onChangeMenuFav = () => {
    dispatch(menuChange('fav'));
  };

  return (
    <SideStyle>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Button onClick={showModal}> + 새 프로젝트</Button>
        <Modal title="새 프로젝트 추가" visible={isModalVisible} onOk={newProjrct} onCancel={handleCancel}>
          <input
            onChange={(e) => {
              setNewProject(e.target.value);
            }}
            className="project"
            type="text"
            placeholder="프로젝트명"
          />
        </Modal>
      </div>
      <Menu>
        <Menu.Item onClick={onChangeMenuAll}>
          <Link to="/">
            <FontAwesomeIcon icon={faBars} />
          </Link>
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
        <Menu.Item onClick={onChangeMenuFav}>
          <Link to="/">
            <FontAwesomeIcon icon={faStar} />
            즐겨찾기
          </Link>
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

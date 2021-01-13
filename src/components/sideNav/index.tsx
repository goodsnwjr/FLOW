import React, { useState, useRef } from 'react';
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
import { add, menuChange, selectProjects, defaultColor } from 'store';

const IconStyle = styled(FontAwesomeIcon)`
  margin-right: 15px;
`;

const SideStyle = styled.div`
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
  const newProjectName = useRef<HTMLInputElement>(null);
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
      mainColor: defaultColor[Math.floor(Math.random() * 10 + 1)],
    });

    dispatch(add(newProjectList));
    console.log(newProjectName.current);
    if (newProjectName.current !== null) {
      newProjectName.current.value = '';
    }
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
            ref={newProjectName}
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
            <IconStyle icon={faBars} />
          </Link>
          전체
        </Menu.Item>
        <Menu.Item>
          <IconStyle icon={faInbox} />
          미보관
        </Menu.Item>
        <Menu.Item>
          <IconStyle icon={faEnvelope} />
          읽지않음
        </Menu.Item>
        <Menu.Item onClick={onChangeMenuFav}>
          <Link to="/">
            <IconStyle icon={faStar} />
            즐겨찾기
          </Link>
        </Menu.Item>
      </Menu>
      <Menu>
        <h3>모아보기</h3>
        <Menu.Item>
          <IconStyle icon={faCheck} />
          전체 업무
        </Menu.Item>
        <Menu.Item>
          <IconStyle icon={faCalendar} />
          전체 일정
        </Menu.Item>
        <Menu.Item>
          <IconStyle icon={faArchive} />
          전체 파일
        </Menu.Item>
        <Menu.Item>
          <IconStyle icon={faBookmark} />
          담아둔 글
        </Menu.Item>
        <Menu.Item>
          <IconStyle icon={faAt} />
          나를 지정
        </Menu.Item>
        <Menu.Item>
          <IconStyle icon={faChalkboardTeacher} />내 게시물
        </Menu.Item>
      </Menu>
      <Menu>
        <h3>보관함</h3>
        <Menu.Item>
          <IconStyle icon={faFolder} /> 마케팅
        </Menu.Item>
        <Menu.Item>
          <IconStyle icon={faFolder} />
          디자인
        </Menu.Item>
        <Menu.Item>
          <IconStyle icon={faFolder} />
          엔지니어링
        </Menu.Item>
        <Menu.Item>
          <IconStyle icon={faEyeSlash} />
          숨김
        </Menu.Item>
      </Menu>
    </SideStyle>
  );
};

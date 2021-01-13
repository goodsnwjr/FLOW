import React, { SetStateAction, useRef, useState } from 'react';
import styled from 'styled-components';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { selectMenu, selectProjects, projectInitState } from 'store';
import { Link } from 'react-router-dom';

import { Modal } from 'antd';

// interface favoritesProps {
//   favorites: boolean;
//   setFavorites: Dispatch<SetStateAction<boolean>>;
// }

interface removeProjectProps {
  removeProject: (e: any) => void;
  checkFavorit: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}
// interface projectItem {
//   id: number;
//   title: string;
//   participants: number;
// }

const ItemStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 20px;
  box-sizing: border-box;
`;
const ItemBoxStyle = styled.div`
  margin-right: 15px;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  background: ${(props) => props.color};
  font-size: 16px;
`;

const FavoritesProjectStyle = styled(FontAwesomeIcon)`
  color: block;
  margin-right: 10px;
`;

export const MainBox = ({ removeProject, checkFavorit }: removeProjectProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [thisProject, setThisProject] = useState<SetStateAction<boolean>>(false);

  const itemBoxWrapper = useRef<HTMLDivElement>(null);
  const removeRef = useRef<HTMLInputElement>(null);

  const projectList = useSelector(selectProjects);
  const menu = useSelector(selectMenu);

  const showModal = (e: any) => {
    setIsModalVisible(true);
    setThisProject(e);
  };

  const removeCancel = () => {
    removeProject(thisProject);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <ItemStyle>
      {menu === 'all' ? (
        <>
          {projectList &&
            projectList.map((items: projectInitState) => {
              return (
                <ItemBoxStyle key={items.id} color={items.mainColor} ref={itemBoxWrapper} data-id={items.id}>
                  <p style={{ textAlign: 'right', lineHeight: '16px' }} onClick={(e) => showModal(e)} ref={removeRef}>
                    X
                  </p>
                  <Modal
                    title="프로젝트를 삭제 하시겠습니까?"
                    visible={isModalVisible}
                    onOk={removeCancel}
                    onCancel={handleCancel}
                  ></Modal>
                  <Link to={`${items.id}`}>
                    <h3>{items.title}</h3>
                  </Link>
                  <p>{items.participants.length}명 참여중</p>
                  <FavoritesProjectStyle
                    style={{
                      color: items.favorites === true ? 'yellow' : 'black',
                    }}
                    className="favorites-project"
                    icon={faStar}
                    onClick={(e) => checkFavorit(e)}
                  ></FavoritesProjectStyle>
                </ItemBoxStyle>
              );
            })}
        </>
      ) : (
        projectList
          .filter((item: projectInitState) => {
            return item.favorites;
          })
          .map((items: projectInitState) => {
            return (
              <ItemBoxStyle key={items.id} color={items.mainColor} ref={itemBoxWrapper} data-id={items.id}>
                <p
                  style={{ textAlign: 'right', lineHeight: '16px' }}
                  onClick={(e: object) => showModal(e)}
                  ref={removeRef}
                >
                  X
                </p>
                <Modal
                  title="프로젝트를 삭제 하시겠습니까?"
                  visible={isModalVisible}
                  onOk={removeCancel}
                  onCancel={handleCancel}
                ></Modal>
                <Link to={`${items.id}`}>
                  <h3>{items.title}</h3>
                </Link>
                <p>{items.participants.length}명 참여중</p>
                <FavoritesProjectStyle
                  style={{
                    color: items.favorites === true ? 'yellow' : 'black',
                  }}
                  className="favorites-project"
                  icon={faStar}
                  onClick={(e) => checkFavorit(e)}
                ></FavoritesProjectStyle>
              </ItemBoxStyle>
            );
          })
      )}
    </ItemStyle>
  );
};

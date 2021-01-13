import React from 'react';

//components
import { SideNav } from 'components';

//modules
import { faBell, faUserCircle, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Layout } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProjects } from 'store';
const { Header, Content } = Layout;

interface Props {
  children: JSX.Element;
}

const HeaderStyle = styled(Header)`
  div,
  ul {
    display: inline-block;
  }

  ul {
    display: flex;
    color: #fff;
    float: right;
    list-style: none;
    height: 64px;
    margin: 0;
  }

  li {
    margin: 0 10px;
  }
`;
interface inputProps {
  selectProject: boolean;
}
const InputStyle = styled.input<inputProps>`
  width: 50%;
  margin-left: 30px;
  height: 60px;
  padding-left: ${(props) => (!props.selectProject ? '20px' : '130px')};
`;

const MainLayout = ({ children }: Props) => {
  const history = useHistory();

  const projectList = useSelector(selectProjects);

  function findProject(projectList: { id: number }) {
    return projectList.id === Number(history.location.pathname.split('/')[1]);
  }

  const selectProject = projectList.find(findProject);
  console.log(projectList);
  console.log(selectProject);
  return (
    <>
      <HeaderStyle>
        <Link to="/">FLOW</Link>
        {selectProject && (
          <h3
            style={{
              position: 'absolute',
              width: 100,
              height: 45,
              top: 0,
              marginLeft: 80,
              marginTop: 9,
              padding: '0 10px',
              lineHeight: '41px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(0,0,0,.05)',
              borderRadius: 5,
              backgroundColor: `${selectProject.mainColor}`,
            }}
          >
            {selectProject.title}
          </h3>
        )}
        <InputStyle
          type="test"
          name="search_video"
          id="search_video"
          placeholder={selectProject ? '프로젝트 내부에서 검색' : '전체에서 검색'}
          selectProject={selectProject}
        />
        <ul>
          <li>
            <p>서비스 업그레이드</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faComment} />
          </li>
          <li>
            <FontAwesomeIcon icon={faBell} />
          </li>
          <li>
            <FontAwesomeIcon icon={faUserCircle} />
          </li>
        </ul>
      </HeaderStyle>
      <Layout style={{ display: 'block' }}>
        <Content style={{ display: 'grid', gridTemplateColumns: '13% 87%', width: '100%' }}>
          <SideNav />
          {children}
        </Content>
      </Layout>
    </>
  );
};

export default MainLayout;

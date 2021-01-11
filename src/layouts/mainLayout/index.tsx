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
  input {
    width: 50%;
    margin-left: 30px;
    height: 60px;
    padding-left: 110px;
  }
  ul {
    display: flex;
    color: #fff;
    float: right;
    list-style: none;
  }

  li {
    margin: 0 10px;
  }
`;

const MainLayout = ({ children }: Props) => {
  const history = useHistory();

  const productList = useSelector(selectProjects);

  function findProject(productList: any) {
    return productList.id === Number(history.location.pathname.split('/')[1]);
  }

  const selectProject = productList.find(findProject);
  console.log(productList);
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
              lineHeight: '41px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              border: '1px solid black',
              borderRadius: 5,
              backgroundColor: 'skyblue',
            }}
          >
            {selectProject.title}
          </h3>
        )}
        <input type="test" name="search_video" id="search_video" placeholder="검색" />
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
        <Content style={{ display: 'grid', gridTemplateColumns: '20% 80%', width: '100%' }}>
          <SideNav />
          {children}
        </Content>
      </Layout>
    </>
  );
};

export default MainLayout;

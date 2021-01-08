import React from 'react';

//assets

//components
import SideNav from '../../components/sideNave';

//modules
import {
  faBell,
  faUserCircle,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
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

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderStyle>
        <a href="./main" target="_self">
          FLOW
        </a>
        <input
          type="test"
          name="search_video"
          id="search_video"
          placeholder="검색"
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
      <Layout>
        <SideNav />
        <Content>{children}</Content>
      </Layout>
    </>
  );
};

// export default MainLayout;

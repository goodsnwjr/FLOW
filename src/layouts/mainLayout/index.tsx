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

interface Props {
  children: JSX.Element;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <header>
        <div>
          <a href="./main" target="_self">
            FLOW
          </a>
        </div>
        <div>
          <input
            type="test"
            name="search_video"
            id="search_video"
            placeholder="검색"
          />
        </div>
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
      </header>
      <section>
        <SideNav />
        <div>{children}</div>
      </section>
    </>
  );
};

export default MainLayout;

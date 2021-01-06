import React from 'react';

//assets
import styles from './main.module.css';

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

const SideNave = () => {
  return (
    <div>
      <div className={styles.side_newProject}>
        <button> + 새 프로젝트</button>
      </div>
      <div className={styles.side_noraml}>
        <button>
          <FontAwesomeIcon icon={faBars} />
          전체
        </button>
        <button>
          <FontAwesomeIcon icon={faInbox} />
          미보관
        </button>
        <button>
          <FontAwesomeIcon icon={faEnvelope} />
          읽지않음
        </button>
        <button>
          <FontAwesomeIcon icon={faStar} />
          즐겨찾기
        </button>
      </div>
      <div className={styles.side_viewCollected}>
        <h3>모아보기</h3>
        <button>
          <FontAwesomeIcon icon={faCheck} />
          전체 업무
        </button>
        <button>
          <FontAwesomeIcon icon={faCalendar} />
          전체 일정
        </button>
        <button>
          <FontAwesomeIcon icon={faArchive} />
          전체 파일
        </button>
        <button>
          <FontAwesomeIcon icon={faBookmark} />
          담아둔 글
        </button>
        <button>
          <FontAwesomeIcon icon={faAt} />
          나를 지정
        </button>
        <button>
          <FontAwesomeIcon icon={faChalkboardTeacher} />내 게시물
        </button>
      </div>
      <div className={styles.side_storageBox}>
        <h3>보관함</h3>
        <button>
          <FontAwesomeIcon icon={faFolder} /> 마케팅
        </button>
        <button>
          <FontAwesomeIcon icon={faFolder} />
          디자인
        </button>
        <button>
          <FontAwesomeIcon icon={faFolder} />
          엔지니어링
        </button>
        <button>
          <FontAwesomeIcon icon={faEyeSlash} />
          숨김
        </button>
      </div>
    </div>
  );
};

export default SideNave;

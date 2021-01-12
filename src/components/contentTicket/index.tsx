import React, { useState } from 'react';
import styled from 'styled-components';
import { Comment, Avatar, Form, Button, List, Input, Radio, Divider } from 'antd';
import { CommentProps } from 'antd/lib/comment';

import { faUserCircle, faThumbtack, faHistory, faUserFriends, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { TextArea } = Input;

const FontAwesomeIconStyle = styled(FontAwesomeIcon)`
  margin-right: 15px;
`;
const MakeTicket = styled.div`
  display: grid;
  grid-template-columns: 10% 87% 3%;
  > div:nth-child(1) {
    font-size: 2rem;
    vertical-align: middle;
  }
  div:nth-child(2) {
    padding: 5px 0;
  }

  p {
    margin: 0;
  }
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  h2 {
    display: inline-block;
  }
`;

const CommonStyle = styled.div``;

const Line = styled(Divider)`
  margin: 15px 0;
`;
interface commentProps {
  comments: any;
}

const CommentList = ({ comments }: commentProps) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props: CommentProps) => <Comment {...props} />}
  />
);

interface editorProps {
  onChange: any;
  onSubmit: any;
  submitting: any;
  value: any;
}
const Editor = ({ onChange, onSubmit, submitting, value }: editorProps) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

interface commentState {
  comments: Array<{}>;
  submitting: boolean;
  value: string;
}

interface progressState {
  type: string;
  count: number;
}
interface ContentTicketProps {
  ticket: any;
  checkPin: () => void;
}

export const ContentTicket = ({ ticket, checkPin }: ContentTicketProps) => {
  const [value, setValue] = useState('request');
  const ticketContent = ticket;
  const [comment, setComment] = useState<commentState>({
    comments: [],
    submitting: false,
    value: '',
  });

  const handleSubmit = () => {
    if (!comment.value) {
      return;
    }

    setComment({
      ...comment,
      submitting: true,
    });

    setTimeout(() => {
      setComment({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{comment.value}</p>,
            // datetime: moment().fromNow(),
          },
          ...comment.comments,
        ],
      });
    }, 1000);
  };

  const handleChange = (e: any) => {
    setComment({
      ...comment,
      value: e.target.value,
    });
  };

  const onChange = (e: any) => {
    // console.log('radio checked', e.target.value);
    // setValue(e.target.value);
    // console.log(e.target);
    // let target = e.target.value;
    // let checkProgress = progress.map((item: any) => {
    //   if (item.type === target) {
    //     return { ...progress, count: item.count + 1 };
    //   }
    //   return item;
    // });
    // setProgress(checkProgress);
  };

  return (
    <>
      <MakeTicket>
        <div>
          <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
        </div>
        <div>
          <p>관리자 1</p>
          <p>2021-01-08 10:27</p>
        </div>
        <FontAwesomeIcon icon={faThumbtack} onClick={checkPin}></FontAwesomeIcon>
      </MakeTicket>
      <TitleArea>
        <h2>{ticketContent.title}</h2> <span> 업무번호 {ticketContent.id}</span>
      </TitleArea>
      <Line />
      <div>
        <FontAwesomeIconStyle icon={faHistory}></FontAwesomeIconStyle>
        <Radio.Group name="progress" buttonStyle="solid" onChange={onChange} value={ticketContent.status}>
          <Radio.Button value={'request'}>요청</Radio.Button>
          <Radio.Button value={'progress'}>진행</Radio.Button>
          <Radio.Button value={'feedback'}>피드백</Radio.Button>
          <Radio.Button value={'completion'}>완료</Radio.Button>
          <Radio.Button value={'pending'}>보류</Radio.Button>
        </Radio.Group>
      </div>
      <Line />
      <CommonStyle>
        <FontAwesomeIconStyle icon={faUserFriends}></FontAwesomeIconStyle>
        {ticketContent.managers.map((manager: string) => {
          return <span>{manager}</span>;
        })}
      </CommonStyle>
      <div>{ticketContent.content}</div>
      <Line />
      <CommonStyle>
        <FontAwesomeIconStyle icon={faHeart}></FontAwesomeIconStyle>
      </CommonStyle>
      <>
        {comment.comments.length > 0 && <CommentList comments={comment.comments} />}
        <Comment
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={comment.submitting}
              value={comment.value}
            />
          }
        />
      </>
    </>
  );
};

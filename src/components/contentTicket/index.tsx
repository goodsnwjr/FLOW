import React, { useState } from 'react';
import styled from 'styled-components';
import { Comment, Avatar, Form, Button, List, Input, Radio } from 'antd';
import { CommentProps } from 'antd/lib/comment';

import { faUserCircle, faThumbtack, faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { TextArea } = Input;

const MakeTicket = styled.div`
  display: grid;
  grid-template-columns: 7% 90% 3%;
  > div:nth-child(1) {
    font-size: 2rem;
    vertical-align: middle;
  }
  div:nth-child(2) {
    justify-self: stratch;
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
const RadioBtn = styled(Radio)`
  border
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
  checkPin: () => void;
}

export const ContentTicket = ({ checkPin }: ContentTicketProps) => {
  const [value, setValue] = useState('request');
  const [comment, setComment] = useState<commentState>({
    comments: [],
    submitting: false,
    value: '',
  });
  const [progress, setProgress] = useState<progressState[]>([
    { type: 'request', count: 0 },
    { type: 'progress', count: 0 },
    { type: 'feedback', count: 0 },
    { type: 'completion', count: 0 },
    { type: 'pending', count: 0 },
  ]);

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
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    console.log(e.target);
    let target = e.target.value;
    let checkProgress = progress.map((item: any) => {
      if (item.type === target) {
        return { ...progress, count: item.count + 1 };
      }
      return item;
    });
    setProgress(checkProgress);
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
        <h2>B2B매거진</h2> <span> 업무번호 1234</span>
      </TitleArea>
      <div>
        <FontAwesomeIcon icon={faHistory}></FontAwesomeIcon>
        <Radio.Group name="progress" buttonStyle="solid" onChange={onChange} value={value} defaultValue={'request'}>
          <Radio.Button value={'request'}>요청</Radio.Button>
          <Radio.Button value={'progress'}>진행</Radio.Button>
          <Radio.Button value={'feedback'}>피드백</Radio.Button>
          <Radio.Button value={'completion'}>완료</Radio.Button>
          <Radio.Button value={'pending'}>보류</Radio.Button>
        </Radio.Group>
      </div>
      <div>업무작성시 연결</div>
      <div>
        <span>아이콘 좋아요</span>
        <span>아이콘 댓글작성</span>
        <span>아이콘 담아두기</span>
      </div>
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

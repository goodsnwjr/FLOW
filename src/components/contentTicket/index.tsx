import React, { useState } from 'react';
import styled from 'styled-components';
import { Comment, Avatar, Form, Button, List, Input, Radio, Divider } from 'antd';
import { CommentProps } from 'antd/lib/comment';
import { faUserCircle, faThumbtack, faHistory, faUserFriends, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { like, changeStatus } from 'store';
import { RadioChangeEvent } from 'antd/lib/radio';

const { TextArea } = Input;

const ContentBox = styled.div`
  width: 95%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #fff;
  margin-top: 5px;
`;

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

// interface progressState {
//   type: string;
//   count: number;
// }
interface ContentTicketProps {
  ticket: any;
  checkPin: () => void;
}

export const ContentTicket = ({ ticket, checkPin }: ContentTicketProps) => {
  const ticketContent = ticket;
  const [comment, setComment] = useState<commentState>({
    comments: [],
    submitting: false,
    value: '',
  });
  const dispatch = useDispatch();

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

  const likeContent = (e: any, ticket: any) => {
    console.log(ticket);
    dispatch(
      like({
        id: ticket.id,
        like: ticket.like === true ? false : true,
      })
    );

    e.target.style.color = ticket.like ? 'red' : 'black';
  };

  const onChange = (id: number, value: RadioChangeEvent) => {
    console.log(value.target.value);
    dispatch(
      changeStatus({
        id: id,
        value: value.target.value,
      })
    );
  };
  console.log(ticketContent.title !== '');
  return (
    <>
      {ticketContent.title !== '' && (
        <ContentBox>
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
            <h2>{ticketContent.title}</h2>
            {ticketContent.id !== 0 && <span>업무번호{ticketContent.id}</span>}
          </TitleArea>
          {ticketContent.status && (
            <>
              <Line />
              <div>
                <FontAwesomeIconStyle icon={faHistory}></FontAwesomeIconStyle>
                <Radio.Group
                  name="progress"
                  buttonStyle="solid"
                  onChange={(value: RadioChangeEvent) => onChange(ticketContent.id, value)}
                  value={ticketContent.status}
                >
                  <Radio.Button value={'request'}>요청</Radio.Button>
                  <Radio.Button value={'progress'}>진행</Radio.Button>
                  <Radio.Button value={'feedback'}>피드백</Radio.Button>
                  <Radio.Button value={'completion'}>완료</Radio.Button>
                  <Radio.Button value={'pending'}>보류</Radio.Button>
                </Radio.Group>
              </div>
            </>
          )}
          <CommonStyle>
            {ticketContent.managers && (
              <>
                <Line />
                <FontAwesomeIconStyle icon={faUserFriends}></FontAwesomeIconStyle>
                {ticketContent.managers.map((manager: string) => {
                  return <span>{manager}</span>;
                })}
              </>
            )}
          </CommonStyle>
          {ticketContent.content && (
            <>
              <Line />
              <textarea readOnly>{ticketContent.content}</textarea>
            </>
          )}
          <Line />
          <CommonStyle>
            <FontAwesomeIconStyle
              style={{ fontSize: 20 }}
              onClick={(e) => likeContent(e, ticketContent)}
              icon={faHeart}
            ></FontAwesomeIconStyle>
            {!ticketContent.like && <span>1</span>}
          </CommonStyle>
          <Line />
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
        </ContentBox>
      )}
    </>
  );
};

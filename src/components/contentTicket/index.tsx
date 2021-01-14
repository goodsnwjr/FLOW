import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Comment, Avatar, Form, Button, List, Input, Radio, Divider } from 'antd';
import { CommentProps } from 'antd/lib/comment';
import { faUserCircle, faThumbtack, faHistory, faUserFriends, faHeart, faPaw } from '@fortawesome/free-solid-svg-icons';
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
  grid-template-columns: 10% 88.6% 1.4%;
  > div:nth-child(1) {
    display: flex;
    align-items: center;
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
  onChange: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined;
  onSubmit: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  submitting:
    | boolean
    | {
        delay?: number | undefined;
      };

  value: string;
}
const Editor = ({ onChange, onSubmit, submitting, value }: editorProps) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item style={{ textAlign: 'right' }}>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        style={{ color: '#fff', background: '#001529' }}
      >
        댓글 입력하기
      </Button>
    </Form.Item>
  </>
);

interface commentState {
  comments: Array<{}>;
  submitting: boolean;
  value: string;
}

interface ContentTicketProps {
  ticket: ticketProps;
  checkPin: () => void;
  mainColor: string;
}

interface ticketProps {
  content: string;
  id: number;
  like: boolean;
  makeTop: boolean;
  managers: string[];
  status: string;
  statusKo: string;
  title: string;
  type: string;
}

export const ContentTicket = ({ ticket, checkPin, mainColor }: ContentTicketProps) => {
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
            author: 'You',
            avatar: <FontAwesomeIcon icon={faPaw}></FontAwesomeIcon>,
            content: <p>{comment.value}</p>,
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

  const likeContent = (e: any, ticket: ticketProps) => {
    dispatch(
      like({
        id: ticket.id,
        like: ticket.like === true ? false : true,
      })
    );
  };

  const onChange = (id: number, value: RadioChangeEvent) => {
    let valueKos = '';
    switch (value.target.value) {
      case 'request':
        valueKos = '요청';
        break;
      case 'progress':
        valueKos = '진행';
        break;
      case 'feedback':
        valueKos = '피드백';
        break;
      case 'completion':
        valueKos = '완료';
        break;
      case 'pending':
        valueKos = '보류';
        break;
      default:
        valueKos = '요청';
    }
    dispatch(
      changeStatus({
        id: id,
        value: value.target.value,
        valueKo: valueKos,
      })
    );
  };
  return (
    <>
      {ticketContent.title !== '' && (
        <ContentBox>
          <MakeTicket>
            <div>
              <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '4vw' }}></FontAwesomeIcon>
            </div>
            <div>
              <p>관리자 1</p>
              <p>2021-01-08 10:27</p>
            </div>
            <FontAwesomeIcon
              icon={faThumbtack}
              onClick={checkPin}
              color={ticketContent.makeTop ? mainColor : ''}
              style={{ transform: 'rotate(45deg)' }}
            ></FontAwesomeIcon>
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
          {ticketContent.managers.length > 0 && (
            <CommonStyle>
              <>
                <Line />
                <FontAwesomeIconStyle icon={faUserFriends}></FontAwesomeIconStyle>
                {ticketContent.managers.map((manager: string) => {
                  return (
                    <span key={manager} style={{ marginRight: 10 }}>
                      {manager}
                    </span>
                  );
                })}
              </>
            </CommonStyle>
          )}
          {ticketContent.content && (
            <>
              <Line />
              <div>
                {ticketContent.content.split('\n').map((line: string) => {
                  return (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  );
                })}
              </div>
            </>
          )}
          <Line />
          <CommonStyle>
            <FontAwesomeIconStyle
              style={{ fontSize: 20, color: ticketContent.like ? 'red' : 'black' }}
              onClick={(e) => likeContent(e, ticketContent)}
              icon={faHeart}
            ></FontAwesomeIconStyle>
            {ticketContent.like && <span>1</span>}
          </CommonStyle>
          <Line />
          <>
            {comment.comments.length > 0 && <CommentList comments={comment.comments} />}
            <Comment
              avatar={
                <Avatar src={<FontAwesomeIcon icon={faPaw} style={{ color: 'black' }}></FontAwesomeIcon>} alt="You" />
              }
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

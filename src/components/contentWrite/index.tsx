import { Input, Tabs, Button } from 'antd';
import { PaperClipOutlined, FileImageOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { writeContent, write } from 'store';
import { useRef } from 'react';

const { TabPane } = Tabs;

const WriteInput = styled(Input)`
  border: 0;
  height: 6rem;
`;

export const ContentWrite = () => {
  const writeList = useSelector(writeContent);
  const dispatch = useDispatch();
  const inputRef = useRef<any>();

  function callback(key: any) {
    //tab
    console.log(key);
  }

  const writeAdd = (e: any) => {
    const newWriteList = [...writeList];
    newWriteList.push({ content: e.current.state.value });
    console.log(newWriteList);
    dispatch(write(newWriteList));
  };

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="글쓰기" key="1">
          <WriteInput placeholder="글을 입력하세요." ref={inputRef} />
        </TabPane>
        <TabPane tab="할 일" key="2"></TabPane>
      </Tabs>
      <PaperClipOutlined style={{ fontSize: 30 }} />
      <FileImageOutlined style={{ fontSize: 30 }} />
      <Button style={{ float: 'right', backgroundColor: 'red' }} onClick={() => writeAdd(inputRef)}>
        올리기
      </Button>
    </>
  );
};

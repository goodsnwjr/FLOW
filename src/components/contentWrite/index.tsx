import { Input, Tabs, Button, Radio, Divider, Select } from 'antd';
import { PaperClipOutlined, FileImageOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { writeContent, write, selectProjects } from 'store';
import { useEffect, useRef, useState } from 'react';
// import { AnyCnameRecord } from 'dns';

const { TabPane } = Tabs;
const { Option } = Select;

const WriteInput = styled(Input)`
  border: 0;
  height: 6rem;
`;

const WorkTitleInput = styled(Input)`
  border: 0;
  height: 2rem;
`;

const WorkContentInput = styled(Input)`
  border: 0;
  height: 4rem;
`;

const Line = styled(Divider)`
  margin-top: 5px;
  margin-bottom: 20px;
`;

interface contentAsideProps {
  selectProjectId: string;
  participants: any;
}

export const ContentWrite = ({ selectProjectId, participants }: contentAsideProps) => {
  const [tabStatus, SetTabStatus] = useState<string>('1');
  const writeList = useSelector(writeContent);
  const dispatch = useDispatch();
  const writeInputRef = useRef<any>();
  const workTitleInputRef = useRef<any>();
  const workContentInputRef = useRef<any>();

  const projectList = useSelector(selectProjects);
  console.log(projectList);

  function tabChange(key: any) {
    (key === '1' ? workTitleInputRef : writeInputRef).current.state.value = '';
    SetTabStatus(key);
  }

  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

  const contentAdd = (e: any) => {
    if (!e.current.state.value) return;
    const newWriteList = [...writeList];
    newWriteList.push({ content: e.current.state.value });
    dispatch(write(newWriteList));
    (tabStatus === '1' ? writeInputRef : workTitleInputRef).current.state.value = '';
  };

  useEffect(() => {
    writeInputRef.current.state.value = '';
  }, []);

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={tabChange}>
        <TabPane tab="글쓰기" key="1">
          <WriteInput placeholder="글을 입력하세요." ref={writeInputRef} />
        </TabPane>
        <TabPane tab="업무" key="2">
          <WorkTitleInput placeholder="업무명을 입력하세요" ref={workTitleInputRef} />
          <Line />
          <Radio value={'request'}>요청</Radio>
          <Radio value={'progress'}>진행</Radio>
          <Radio value={'feedback'}>피드백</Radio>
          <Radio value={'completion'}>완료</Radio>
          <Radio value={'pending'}>보류</Radio>
          <Line />
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="담당자 추가"
            onChange={handleChange}
            dropdownStyle={{ width: '30px' }}
          >
            {participants.map((item: any, index: number) => {
              return (
                <Option value={item.name} key={index}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
          <Line />
          <WorkContentInput ref={workContentInputRef} />
          <Line />
        </TabPane>
      </Tabs>
      <PaperClipOutlined style={{ fontSize: 30 }} />
      <FileImageOutlined style={{ fontSize: 30 }} />
      <Button
        style={{ float: 'right', backgroundColor: 'red' }}
        onClick={() => contentAdd(tabStatus === '1' ? writeInputRef : workTitleInputRef)}
      >
        올리기
      </Button>
    </>
  );
};

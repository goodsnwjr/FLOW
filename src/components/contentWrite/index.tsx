import { Input, Tabs, Button, Radio, Divider, Select, message } from 'antd';
import { PaperClipOutlined, FileImageOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { writeContent, write } from 'store';
import { useEffect, useRef, useState } from 'react';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const WriteInput = styled(Input)`
  border: 0;
  height: 6rem;
`;

const WorkTitleInput = styled(Input)`
  border: 0;
  height: 2rem;
`;

const WorkContentInput = styled(TextArea)`
  border: 0;
  height: 4rem;
`;

const Line = styled(Divider)`
  margin-top: 5px;
  margin-bottom: 20px;
`;

interface contentAsideProps {
  mainColor: string;
  participants: any;
  projectId: number;
}

export const ContentWrite = ({ participants, mainColor, projectId }: contentAsideProps) => {
  const [tabStatus, SetTabStatus] = useState<string>('1');
  const [radioValue, setRadioValue] = useState<string>('');
  const [radioValueKo, setRadioValueKo] = useState<string>('');
  const [managers, setManagers] = useState<string[]>([]);
  const [contentTextArea, setContentTextArea] = useState<string>('');
  const writeList = useSelector(writeContent);
  const dispatch = useDispatch();
  const writeInputRef = useRef<any>();
  const workTitleInputRef = useRef<any>();
  const workContentInputRef = useRef<any>();

  function tabChange(key: any) {
    if (key === '1') {
      workTitleInputRef.current.state.value = '';

      setContentTextArea('');
      setRadioValue('');
      setManagers([]);
    } else if (key === '2') {
      writeInputRef.current.state.value = '';
    }
    SetTabStatus(key);
  }

  function handleChange(value: string[]) {
    setManagers(value);
  }

  const contentAdd = () => {
    const newWriteList = [...writeList];
    if (tabStatus === '1') {
      let _writeInput = writeInputRef.current.state.value;
      if (!_writeInput) return message.error('업무명을 입력하세요.');
      newWriteList.push({
        projectId: projectId,
        title: _writeInput,
        type: '일반',
        makeTop: false,
        id: newWriteList.length,
        like: false,
      });
      writeInputRef.current.state.value = '';
    } else if (tabStatus === '2') {
      let _workTitleInput = workTitleInputRef.current.state.value;
      if (!_workTitleInput)
        return message.error({
          content: '업무명을 입력하세요.',
          style: {
            marginTop: '35vh',
          },
        });
      if (!radioValue)
        return message.error({
          content: '상태를 입력하세요.',
          style: {
            marginTop: '35vh',
          },
        });
      if (!contentTextArea)
        return message.error({
          content: '업무내용을 입력하세요.',
          style: {
            marginTop: '35vh',
          },
        });

      newWriteList.push({
        projectId: projectId,
        title: _workTitleInput,
        status: radioValue,
        statusKo: radioValueKo,
        managers: managers,
        content: contentTextArea,
        type: '업무',
        makeTop: false,
        id: newWriteList.length,
        like: false,
      });

      workTitleInputRef.current.state.value = '';
      setContentTextArea('');
      setRadioValue('');
      setManagers([]);
    }
    dispatch(write(newWriteList));
  };

  function radioOnChange(e: any) {
    switch (e.target.value) {
      case 'request':
        setRadioValueKo('요청');
        break;
      case 'progress':
        setRadioValueKo('진행');
        break;
      case 'feedback':
        setRadioValueKo('피드백');
        break;
      case 'completion':
        setRadioValueKo('완료');
        break;
      case 'pending':
        setRadioValueKo('보류');
        break;
      default:
        setRadioValueKo('요청');
    }
    setRadioValue(e.target.value);
  }

  const workContentChange = (e: any) => {
    let values = contentTextArea + e.nativeEvent.data;
    setContentTextArea(values);
  };

  useEffect(() => {
    setContentTextArea(contentTextArea);
  }, [contentTextArea]);

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
          <Radio.Group name="progress" buttonStyle="solid" onChange={(e) => radioOnChange(e)} value={radioValue}>
            <Radio.Button value={'request'}>요청</Radio.Button>
            <Radio.Button value={'progress'}>진행</Radio.Button>
            <Radio.Button value={'feedback'}>피드백</Radio.Button>
            <Radio.Button value={'completion'}>완료</Radio.Button>
            <Radio.Button value={'pending'}>보류</Radio.Button>
          </Radio.Group>
          <Line />
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="담당자 추가"
            onChange={handleChange}
            dropdownStyle={{ width: '30px' }}
            value={managers}
          >
            {participants.map((item: { name: string }, index: number) => {
              return (
                <Option value={item.name} key={index}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
          <Line />
          <WorkContentInput
            ref={workContentInputRef}
            onChange={(e) => workContentChange(e)}
            value={contentTextArea}
          ></WorkContentInput>
          <Line />
        </TabPane>
      </Tabs>
      <PaperClipOutlined style={{ fontSize: 30 }} />
      <FileImageOutlined style={{ fontSize: 30 }} />
      <Button style={{ float: 'right', backgroundColor: mainColor, borderRadius: 5 }} onClick={contentAdd}>
        올리기
      </Button>
    </>
  );
};

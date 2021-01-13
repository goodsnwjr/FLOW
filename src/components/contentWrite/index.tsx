import { Input, Tabs, Button, Radio, Divider, Select } from 'antd';
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
  selectProjectId: string;
  participants: any;
}

export const ContentWrite = ({ selectProjectId, participants }: contentAsideProps) => {
  const [tabStatus, SetTabStatus] = useState<string>('1');
  const [radioValue, setRadioValue] = useState('');
  const [radioValueKo, setRadioValueKo] = useState('');
  const [manager, setManager] = useState('');
  const writeList = useSelector(writeContent);
  const dispatch = useDispatch();
  const writeInputRef = useRef<any>();
  const workTitleInputRef = useRef<any>();
  const workContentInputRef = useRef<any>();

  function tabChange(key: any) {
    if (key === '1') {
      workTitleInputRef.current.state.value = '';
      workContentInputRef.current.state.value = '';
    } else if (key === '2') {
      writeInputRef.current.state.value = '';
    }
    SetTabStatus(key);
  }

  function handleChange(value: any) {
    setManager(value);
  }

  const contentAdd = () => {
    const newWriteList = [...writeList];
    if (tabStatus === '1') {
      let _writeInput = writeInputRef.current.state.value;
      if (!_writeInput) return;
      newWriteList.push({ title: _writeInput, type: '일반', makeTop: false, id: newWriteList.length + 1 });
      _writeInput = '';
    } else if (tabStatus === '2') {
      let _workTitleInput = workTitleInputRef.current.state.value;
      console.log(workContentInputRef.current.resizableTextArea.props.value);
      let _workContentInput = workContentInputRef.current.resizableTextArea.props.value;
      if (!_workTitleInput) return;
      newWriteList.push({
        title: _workTitleInput,
        status: radioValue,
        statusKo: radioValueKo,
        manager: manager,
        content: _workContentInput,
        type: '업무',
        makeTop: false,
        id: newWriteList.length + 1,
      });
      _workTitleInput = '';
      _workContentInput = '';
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
          <Radio.Group name="progress" onChange={(e) => radioOnChange(e)} value={radioValue}>
            <Radio value={'request'}>요청</Radio>
            <Radio value={'progress'}>진행</Radio>
            <Radio value={'feedback'}>피드백</Radio>
            <Radio value={'completion'}>완료</Radio>
            <Radio value={'pending'}>보류</Radio>
          </Radio.Group>
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
      <Button style={{ float: 'right', backgroundColor: 'red' }} onClick={contentAdd}>
        올리기
      </Button>
    </>
  );
};

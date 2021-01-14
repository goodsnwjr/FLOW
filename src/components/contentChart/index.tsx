import React, { useEffect } from 'react';
import { chart } from './utils';
import { useSelector } from 'react-redux';
import { writeContent } from 'store';
import styled from 'styled-components';
const BoxStyle = styled.div`
  display: flex;
  justify-content: center;
`;

interface ContentChartProps {
  projectId: number;
}

export const ContentChart = ({ projectId }: ContentChartProps) => {
  const progress = useSelector(writeContent);

  const statuslength = (list: string[], type: string) => {
    return list.filter((n) => n === type).length;
  };

  useEffect(() => {
    let list = [];
    for (let i = 0; i < progress.length - 1; i++) {
      if (progress[i + 1].projectId === projectId) {
        list.push(progress[i + 1].status);
      }
    }

    let requestLength = statuslength(list, 'request');
    let progressLength = statuslength(list, 'progress');
    let feedbackLength = statuslength(list, 'feedback');
    let completionLength = statuslength(list, 'completion');
    let pendingLength = statuslength(list, 'pending');

    let progressArray = [requestLength, progressLength, feedbackLength, completionLength, pendingLength];
    chart(progressArray);
  }, [progress, projectId]);

  return (
    <BoxStyle>
      <canvas id="myChart" style={{ height: '35vh', width: '35vh' }}></canvas>
    </BoxStyle>
  );
};

import React, { useEffect } from 'react';
import { chart } from './utils';
import { useSelector } from 'react-redux';
import { writeContent } from 'store';

export const ContentChart = () => {
  // const [progressArray, setProgressArray] = useState([]);

  const progress = useSelector(writeContent);

  const statuslength = (list: Array<string>, type: string) => {
    return list.filter((n) => n === type).length;
  };
  useEffect(() => {
    let list = [];
    for (let i = 0; i < progress.length - 1; i++) {
      list.push(progress[i + 1].status);
    }

    let requestLength = statuslength(list, 'request');
    let progressLength = statuslength(list, 'progress');
    let feedbackLength = statuslength(list, 'feedback');
    let completionLength = statuslength(list, 'completion');
    let pendingLength = statuslength(list, 'pending');

    let progressArray = [requestLength, progressLength, feedbackLength, completionLength, pendingLength];
    chart(progressArray);
  }, [progress]);

  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  );
};

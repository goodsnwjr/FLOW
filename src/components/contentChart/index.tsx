import React, { useEffect } from 'react';
import { chart } from './utils';

export const ContentChart = () => {
  useEffect(() => {
    chart();
  }, []);
  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  );
};

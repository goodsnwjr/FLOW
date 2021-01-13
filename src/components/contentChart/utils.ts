import React, { useState } from 'react';
import Chart from 'chart.js';
interface progressProps {
  list?: number[];
}
export const chart = (list: number[]) => {
  console.log(list);
  let _list = [...list];
  let total: number = _list?.reduce((a, c) => a + c);
  console.log(total);
  // export const chart = () => {
  Chart.pluginService.register({
    beforeDraw: function (chart: any) {
      if (chart.config.options.elements.center) {
        let ctx = chart.chart.ctx;

        let centerConfig = chart.config.options.elements.center;
        let fontStyle = centerConfig.fontStyle || 'Arial';
        let txt = centerConfig.text;
        let color = centerConfig.color || '#000';
        let sidePadding = centerConfig.sidePadding || 20;
        let sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
        ctx.font = '30px ' + fontStyle;

        let stringWidth = ctx.measureText(txt).width;
        let elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

        let widthRatio = elementWidth / stringWidth;
        let newFontSize = Math.floor(30 * widthRatio);
        let elementHeight = chart.innerRadius * 2;

        let fontSizeToUse = Math.min(newFontSize, elementHeight);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.font = fontSizeToUse + 'px ' + fontStyle;
        ctx.fillStyle = color;

        ctx.fillText(txt, centerX, centerY);
      }
    },
  });

  // interface configType {
  //   type: string;
  //   data: {
  //     labels: string[];
  //     datasets: {
  //       data: number[];
  //       backgroundColor: string[];
  //       hoverBackgroundColor: string[];
  //     }[];
  //   };
  //   options: {
  //     elements: {
  //       center: {
  //         text: string;
  //         color: string;
  //         fontStyle: string;
  //         sidePadding: number;
  //       };
  //     };
  //   };
  // }

  let config: any = {
    type: 'doughnut',
    data: {
      labels: ['요청', '진행', '피드백', '완료', '보류'],
      datasets: [
        {
          data: list,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(123, 192, 192, 0.2)',
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(123, 192, 192, 0.2)',
          ],
        },
      ],
    },
    options: {
      elements: {
        center: {
          text: `업무리포트 ${total}건`,
          color: '#000', // Default is #000000
          fontStyle: 'Arial', // Default is Arial
          sidePadding: 20, // Defualt is 20 (as a percentage)
        },
      },
    },
    legend: {
      position: 'bottom',
      display: false,
    },
    legendCallback: function (chart: any) {
      const renderLabels = (chart: any) => {
        const { data } = chart;
        return data.datasets[0].data
          .map(
            (_: any, i: number) =>
              `<li>
                  <div id="legend-${i}-item" class="legend-item">
                    <span style="background-color:
                      ${data.datasets[0].backgroundColor[i]}">
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    ${data.labels[i] && `<span class="label">${data.labels[i]}: $${data.datasets[0].data[i]}</span>`}
                  </div>
              </li>
            `
          )
          .join('');
      };
      return `
        <ul class="chartjs-legend">
          ${renderLabels(chart)}
        </ul>`;
    },
  };
  let aa = document.getElementById('myChart') as HTMLCanvasElement;
  let ctx = aa.getContext('2d') as CanvasRenderingContext2D;
  let myChart = new Chart(ctx, config);
};

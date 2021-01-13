import React from 'react';
import Chart from 'chart.js';

export const chart = () => {
  Chart.pluginService.register({
    beforeDraw: function (chart: any) {
      if (chart.config.options.elements.center) {
        var ctx = chart.chart.ctx;

        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
        ctx.font = '30px ' + fontStyle;

        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = chart.innerRadius * 2;

        var fontSizeToUse = Math.min(newFontSize, elementHeight);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.font = fontSizeToUse + 'px ' + fontStyle;
        ctx.fillStyle = color;

        ctx.fillText(txt, centerX, centerY);
      }
    },
  });

  interface configType {
    type: string;
    data: {
      labels: string[];
      datasets: {
        data: number[];
        backgroundColor: string[];
        hoverBackgroundColor: string[];
      }[];
    };
    options: {
      elements: {
        center: {
          text: string;
          color: string;
          fontStyle: string;
          sidePadding: number;
        };
      };
    };
  }

  var config: any = {
    type: 'doughnut',
    data: {
      labels: ['요청', '진행', '피드백', '완료', '보류'],
      datasets: [
        {
          data: [300, 50, 100, 10, 20],
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
          text: `업무리포트 \n(전체 31건)`,
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
  var aa = document.getElementById('myChart') as HTMLCanvasElement;
  var ctx = aa.getContext('2d') as CanvasRenderingContext2D;
  var myChart = new Chart(ctx, config);
};

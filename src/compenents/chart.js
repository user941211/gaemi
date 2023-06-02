import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

function Chart({ chartData }) {
  const [series, setSeries] = useState([
    {
      name: '삼성전자',
      data: [],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: '주식 차트',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },
  });

  useEffect(() => {
    updateChartData();
  }, [chartData]);

  const updateChartData = () => {
    if (chartData && chartData.length > 0) {
      const categories = chartData.map((item) => item.date);
      const seriesData = chartData.map((item) => item.close);

      setSeries([
        {
          name: '삼성전자',
          data: seriesData,
        },
      ]);

      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: categories,
        },
      }));
    }
  };

  return (
    <div>
      <ApexCharts
        options={options}
        series={series}
        type="line"
        width={'100%'}
        height={500}
      />
    </div>
  );
}

export default Chart;



// import React, { useEffect, useState } from "react";
// import ApexCharts from "react-apexcharts";

// function Chart({ chartData }) {
//   const minLow = Math.min(
//     ...chartData.map((item) => Math.min(item.low, item.high, item.open, item.close))
//   );
//   const maxHigh = Math.max(
//     ...chartData.map((item) => Math.max(item.low, item.high, item.open, item.close))
//   );
//   const chartDataWithDateObjects = chartData.map((item) => ({
//     ...item,
//     date: new Date(item.date), // item.date를 Date 객체로 변환
//   }));
//   const minDate = Math.min(...chartDataWithDateObjects.map((item) => item.date));
//   const maxDate = Math.max(...chartDataWithDateObjects.map((item) => item.date));
//   const [candlestickSeries, setCandlestickSeries] = useState([
//     {
//       name: "Candlestick",
//       data: [],
//     },
//   ]);

//   const [candlestickOptions, setCandlestickOptions] = useState({
//     chart: {
//       type: "candlestick",
//       height: 300,
//     },
//     xaxis: {
//       type: "category",
//       categories: [],
//       labels: {
//         show: true,
//         rotate: -45,
//       },

//     },
//     yaxis: [
//       {
//         tooltip: {
//           enabled: true,
//         },
//         labels: {
//           style: {
//             colors: "#3C90EB",
//           },
//         },
//         min: minLow * 0.98,
//         max: maxHigh * 1.02,
//       },
//     ],
//   });

//   const [columnOptions, setColumnOptions] = useState({
//     chart: {
//       type: "bar",
//       height: 160,
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     plotOptions: {
//       bar: {
//         columnWidth: "80%",
//         colors: {
//           ranges: [
//             {
//               from: -1000,
//               to: 0,
//               color: "#F15B46",
//             },
//             {
//               from: 1,
//               to: 10000,
//               color: "#FEB019",
//             },
//           ],
//         },
//       },
//     },
//     stroke: {
//       width: 0,
//     },
//     xaxis: {
//       type: "category",
//       categories: [],
//       labels: {
//         show: true,
//         rotate: -45,
//       },
//     },
//     yaxis: {
//       labels: {
//         show: false,
//       },
//       tooltip: {
//         enabled: true,
//       },
//       labels: {
//         formatter: function (value) {
//           // 값에 1000으로 나눈 몫을 계산하고 "k"를 추가
//           return (value / 1000).toFixed(1) + "k";
//         },
//       },
//     },
//   });

//   const [columnSeries, setColumnSeries] = useState([
//     {
//       name: "volume",
//       data: [],
//     },
//   ]);

//   useEffect(() => {
//     updateChartData();
//   }, [chartData]);

//   const updateChartData = () => {
//     if (chartData && chartData.length > 0) {
//       const categories = chartData.map((item) => item.date);
//       const candlestickData = chartData.map((item) => ({
//         x: item.date,
//         y: [item.open, item.high, item.low, item.close],
//       }));
//       // const volumeData = chartData.map((item) => item.volume);
//       const volumeData = chartData.map((item) => ({
//         x: item.date,
//         y: item.volume
//       }));
//       setCandlestickSeries([
//         {
//           name: "Candlestick",
//           data: candlestickData,
//         },
//       ]);

//       setCandlestickOptions((prevOptions) => ({
//         ...prevOptions,
//         xaxis: {
//           categories,
//           labels: {
//             show: true,
//             rotate: 0,
//           },
//           zoom: {
//             enabled: true,
//             type: 'x',
//             autoScaleXaxis: true,
//           },
//         },
//       }));

//       setColumnSeries([
//         {
//           name: "volume",
//           data: volumeData,
//         },
//       ]);

//       setColumnOptions((prevOptions) => ({
//         ...prevOptions,
//         xaxis: {
//           categories,
//           labels: {
//             show: false,
//             rotate: -45,
//           },
//         },
//         zoom: {
//           enabled: true, // x-축 확대/축소 활성화
//           type: 'x', // x-축 확대/축소 설정
//           autoScaleYaxis: true, // y-축을 자동으로 조정
//         },
//       }));
//     }
//   };

//   return (
//     <div>
//       <div>
//         <ApexCharts options={candlestickOptions} series={candlestickSeries} type="candlestick" width={"100%"} height={300} />
//       </div>
//       <div>
//         <ApexCharts options={columnOptions} series={columnSeries} type="bar" height={160} />
//       </div>
//     </div>
//   );
// }

// export default Chart;
import React, { useEffect, useState, useRef } from "react";
import ApexCharts from "react-apexcharts";

function Chart({ chartData }) {
  const candlestickChartRef = useRef(null);
  const brushChartRef = useRef(null);

  const [candlestickOptions, setCandlestickOptions] = useState({
    chart: {
      type: "candlestick",
      height: 300,
      id: "candlestick-chart",
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: true,
        rotate: -45,
      },
      selection: {
        enabled: true, // selection 활성화
      },
    },
    yaxis: [
      {
        tooltip: {
          enabled: true,
        },
        labels: {
          style: {
            colors: "#3C90EB",
          },
        },
      },
    ],
  });

  const [brushOptions, setBrushOptions] = useState({
    chart: {
      type: "bar",
      height: 160,
      id: "brush-chart",
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
  });

  const [candlestickData, setCandlestickData] = useState([]); // candlestickData 변수 선언
  const [volumeData, setVolumeData] = useState([]); // volumeData 변수 선언

  useEffect(() => {
    updateChartData();
  }, [chartData]);

  const updateChartData = () => {
    if (chartData && chartData.length > 0) {
      const categories = chartData.map((item) =>
        new Date(
          item.date.slice(0, 4),
          item.date.slice(4, 6) - 1,
          item.date.slice(6)
        ).getTime()
      );

      const candlestickData = chartData.map((item) => ({
        x: new Date(
          item.date.slice(0, 4),
          item.date.slice(4, 6) - 1,
          item.date.slice(6)
        ).getTime(),
        y: [item.open, item.high, item.low, item.close],
      }));

      const volumeData = chartData.map((item) => ({
        x: new Date(
          item.date.slice(0, 4),
          item.date.slice(4, 6) - 1,
          item.date.slice(6)
        ).getTime(),
        y: item.volume,
      }));

      setCandlestickData(candlestickData); // candlestickData 변수에 데이터 할당
      setVolumeData(volumeData); // volumeData 변수에 데이터 할당

      setCandlestickOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories,
        },
      }));

      // Brush 차트의 X-축 데이터 업데이트
      setBrushOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories,
        },
      }));
    }
  };

  return (
    <div>
      <div>
        <ApexCharts
          ref={candlestickChartRef}
          options={candlestickOptions}
          series={[
            {
              name: "Candlestick",
              data: candlestickData, // candlestickData 변수 사용
            },
          ]}
          type="candlestick"
          width={"100%"}
          height={300}
        />
      </div>
      <div>
        <ApexCharts
          ref={brushChartRef}
          options={brushOptions}
          series={[
            {
              name: "volume",
              data: volumeData, // volumeData 변수 사용
            },
          ]}
          type="bar"
          height={160}
        />
      </div>
    </div>
  );
}

export default Chart;

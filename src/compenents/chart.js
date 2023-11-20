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
      zoom: {
        enabled: true,
        type: "x",
      },
    },
    xaxis: {
      type: "datetime", // 또는 "date"에 따라 상황에 맞게 선택
      labels: {
        show: true,
        rotate: -45,
      },
      tickPlacement: "on", // 카테고리 바 차트에서 활성화
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
    grid: {
      padding: {
        left: 30,
        right: 30,
      },
    },
  });

  const [brushOptions, setBrushOptions] = useState({
    chart: {
      type: "bar",
      height: 160,
      id: "brush-chart",
      zoom: {
        enabled: true,
        type: "x",
      },
    },
    xaxis: {
      type: "datetime", // 또는 "date"에 따라 상황에 맞게 선택
      labels: {
        show: false,
      },
      tickPlacement: "on", // 카테고리 바 차트에서 활성화
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        left: 30,
        right: 30,
      },
    },
  });

  useEffect(() => {
    // 캔들스틱 차트의 zoomed 이벤트 핸들러
    const handleCandlestickZoom = (event, chartContext, config) => {
      brushChartRef.current.chart.zoomX(config.xaxis.min, config.xaxis.max);
    };

    // 브러시 차트의 zoomed 이벤트 핸들러
    const handleBrushZoom = (event, chartContext, config) => {
      candlestickChartRef.current.chart.zoomX(config.xaxis.min, config.xaxis.max);
    };

    // 이벤트 핸들러를 등록
    candlestickChartRef.current.chart.addEventListener("zoomed", handleCandlestickZoom);
    brushChartRef.current.chart.addEventListener("zoomed", handleBrushZoom);

    // 컴포넌트가 언마운트될 때 이벤트 핸들러를 제거
    return () => {
      candlestickChartRef.current.chart.removeEventListener("zoomed", handleCandlestickZoom);
      brushChartRef.current.chart.removeEventListener("zoomed", handleBrushZoom);
    };
  }, []);

  return (
    <div>
      <div>
        <ApexCharts
          ref={candlestickChartRef}
          options={candlestickOptions}
          series={[
            {
              name: "Candlestick",
              data: chartData.map((item) => ({
                x: new Date(item.date).getTime(),
                y: [item.open, item.high, item.low, item.close],
              })),
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
              data: chartData.map((item) => ({
                x: new Date(item.date).getTime(),
                y: item.volume,
              })),
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

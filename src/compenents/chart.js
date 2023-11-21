import React from "react";
import ApexCharts from "react-apexcharts";

function Chart({ chartData, chartData2 }) {
  return (
    <div>
      <div style={{ width: "70%", display: "inline-block" }}>
        <ApexCharts
          options={{
            chart: {
              type: "candlestick",
              height: 300,
            },
            xaxis: {
              type: "datetime",
              labels: {
                show: true,
                rotate: -45,
              },
              tickPlacement: "on",
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
                title: {
                  style: {
                    color: "#3C90EB",
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
          }}
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
          height={300}
        />
      </div>
      <div style={{ width: "30%", display: "inline-block" }}>
        <ApexCharts
          options={{
            chart: {
              type: "line",
              height: 300,
            },
            xaxis: {
              type: "datetime",
              labels: {
                show: true,
                rotate: -45,
              },
              tickPlacement: "on",
            },
            yaxis: [
              {
                tooltip: {
                  enabled: true,
                },
                labels: {
                  style: {
                    colors: "#FF9800",
                  },
                },
                title: {
                  style: {
                    color: "#FF9800",
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
          }}
          series={[
            {
              name: "Line Chart",
              data: chartData2.map((item) => ({
                x: new Date(item.date),
                y: item.predict_close,
              })),
            },
          ]}
          type="line"
          height={300}
        />
      </div>
      <div>
        <ApexCharts
          options={{
            chart: {
              type: "bar",
              height: 160,
            },
            xaxis: {
              type: "datetime",
              labels: {
                show: false,
              },
              tickPlacement: "on",
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
          }}
          series={[
            {
              name: "Volume",
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

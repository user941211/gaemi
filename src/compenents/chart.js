import { Component } from "react";
import ApexCharts from "react-apexcharts";

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "희망",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
        {
          name: "개미들 나락",
          data: [1, 4, 15, 41, 69, 32, 39, 31, 48],
        },
      ],

      options: {
        chart: {
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "대충 구현해봄",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
      },
    };
  }
  render() {
    return (
      <ApexCharts
        options={this.state.options}
        series={this.state.series}
        typs="line"
        width={500}
        height={300}
      />
    );
  }
}

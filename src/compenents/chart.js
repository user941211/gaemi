import { Component } from 'react'
import ApexCharts from 'react-apexcharts'

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: "삼성전자",
        data: [31, 572, 780, 41, 978, 69, 529, 590, 714, 48, 717, 4, 489, 32, 569, 822, 852, 692, 887, 305]
      },
      {
        name: "LG전자",
        data: [69, 389, 527, 740, 180, 869, 690, 36, 590, 367, 948, 197, 954, 520, 1, 794, 556, 357, 876, 895]
      }],

      options: {  
        chart: {
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: '주식 차트',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
        }
      }
    }
  }
  render() {
    return (
        <ApexCharts
            options={this.state.options}
            series={this.state.series}
            typs='line'
            width={'100%'}
            height={'500'}
        />
    );
  }
}

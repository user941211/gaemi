import { Component } from 'react'
import ApexCharts from 'react-apexcharts'
import SearchModal from './searchmodal';
export default class Chart extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.data);
    
    this.state = {
      //series: this.props.data,
      series:[{
        name: "삼성전자",
        //data: props.data.map(item => item.close)
        data: [31, 572, 780, 41, 978, 69, 529, 590, 714, 48, 717, 4, 489, 32, 569, 822, 852, 692, 887, 305],
      }],

      options: {  
        chart: {
          zoom: {
            enabled: false
          }
        },
        dataLabels: { enabled: false },
        stroke: {  curve: 'smooth' },
        title: { text: '주식 차트', align: 'left' },
        grid: {
          row: {
            colors: ['#f3f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
          //categories: props.data.map(item => item.date),
        }
      }
    }
  }
  componentDidMount() {
    // 구독을 설정하여 SearchModal의 데이터 변경을 감지합니다.
    SearchModal.subscribe(this.handleSearchModalDataChange);
  }

  componentWillUnmount() {
    // 구독을 해제합니다.
    SearchModal.unsubscribe(this.handleSearchModalDataChange);
  }

  handleSearchModalDataChange = (data) => {
    // SearchModal에서 데이터 변경 시 호출되는 콜백 함수입니다.
    this.setState({ series: data });
  }
  render() {
    console.log(SearchModal.response.data);
    //const { data } = this.props;
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

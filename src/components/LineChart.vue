<script>
  import { Line } from 'vue-chartjs'
  export default {
    extends: Line,
        props: {
      chartData: {
        type: Array ,
        required: false
      },
      chartLabels: {
        type: Array,
        required: true
      },      
      chartName: {
        type: String,
        required: false
      },
            bgColor: {
        type: String,
        required: false
      },
    },
    data () {
      return {
    options: {
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              padding: 25
            }
          }
        ]
      }
    }
      }
    },
    mounted () {
      this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          label: this.chartName,
          data: this.chartData,
          backgroundColor: this.bgColor,
          borderColor: "#36495d",
          borderWidth: 1
        },
        // {
        //   label: "Planetary Mass (relative to the Sun x 10^-6)",
        //   data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
        //   backgroundColor: "rgba(71, 183,132,.5)",
        //   borderColor: "#47b784",
        //   borderWidth: 3
        // }
      ]
      }, this.options)
    }
  }
</script>
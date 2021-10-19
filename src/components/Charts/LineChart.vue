<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  props: {
    chartData: {
      type: Array,
      default: null,
      required: false,
    },
    chartLabels: {
      type: Array,
      required: true,
    },
    chartName: {
      type: String,
      required: false,
    },
    bgColor: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        lineTension: 1,
        animation: {
          duration: 1200,
          easing: "easeInOutQuart",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: false,
                padding: 5,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          position: "top",
          align: "end",
        },
      },
    };
  },
  mounted() {
    this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            label: this.chartName,
            data: this.chartData,
            backgroundColor: this.bgColor,
            borderColor: "#36495d",
            borderWidth: 0.1,
          },
        ],
      },
      this.options
    );
  },
  watch: {
    chartData() {
      this.$data._chart.update();
    },
  },
};
</script>

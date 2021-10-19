<template>
  <b-col lg="3" md="6">
    <b-card bg-variant="light"
      ><h6>{{ title }}</h6>
      <h4>{{ description }}</h4>
      <p style="font-size: 14px">
        Latest data provided on {{ duration || "N/A" }}
      </p>
      <line-chart
        v-if="isLoaded"
        :chartData="data"
        :chartLabels="dates"
        :chartName="name"
        :bgColor="bg"
      ></line-chart>
    </b-card>
  </b-col>
</template>

<script>
import LineChart from "../Charts/LineChart.vue";
import { BCol, BCard } from "bootstrap-vue";

// import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: "ChartCard",
  components: {
    LineChart,
    "b-col": BCol,
    "b-card": BCard,
  },
  props: {
    data: {
      type: Array,
      required: false,
    },
    dates: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    bg: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    duration: {
      type: String,
      required: false,
    },
    isLoaded: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

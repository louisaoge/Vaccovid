<template>
  <div class="container">
    <datepicker placeholder="Start Date" v-model="periodStart" name="start-date"></datepicker>
<datepicker placeholder="End Date" v-model="periodEnd" name="end-date"></datepicker>
     <line-chart
        :chartdata="datacollection"
        :options="chartOptions"
      ></line-chart>
  </div>
</template>

<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'
  import LineChart from '../components/LineChart'
  import { dateToDay, dateBeautify } from '../utils/dateFormatter'

  
  export default {
    components: {
      LineChart,
      Datepicker
    },
    data () {
      return {
        package: null,
        packageName: '',
        loaded: false,
        downloads: [],
        labels: [],
        showError: false,
        errorMessage: 'Please enter a package name',
        periodStart: '',
        periodEnd: new Date()
      }
    },
    
  computed: {
    _endDate () {
      return dateToDay(this.periodEnd)
    },
    _startDate () {
      return dateToDay(this.periodStart)
    },
    period () {
      return this.periodStart ?  `${this._startDate}:${this._endDate}` : 'last-month'
    },
    formattedPeriod () {
      return this.periodStart ? `${dateBeautify(this._startDate)} - ${dateBeautify(this._endDate)}` : 'last-month'
    }
  },
    async mounted () {
    this.loaded = false
   
      var options = {
  method: 'GET',
  url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/Canada/can',
  headers: {
    'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
    'x-rapidapi-key': '77d0a1e417msh2ea267d180ab92ep1787e8jsn16255560f958'
  }
};
axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

  }
}
</script>
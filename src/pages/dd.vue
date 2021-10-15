<template>
  <div class="container">
    <datepicker placeholder="Start Date" v-model="periodStart" name="start-date"></datepicker>
<datepicker placeholder="End Date" v-model="periodEnd" name="end-date"></datepicker>
     <b-row>
       <b-col>
         <b-card>
            <line-chart
        :chartdata="casesCollection"
        :options="chartOptions"
      ></line-chart>
         </b-card>
       </b-col>
     </b-row>
    
  </div>
</template>

<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'
  import LineChart from '../components/LineChart.vue'
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
        casesCollection: {},
        deathCollection: {},
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
  url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global_and_us?country=Nigeria&min_date=2020-04-22T00:00:00.000Z&max_date=2020-04-27T00:00:00.000Z&hide_fields=_id, country, country_code, country_iso2, country_iso3, loc, state'
};
axios.request(options).then(response => {
   this.downloads = response.data.map(date => date.date)
   this.labels = response.data.downloads.map(download => download.day)
   this.packageName = response.data.package
   this.loaded = true
   }).catch(function (error) {
	console.error(error);
});

  }
}
</script>
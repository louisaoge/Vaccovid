<template>
  <div  style="text-align: left" class="container">
    <b-row class="pb-3">
      <b-col lg="auto">
        <b-card bg-variant="light">
          <datepicker
            placeholder="Start Date"
            v-model="periodStart"
            name="start-date"
            @selected="validateDataRequest"
            :disabledDates="disabledDates"
          ></datepicker>
        </b-card>
      </b-col>
      <b-col lg="auto">
        <b-card bg-variant="light">
          <datepicker
            placeholder="End Date"
            v-model="periodEnd"
            name="end-date"
            @selected="validateDataRequest"
            :disabledDates="disabledDates"
          ></datepicker>
        </b-card>
      </b-col>
      <b-col lg="4">
        <b-card bg-variant="light">
          <v-select
            v-if="mloaded"
            v-model="selectedCountry"
            :options="countries"
            :get-option-label="(option) => option.Country"
            :clearable="false"
            placeholder="Select Country"
            @input="requestData"
          ></v-select>
        </b-card>
      </b-col> </b-row
    ><b-card bg-variant="light">
      <b-row no-gutters>
        <b-col>
          <div >
            <h6>Vaccinations</h6>
            <h4>People vaccinated</h4>
            <p>Up to and including {{ _endDate || 'N/A'}}</p>
          </div>
        </b-col>
        <b-col>
          <b-row>
            <b-col sm="6">
              <h6>Daily — 1st dose</h6>
              <h4>{{allData.one_Caseevery_X_ppl || 'N/A'}}</h4>
              <hr />
            </b-col>
            <b-col sm="6">
              <h6>Daily — 2nd dose</h6>
              <h4>{{allData.one_Deathevery_X_ppl || 'N/A'}}</h4> <hr />
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <h6>Total — 1st dose</h6>
              <h4>{{allData.TotalCases || 'N/A'}}</h4>
             
            </b-col>
            <b-col sm="6">
              <h6>Total — 2nd dose</h6>
              <h4>{{allData.TotalDeaths || 'N/A'}}</h4>
            </b-col>
          </b-row>
        </b-col>
      </b-row></b-card
    >
    <b-row class="py-5">
      <b-col lg="3">
        <b-card bg-variant="light"
          ><h6>Cases</h6>
          <h4>People tested positive</h4>
           <p style="font-size:14px"> Latest data provided on {{ _endDate || 'N/A'}}</p>
          <line-chart
            v-if="loaded"
            :chartData="casesCollection"
            :chartLabels="dateCollection"
            :chartName="'People tested positive'"
            :bgColor="'rgb(250,218,218)'"
          ></line-chart>
        </b-card>
      </b-col>
      <b-col lg="3">
        <b-card bg-variant="light">
          <h6>Death</h6>
          <h4>Deaths within 28 days of positive test</h4>
           <p style="font-size:14px">Latest data provided on {{ _endDate || 'N/A'}}</p>
          <line-chart
            v-if="loaded"
            :chartData="deathCollection"
            :chartLabels="dateCollection"
            :chartName="'Deaths'"
            :bgColor="'rgb(179,131,134)'"
          ></line-chart>
        </b-card>
      </b-col>
      <b-col lg="3">
        <b-card bg-variant="light">
          <h6>Health Care</h6>
          <h4>Patients admitted</h4>
           <p style="font-size:14px">Latest data provided on {{ _endDate || 'N/A'}}</p>
          <line-chart
            v-if="loaded"
            :chartData="recovCollection"
            :chartLabels="dateCollection"
            :chartName="'Recovered'"
            :bgColor="'rgb(176,245,179)'"
          ></line-chart>
        </b-card>
      </b-col>
      <b-col lg="3">
        <b-card bg-variant="light">
          <h6>Testing</h6><h4>
          Virus tests conducted</h4>
           <p style="font-size:14px">Latest data provided on {{ _endDate || 'N/A'}}</p>
          <line-chart
            v-if="loaded"
            :chartData="testingCollection"
            :chartLabels="dateCollection"
            :chartName="'Testing'"
            :bgColor="'rgb(250,232,177)'"
          ></line-chart>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import LineChart from "../components/LineChart.vue";
import { dateToDay, dateBeautify, dateBeautify2 } from "../utils/dateFormatter";

export default {
  components: {
    LineChart,
    Datepicker,
  },
  data() {
    return {
      package: null,
      packageName: "",
      loaded: false,
      mloaded: false,
      selectedCountry: {
        Country: "Nigeria",
        ThreeLetterSymbol: "nga",
      },
      casesCollection: [],
      deathCollection: [],
      dateCollection: [],
      recovCollection: [],
      testingCollection: [],
      countries: [],
      labels: [],
      allData: {},
      showError: false,
      errorMessage: "Please enter a package name",
      periodStart: new Date(2021, 7, 1),
      periodEnd: new Date(),
      disabledDates: {
        from: new Date(), // Disable all dates after specific date
        to: new Date(2020, 10, 1),
      },
    };
  },
  methods: {
    getLabel: function (option) {
      let newLabel = null;
      if (typeof option === "object") {
        // eslint-disable-next-line no-prototype-builtins
        if (!option.hasOwnProperty(this.label)) {
          newLabel = option.Country;
        }
      }
      return newLabel;
    },
    requestData: async function () {
      this.loaded = false;
      var options = {
        method: "GET",
        url: `https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global_and_us?country=${
          this.country || "Nigeria"
        }&min_date=${dateToDay(this.periodStart)}&max_date=${dateToDay(
          this.periodEnd
        )}&hide_fields=_id, country, country_code, country_iso2, country_iso3, loc, state`,
      };
      var mainOptions = {
        method: "GET",
        url: `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/${
          this.country || "Nigeria"
        }/${this.countryISO || "nga"}`,
        headers: {
          "x-rapidapi-host":
            "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
          "x-rapidapi-key":
            "77d0a1e417msh2ea267d180ab92ep1787e8jsn16255560f958",
        },
      };
      var countryOptions = {
        method: "GET",
        url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered",
        headers: {
          "x-rapidapi-host":
            process.env.APIHOST,
          "x-rapidapi-key":
            process.env.APIKEY,
        },
      };

      axios
        .request(mainOptions)
        .then((response)=> {
          this.allData = response.data[0];
          console.log(response.data)
        })
        .catch(function (error) {
          console.error(error);
        });
      axios
        .request(options)
        .then((response) => {
          this.dateCollection = response.data.map((date) =>
            dateBeautify(date.date)
          );
          this.casesCollection = response.data.map((date) => date.confirmed);
          this.deathCollection = response.data.map((date) => date.deaths);
          this.recovCollection = response.data.map((date) => date.recovered);
          this.testingCollection = response.data.map(
            (date) => date.confirmed_daily
          );
          this.loaded = true;
        })
        .catch(function (error) {
          console.error(error);
        });
      axios
        .request(countryOptions)
        .then((response) => {
          this.countries = response.data;
          this.mloaded = true;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    validateDataRequest() {
      console.log("ValidateData");
      if (this.periodStart !== "") {
        this.requestData();
      }
    },
  },
  computed: {
    _endDate() {
      return dateBeautify2(this.periodEnd);
    },
    _startDate() {
      return dateToDay(this.periodStart);
    },
    period() {
      return this.periodStart
        ? `${this._startDate}:${this._endDate}`
        : "last-month";
    },
    formattedPeriod() {
      return this.periodStart
        ? `${dateBeautify(this._startDate)} - ${dateBeautify(this._endDate)}`
        : "last-month";
    },
    country() {
      let newO = "";
      if (this.selectedCountry) {
        newO = this.selectedCountry.Country;
      }
      return newO;
    },
    countryISO() {
      let newISO = "";
      if (this.selectedCountry) {
        return this.selectedCountry.ThreeLetterSymbol;
      }
      return newISO;
    },
  },
  async mounted() {
    this.requestData();
  },
};
</script>

<template>
  <div style="text-align: left" class="container">
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
      </b-col>
    </b-row>
    <data-card :data="allData" :duration="_endDate"></data-card>
    <b-row class="py-5">
      <chart-card
        :title="'Cases'"
        :description="'People tested positive'"
        :duration="_endDate"
        :data="casesCollection"
        :dates="dateCollection"
        :name="'People tested positive'"
        :bg="'rgb(250,218,218)'"
        :isLoaded="loaded"
      ></chart-card>
      <chart-card
        :title="'Death'"
        :description="'Deaths within 28 days of positive test'"
        :duration="_endDate"
        :data="deathCollection"
        :dates="dateCollection"
        :name="'Deaths'"
        :bg="'rgb(179,131,134)'"
        :isLoaded="loaded"
      ></chart-card>
      <chart-card
        :title="'Health Care'"
        :description="'Patients admitted'"
        :duration="_endDate"
        :data="recovCollection"
        :dates="dateCollection"
        :name="'Recovered'"
        :bg="'rgb(176,245,179)'"
        :isLoaded="loaded"
      ></chart-card>
      <chart-card
        :title="'Testing'"
        :description="'Virus tests conducted'"
        :duration="_endDate"
        :data="testingCollection"
        :dates="dateCollection"
        :name="'Testing'"
        :bg="'rgb(250,232,177)'"
        :isLoaded="loaded"
      ></chart-card>
    </b-row>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import ChartCard from "../components/Cards/ChartCard.vue";
import DataCard from "../components/Cards/DataCard.vue";
import { dateToDay, dateBeautify, dateBeautify2 } from "../utils/dateFormatter";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const CovidDataRepository = RepositoryFactory.get("data");

export default {
  components: {
    ChartCard,
    DataCard,
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
    requestData: async function() {
      this.loaded = false;
      CovidDataRepository.getCountryData(this.country, this.countryISO)
        .then((response) => {
          this.allData = response.data[0];
        })
        .catch(function(error) {
          console.error(error);
        });
      CovidDataRepository.getAllCountryData(
        this.country,
        dateToDay(this.periodStart),
        dateToDay(this.periodEnd)
      )
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
        .catch(function(error) {
          console.error(error);
        });
      CovidDataRepository.getCountries()
        .then((response) => {
          this.countries = response.data;
          this.mloaded = true;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    validateDataRequest() {
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
      let newCountry = "";
      if (this.selectedCountry) {
        newCountry = this.selectedCountry.Country;
      }
      return newCountry;
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

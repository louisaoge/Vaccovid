import axios from "axios";

export default {
  getAllCountryData(country, periodStart, periodEnd) {
    return axios.request({
      method: "GET",
      url: `https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global_and_us?country=${country ||
        "Nigeria"}&min_date=${periodStart}&max_date=${periodEnd}&hide_fields=_id, country, country_code, country_iso2, country_iso3, loc, state`,
    });
  },
  getCountries() {
    return axios.request({
      method: "GET",
      url:
        "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered",
      headers: {
        "x-rapidapi-host": process.env.VUE_APP_APIHOST,
        "x-rapidapi-key": process.env.VUE_APP_APIKEY,
      }
    });
  },
  getCountryData(country, countryISO) {
    return axios.request({
      method: "GET",
      url: `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/${country || "Nigeria"}/${countryISO || "nga"}`,
      headers: {
        "x-rapidapi-host": process.env.VUE_APP_APIHOST,
        "x-rapidapi-key": process.env.VUE_APP_APIKEY,
      },
    });
  },
};

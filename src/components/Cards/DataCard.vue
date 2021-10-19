<template>
  <b-card class="my-3" bg-variant="light">
    <b-row no-gutters>
      <b-col>
        <div>
          <h6>Vaccinations</h6>
          <h4>People vaccinated</h4>
          <p>Up to and including {{ duration || "N/A" }}</p>
        </div>
      </b-col>
      <b-col>
        <b-row>
          <b-col sm="6">
            <h6>Daily — 1st dose</h6>
            <h4>{{ data.one_Caseevery_X_ppl || "N/A" }}</h4>
            <hr />
          </b-col>
          <b-col sm="6">
            <h6>Daily — 2nd dose</h6>
            <h4>{{ data.one_Deathevery_X_ppl || "N/A" }}</h4>
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <h6>Total — 1st dose</h6>
            <h4>{{ data.TotalCases || "N/A" }}</h4>
          </b-col>
          <b-col sm="6">
            <h6>Total — 2nd dose</h6>
            <h4>{{ data.TotalDeaths || "N/A" }}</h4>
          </b-col>
        </b-row>
      </b-col>
    </b-row></b-card
  >
</template>
<script>
import { BRow, BCol, BCard } from "bootstrap-vue";

export default {
  name: "DataCard",
  components: {
    "b-row": BRow,
    "b-col": BCol,
    "b-card": BCard,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    duration: {
      type: String,
      required: false,
    },
  },
};
</script>

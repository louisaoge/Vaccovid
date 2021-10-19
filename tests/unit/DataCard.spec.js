import { shallowMount } from "@vue/test-utils";
import DataCard from "@/components/Cards/DataCard.vue";

describe("ChartCard.vue", () => {
  let wrapper = null;
  const data = {
    TotalCases: 178804,
    TotalDeaths: 2841,
    TotalRecovered: "169674",
    TotalTests: "1265601",
    one_Caseevery_X_ppl: 16,
    one_Deathevery_X_ppl: 1012,
    one_Testevery_X_ppl: 2,
  };
  const duration = "2021-09-15";
  // SETUP - run before to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(DataCard, {
      propsData: { data, duration },
    });
  });
  // TEARDOWN - run after to each unit test
  afterEach(() => {
    wrapper.destroy();
  });
  test("renders props.duration when passed", () => {
    expect(wrapper.text()).toMatch(duration);
  });
});

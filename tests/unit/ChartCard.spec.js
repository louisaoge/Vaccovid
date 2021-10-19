import { shallowMount } from "@vue/test-utils";
import ChartCard from "@/components/Cards/ChartCard.vue";

describe("ChartCard.vue", () => {
  let wrapper = null;
  const data = [200, 101, 111];
  const dates = ["2021-09-01", "2021-09-05", "2021-09-15"];
  const name = "People tested positive";
  const bg = "rgba(171,9,20,0.5)";
  const chartData = [200, 101, 111];
  const chartLabels = ["2021-09-01", "2021-09-05", "2021-09-15"];
  const chartName = "People tested positive";
  const bgColor = "rgba(171,9,20,0.5)";
  const title = "Cases";
  const duration = "2021-09-15";
  const isLoaded = true;

  // SETUP - run before to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(ChartCard, {
      propsData: {
        chartData,
        bgColor,
        chartName,
        chartLabels,
        data,
        dates,
        name,
        bg,
        title,
        duration,
        isLoaded,
      },
    });
  });

  // TEARDOWN - run after to each unit test
  afterEach(() => {
    wrapper.destroy();
  });
  test("renders props.title when passed", () => {
    expect(wrapper.text()).toMatch(title);
  });
});

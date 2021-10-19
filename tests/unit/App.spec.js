import { shallowMount } from "@vue/test-utils";
import App from "../../src/App.vue";

describe("Mounted App", () => {
  const wrapper = shallowMount(App);
  // TEARDOWN - run after to each unit test
  afterEach(() => {
    wrapper.destroy();
  });
  test("does a wrapper exist", () => {
    expect(wrapper.exists()).toBe(true);
  });
});

var dayjs = require("dayjs");
var advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

export const dateToYear = (date) => dayjs(date).format("YYYY");
export const dateToMonth = (date) => dayjs(date).format("MMM YYYY");
export const dateToWeek = (date) => dayjs(date).format("GGGG-[W]WW");
export const dateToDay = (date) => dayjs(date).format("YYYY-MM-DD");
export const dateBeautify = (date) => dayjs(date).format("D-MM-YY");
export const dateBeautify2 = (date) => dayjs(date).format("Do MMMM YYYY");

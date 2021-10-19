import CovidDataRepository from "./covidDataRepository";

const repositories = {
  data: CovidDataRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};

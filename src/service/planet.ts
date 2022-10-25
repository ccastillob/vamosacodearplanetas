import { fetchData } from "../helpers/fetch";

export const getPlanet = async (namePlanet: string) => {
  return await fetchPlanet(namePlanet)
    .then((data) => {
      return data;
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });
};

const fetchPlanet = async (namePlanet: string) => {
  const response = await fetchData(`${namePlanet}`);

  if (response instanceof Error) {
    throw new Error(response.message);
  }

  return response;
};

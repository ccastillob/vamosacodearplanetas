import { fetchData } from "../helpers/fetch";

export const getPlanet = async (namePlanet: string) => {
  const response = await fetchData(`${namePlanet}`);

  if (response instanceof Error) {
    return {
      status: 500,
      msg: response.message,
    };
  }
  return response;
};

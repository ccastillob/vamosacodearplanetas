import { responsePlanet } from "@planet/types";

const baseURL = import.meta.env.VITE_API_URL;

export const fetchData = async (
  endpoint: string
): Promise<responsePlanet | Error> => {
  const url = `${baseURL}/${endpoint}`;

  return await fetch(url)
    .then(async (data) => {
      if (data.status === 404) {
        return {
          msg: await data.json(),
          status: data.status,
        };
      }
      return {
        data: await data.json(),
        status: data.status,
      };
    })
    .catch(() => {
      return new Error(`Unexpected error, please try again`);
    });
};

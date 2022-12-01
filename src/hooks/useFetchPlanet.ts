import { useEffect, useContext } from "react";
import { useRoute } from "wouter";

import { PlanetContext } from "../context/PlanetContext";
import { isValidPathCharacteristic } from "../helpers/validPathCharacteristic";
import { getPlanet } from "../service/planet";

export const useFetchPlanet = () => {
  const {
    planetCurrent,
    loadPlanets,
    isError,
    notFoundPlanet,
    isNotFound,
    messageData,
    errorPlanet,
    loading,
    clearStatePlanet,
  } = useContext(PlanetContext);
  const [match, params] = useRoute("/planets/:planetName/:characteristicName");

  useEffect(() => {
    if (!match || !isValidPathCharacteristic(params)) {
      window.location.href = "/planets/jupiter/overview";
    }
  }, []);

  useEffect(() => {
    if (params) {
      getPlanet(params?.planetName.toLowerCase()).then(
        ({ data, status, msg }) => {
          if (msg) {
            return status === 404 ? notFoundPlanet(msg) : errorPlanet(msg);
          }

          if (data) {
            clearStatePlanet();
            return loadPlanets(data);
          }
        }
      );
    }
  }, [params?.planetName]);

  return {
    loading,
    planetCurrent,
    isNotFound,
    messageData,
    isError,
  };
};

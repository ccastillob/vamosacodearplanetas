import { useReducer } from "react";
import { PlanetContext } from "./PlanetContext";
import { planetReducer } from "../reducer/PlanetReducer";
import { reducerPlanetState, PlanetState } from "@planet/types";

export const INIT_STATE: reducerPlanetState = {
  planetCurrent: {
    name: "",
    overview: {
      content: "",
      source: "",
    },
    structure: {
      content: "",
      source: "",
    },
    geology: {
      content: "",
      source: "",
    },
    rotation: "",
    revolution: "",
    radius: "",
    temperature: "",
    images: {
      planet: {
        small: "",
        medium: "",
        large: "",
      },
      internal: {
        small: "",
        medium: "",
        large: "",
      },
      geology: {
        small: "",
        medium: "",
        large: "",
      },
    },
  },
  isError: false,
  isNotFound: false,
  messageData: "",
  loading: true,
};

interface PlanetProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const PlanetProvider = ({ children }: PlanetProviderProps) => {
  const [planet, dispatch] = useReducer(planetReducer, INIT_STATE);
  const { planetCurrent, isError, messageData, isNotFound, loading } = planet;

  const loadPlanets = (data: PlanetState) => {
    dispatch({ type: "PLANET_LOAD", payload: data });
  };

  const notFoundPlanet = (message: string) => {
    dispatch({ type: "PLANET_NOTFOUND", payload: message });
  };

  const errorPlanet = (message: string) => {
    dispatch({ type: "PLANET_ERROR", payload: message });
  };

  const clearStatePlanet = () => {
    dispatch({ type: "PLANET_CLEAR" });
  };

  return (
    <PlanetContext.Provider
      value={{
        planetCurrent,
        loadPlanets,
        isError,
        notFoundPlanet,
        messageData,
        isNotFound,
        errorPlanet,
        loading,
        clearStatePlanet,
      }}
    >
      {children}
    </PlanetContext.Provider>
  );
};

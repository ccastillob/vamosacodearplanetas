import { PlanetState } from "@planet/types";
import { createContext } from "react";

interface PlanetContextProps {
  planetCurrent: PlanetState;
  loadPlanets: (data: PlanetState) => void;
  isError: boolean;
  notFoundPlanet: (msg: string) => void;
  errorPlanet: (msg: string) => void;
  clearStatePlanet: () => void;
  isNotFound: boolean;
  messageData: string;
  loading: boolean;
}

export const PlanetContext = createContext<PlanetContextProps>(
  {} as PlanetContextProps
);

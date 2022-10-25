import { PlanetState, reducerPlanetState } from "@planet/types";
import { INIT_STATE } from "../context/PlanetProvider";

type PlanetAction =
  | {
      type: "PLANET_LOAD";
      payload: PlanetState;
    }
  | {
      type: "PLANET_NOTFOUND";
      payload: string;
    }
  | {
      type: "PLANET_ERROR";
      payload: string;
    }
  | {
      type: "PLANET_CLEAR";
    };

export const planetReducer = (
  state: reducerPlanetState,
  action: PlanetAction
) => {
  switch (action.type) {
    case "PLANET_LOAD":
      return {
        ...state,
        loading: false,
        planetCurrent: action.payload,
      };
    case "PLANET_NOTFOUND":
      return {
        ...state,
        isNotFound: true,
        messageData: action.payload,
      };
    case "PLANET_ERROR":
      return {
        ...state,
        isError: true,
        messageData: action.payload,
      };
    case "PLANET_CLEAR":
      return INIT_STATE;
    default:
      return state;
  }
};

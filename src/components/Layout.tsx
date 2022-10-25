import { MenuPlanets } from ".";
import { PlanetMain } from "./PlanetMain";
import { PlanetState } from "@planet/types";

interface LayoutProps {
  planetCurrent: PlanetState;
  isNotFound: boolean;
  messageData: string;
  isError: boolean;
  loading: boolean;
}

// TODO: Layout components
export const Layout = ({
  isNotFound,
  messageData,
  isError,
  loading,
}: LayoutProps) => {
  if (isNotFound) {
    return <h1 className="text-white">{messageData}</h1>;
  }

  return isError ? (
    <h1 className="text-white">{messageData}</h1>
  ) : loading ? (
    <h1 className="text-white">Cargando...</h1>
  ) : (
    <>
      <MenuPlanets />
      <PlanetMain />
    </>
  );
};

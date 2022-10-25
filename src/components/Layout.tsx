import { MenuPlanets } from ".";
import { PlanetMain, LoadingSpinner, ErrorPage, NotFoundPlanet } from "./";
import { PlanetState } from "@planet/types";

interface LayoutProps {
  planetCurrent: PlanetState;
  isNotFound: boolean;
  messageData: string;
  isError: boolean;
  loading: boolean;
}

export const Layout = ({
  isNotFound,
  messageData,
  isError,
  loading,
}: LayoutProps) => {
  if (isNotFound) {
    return <NotFoundPlanet message={messageData} />;
  }

  return isError ? (
    <ErrorPage message={messageData} />
  ) : loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <MenuPlanets />
      <PlanetMain />
    </>
  );
};

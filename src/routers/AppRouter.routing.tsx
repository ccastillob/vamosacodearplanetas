import { Route } from "wouter";
import { Layout } from "../components/Layout";
import { useFetchPlanet } from "../hooks/useFetchPlanet";

export const AppRouter = () => {
  const { planetCurrent, isNotFound, messageData, isError, loading } =
    useFetchPlanet();

  return (
    <>
      <Route path="/planets/:planetName/:characteristicName">
        <Layout
          planetCurrent={planetCurrent}
          isNotFound={isNotFound}
          messageData={messageData}
          isError={isError}
          loading={loading}
        />
      </Route>
    </>
  );
};

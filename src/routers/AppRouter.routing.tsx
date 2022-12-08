import { Route } from "wouter";
import { Layout } from "../components/Layout";
import { useFetchPlanet } from "../hooks/useFetchPlanet";

export const AppRouter = () => {
  const { isNotFound, messageData, isError, loading } = useFetchPlanet();

  return (
    <>
      <Route path="/planets/:planetName/:characteristicName">
        <Layout
          isNotFound={isNotFound}
          messageData={messageData}
          isError={isError}
          loading={loading}
        />
      </Route>
    </>
  );
};

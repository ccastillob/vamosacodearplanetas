import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Layout } from "../../components";
import { PlanetContext } from "../../context/PlanetContext";
import { fixturePlanet } from "../fixture/fixturePlanet";

const mockRoute = vi.fn();

vi.mock("wouter", async () => {
  const originalModule = await vi.importActual("wouter");

  return {
    ...(originalModule as Record<string, unknown>),
    useRoute: () => mockRoute(),
  };
});

describe("Pruebas en el componente <Layout />", () => {
  test("debe de mostrarse el componente NotFoundPlanet con un mensaje si no existe el planeta", () => {
    const data = {
      isNotFound: true,
      messageData: "Planeta no encontrado",
      isError: false,
      loading: false,
    };
    const { isError, isNotFound, loading, messageData } = data;

    render(
      <Layout
        isError={isError}
        isNotFound={isNotFound}
        loading={loading}
        messageData={messageData}
      />
    );

    expect(screen.getByText(data.messageData)).toBeInTheDocument();
  });

  test("debe de mostrarse el componente ErrorPage con un mensaje si existe un error en la página", () => {
    const data = {
      isNotFound: false,
      messageData: "Ocurrio un error, intentelo más tarde",
      isError: true,
      loading: false,
    };
    const { isError, isNotFound, loading, messageData } = data;

    render(
      <Layout
        isError={isError}
        isNotFound={isNotFound}
        loading={loading}
        messageData={messageData}
      />
    );

    expect(screen.getByText(data.messageData)).toBeInTheDocument();
  });

  test('debe de mostrarse el texto "Loading..." cuando se este cargando los componentes', () => {
    const textLoading = "Loading...";

    const data = {
      isNotFound: false,
      messageData: "",
      isError: false,
      loading: true,
    };
    const { isError, isNotFound, loading, messageData } = data;

    render(
      <Layout
        isError={isError}
        isNotFound={isNotFound}
        loading={loading}
        messageData={messageData}
      />
    );

    expect(screen.getByText(textLoading)).toBeInTheDocument();
  });

  test('debe de mostrarse el titulo "The Planets" cuando se haya cargado los componentes', () => {
    const objectRouteOverview = {
      planetName: "Earth",
      characteristicName: "surface-geology",
    };
    mockRoute.mockReturnValue([true, objectRouteOverview]);

    const contextValue = {
      planetCurrent: fixturePlanet,
      loadPlanets: vi.fn(),
      isError: false,
      notFoundPlanet: vi.fn(),
      messageData: "",
      isNotFound: false,
      errorPlanet: vi.fn(),
      loading: false,
      clearStatePlanet: vi.fn(),
    };

    const data = {
      isNotFound: false,
      messageData: "",
      isError: false,
      loading: false,
    };
    const { isError, isNotFound, loading, messageData } = data;

    render(
      <PlanetContext.Provider value={contextValue}>
        <Layout
          isError={isError}
          isNotFound={isNotFound}
          loading={loading}
          messageData={messageData}
        />
      </PlanetContext.Provider>
    );

    expect(screen.getByText(/the planets/i)).toBeInTheDocument();
  });
});
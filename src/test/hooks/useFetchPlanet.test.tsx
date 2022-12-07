import { renderHook, waitFor } from "@testing-library/react";
import { useRoute } from "wouter";
import { PlanetContext } from "../../context/PlanetContext";
import { useFetchPlanet } from "../../hooks";

jest.mock("wouter");
const mockedRoute = jest.mocked(useRoute);

const contextValue = {
  planetCurrent: {},
  loadPlanets: jest.fn(),
  isError: false,
  notFoundPlanet: jest.fn(),
  errorPlanet: jest.fn(),
  clearStatePlanet: jest.fn(),
  isNotFound: false,
  messageData: "",
  loading: false,
};

const currentPath = "/planets/earth/overview";

delete (window as any).location;
window.location = { href: currentPath } as any as Location;

Object.defineProperty(window.location, "href", {
  configurable: true,
});

const PlanetContextProvider = ({ contextValue, children }: any) => (
  <PlanetContext.Provider value={contextValue}>
    {children}
  </PlanetContext.Provider>
);

jest.setTimeout(12000);
describe("Pruebas en el custom hook useFetchPlanet", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe de llamarse loadPlanets y traer la data del planeta", async () => {
    const namePlanet = "earth";

    const objectRouteOverview = {
      planetName: namePlanet,
      characteristicName: "overview",
    };

    mockedRoute.mockReturnValue([true, objectRouteOverview]);
    const wrapper = ({ children }: any) => (
      <PlanetContextProvider contextValue={contextValue}>
        {children}
      </PlanetContextProvider>
    );

    renderHook(() => useFetchPlanet(), { wrapper });

    await waitFor(
      () => {
        expect(contextValue.clearStatePlanet).toHaveBeenCalledTimes(1);
        expect(contextValue.loadPlanets).toHaveBeenCalledTimes(1);
        expect(contextValue.loadPlanets).toHaveBeenCalledWith({
          id: expect.any(String),
          name: "Earth",
          rotation: "0.99 days",
          revolution: "365.26 days",
          radius: "6,371 km",
          temperature: "16°c",
          geology: {
            id: expect.any(String),
            content:
              "The total surface area of Earth is about 510 million km2. The continental crust consists of lower density material such as the igneous rocks granite and andesite. Less common is basalt, a denser volcanic rock that is the primary constituent of the ocean floors.",
            source: "https://en.wikipedia.org/wiki/Earth#Surface",
            planetId: expect.any(String),
          },
          images: {
            planet: {
              id: expect.any(String),
              small: "/assets/planet-earth-small.svg",
              medium: "/assets/planet-earth-medium.svg",
              large: "/assets/planet-earth.svg",
            },
            geology: {
              id: expect.any(String),
              small: "/assets/geology-earth-small.png",
              medium: "/assets/geology-earth-medium.png",
              large: "/assets/geology-earth.png",
            },
            internal: {
              id: expect.any(String),
              small: "/assets/planet-earth-internal-small.svg",
              medium: "/assets/planet-earth-internal-medium.svg",
              large: "/assets/planet-earth-internal.svg",
            },
          },
          overview: {
            id: expect.any(String),
            content:
              "Third planet from the Sun and the only known planet to harbor life. About 29.2% of Earth's surface is land with remaining 70.8% is covered with water. Earth's distance from the Sun, physical properties and geological history have allowed life to evolve and thrive.",
            source: "https://en.wikipedia.org/wiki/Earth",
            planetId: expect.any(String),
          },
          structure: {
            id: expect.any(String),
            content:
              "Earth's interior, like that of the other terrestrial planets, is divided into layers by their chemical or physical (rheological) properties. The outer layer is a chemically distinct silicate solid crust, which is underlain by a highly viscous solid mantle.",
            source: "https://en.wikipedia.org/wiki/Earth#Internal_structure",
            planetId: expect.any(String),
          },
        });
      },
      { timeout: 8000 }
    );
  });

  test("debe de llamarse notFoundPlanet y mostrarse el mensaje cuando el status sea 404", async () => {
    const namePlanet = "noexiste";
    const messageNotFound = `Not found this planet: ${namePlanet}`;

    const objectRouteOverview = {
      planetName: namePlanet,
      characteristicName: "overview",
    };

    mockedRoute.mockReturnValue([true, objectRouteOverview]);
    const wrapper = ({ children }: any) => (
      <PlanetContextProvider contextValue={contextValue}>
        {children}
      </PlanetContextProvider>
    );

    renderHook(() => useFetchPlanet(), { wrapper });

    await waitFor(
      () => {
        expect(contextValue.notFoundPlanet).toHaveBeenCalledWith(
          messageNotFound
        );
      },
      { timeout: 8000 }
    );
  });

  test("debe de llamarse errorPlanet y mostrarse el mensaje cuando el status sea 500", async () => {
    const namePlanet = "error/adasd";
    const messageError = "Unexpected error, please try again";

    const objectRouteOverview = {
      planetName: namePlanet,
      characteristicName: "overview",
    };

    mockedRoute.mockReturnValue([true, objectRouteOverview]);
    const wrapper = ({ children }: any) => (
      <PlanetContextProvider contextValue={contextValue}>
        {children}
      </PlanetContextProvider>
    );

    renderHook(() => useFetchPlanet(), { wrapper });

    await waitFor(
      () => {
        expect(contextValue.errorPlanet).toHaveBeenCalledWith(messageError);
      },
      { timeout: 8000 }
    );
  });

  test("debe de mostrarse la ruta por defecto del planeta Jupiter al no coincidir con un URL válido", async () => {
    const expectedPath = "/planets/jupiter/overview";

    mockedRoute.mockReturnValue([false, null]);
    const wrapper = ({ children }: any) => (
      <PlanetContextProvider contextValue={contextValue}>
        {children}
      </PlanetContextProvider>
    );

    expect(window.location.href).toBe(currentPath);

    renderHook(() => useFetchPlanet(), { wrapper });

    expect(window.location.href).toBe(expectedPath);
  });
});

import { render, screen } from "@testing-library/react";
import { PlanetMain } from "../../components";
import { PlanetContext } from "../../context/PlanetContext";
import { fixturePlanet } from "../fixture/fixturePlanet";

const mockRoute = jest.fn();

jest.mock("wouter", () => {
  const originalModule = jest.requireActual("wouter");

  return {
    ...originalModule,
    useRoute: () => mockRoute(),
  };
});

describe("Pruebas en el componente <PlanetMain />", () => {
  test("debe de renderizar correctamente los componentes internos", () => {
    const objectRouteOverview = {
      planetName: "Earth",
      characteristicName: "surface-geology",
    };
    mockRoute.mockReturnValue([true, objectRouteOverview]);

    const contextValue = {
      planetCurrent: fixturePlanet,
      loadPlanets: jest.fn(),
      isError: false,
      notFoundPlanet: jest.fn(),
      messageData: "",
      isNotFound: false,
      errorPlanet: jest.fn(),
      loading: false,
      clearStatePlanet: jest.fn(),
    };

    render(
      <PlanetContext.Provider value={contextValue}>
        <PlanetMain />
      </PlanetContext.Provider>
    );

    expect(screen.getAllByRole("button", { name: /overview/i })).toBeTruthy();
    expect(screen.getAllByRole("button", { name: /structure/i })).toBeTruthy();
    expect(screen.getAllByRole("button", { name: /geology/i })).toBeTruthy();

    expect(
      screen.getAllByRole("button", { name: /01 overview/i })
    ).toBeTruthy();
    expect(
      screen.getAllByRole("button", { name: /02 internal structure/i })
    ).toBeTruthy();
    expect(
      screen.getAllByRole("button", { name: /03 surface geology/i })
    ).toBeTruthy();

    expect(screen.getByRole("img", { name: /planet Earth/i })).toBeTruthy();
    expect(screen.getByRole("img", { name: /surface-geology/i })).toBeTruthy();
    expect(screen.getByRole("img", { name: /source/i })).toBeTruthy();

    expect(screen.getByText(fixturePlanet.name)).toBeInTheDocument();
    expect(screen.getByText(fixturePlanet.geology.content)).toBeInTheDocument();

    expect(screen.getByText(fixturePlanet.radius)).toBeInTheDocument();
    expect(screen.getByText(fixturePlanet.revolution)).toBeInTheDocument();
    expect(screen.getByText(fixturePlanet.rotation)).toBeInTheDocument();
    expect(screen.getByText(fixturePlanet.temperature)).toBeInTheDocument();
  });

  // Usando useRoute como un jest.Mock

  // test('debe de renderizarse correctamente importando el useRoute', () => {

  //   jest.mock('wouter', () => {
  //     const originalModule =
  //       jest.requireActual<typeof import('wouter')>('wouter');

  //     return {
  //       ...originalModule,
  //       useRoute: jest.fn(),
  //     };
  //   });

  //   const objectRouteOverview = {
  //     planetName: "Earth",
  //     characteristicName: "overview"
  //   };

  //   (useRoute as jest.Mock).mockReturnValue([true, objectRouteOverview])

  //   const contextValue = {
  //     planetCurrent: fixturePlanet,
  //     loadPlanets: jest.fn(),
  //     isError: false,
  //     notFoundPlanet: jest.fn(),
  //     messageData: '',
  //     isNotFound: false,
  //     errorPlanet: jest.fn(),
  //     loading: false,
  //     clearStatePlanet: jest.fn(),
  //   }

  //   render(
  //     <PlanetContext.Provider value={contextValue}>
  //       <PlanetMain />
  //     </PlanetContext.Provider>
  //   )

  //   screen.debug()

  // })
});

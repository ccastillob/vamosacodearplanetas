import { render, screen } from "@testing-library/react";
import { useRoute } from "wouter";
import { PlanetImage } from "../../components/PlanetImage";
import { usePlanet } from "../../hooks";
import { fixturePlanet } from "../fixture/fixturePlanet";

jest.mock("../../hooks");
jest.mock("wouter");
const mockedRoute = jest.mocked(useRoute);
const mockedPlanet = jest.mocked(usePlanet);

describe("Pruebas en el componente <PlanetImage />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe de mostrar la imagen del planeta y solo debe haber un solo img", () => {
    const objectRouteOverview = {
      planetName: "Earth",
      characteristicName: "overview",
    };

    mockedPlanet.mockReturnValue({
      planetCurrent: fixturePlanet,
      loading: false,
      isError: false,
      messageData: "",
      clearStatePlanet: jest.fn(),
      loadPlanets: jest.fn(),
      errorPlanet: jest.fn(),
      isNotFound: false,
      notFoundPlanet: jest.fn(),
    });
    mockedRoute.mockReturnValue([true, objectRouteOverview]);
    render(<PlanetImage />);

    const elementImageOverview: HTMLImageElement = screen.getByRole("img", {
      name: /earth/i,
    });

    expect(elementImageOverview).toBeTruthy();
    expect(elementImageOverview.src).toContain("planet-earth");
    expect(screen.getAllByRole("img").length).toBe(1);
  });

  test("debe de mostrar la imagen del planeta y debe haber dos img", () => {
    const objectRouteSurfaceGeology = {
      planetName: "Earth",
      characteristicName: "surface-geology",
    };

    mockedPlanet.mockReturnValue({
      planetCurrent: fixturePlanet,
      loading: false,
      isError: false,
      messageData: "",
      clearStatePlanet: jest.fn(),
      loadPlanets: jest.fn(),
      errorPlanet: jest.fn(),
      isNotFound: false,
      notFoundPlanet: jest.fn(),
    });
    mockedRoute.mockReturnValue([true, objectRouteSurfaceGeology]);
    render(<PlanetImage />);

    const elementImageOverview: HTMLImageElement = screen.getByRole("img", {
      name: /earth/i,
    });
    const elementImageSurfaceGeology: HTMLImageElement = screen.getByRole(
      "img",
      { name: /surface-geology/i }
    );

    expect(elementImageOverview).toBeTruthy();
    expect(elementImageOverview.src).toContain("planet-earth");
    expect(elementImageSurfaceGeology).toBeTruthy();
    expect(elementImageSurfaceGeology.src).toContain("geology-earth");
    expect(screen.getAllByRole("img").length).toBe(2);
  });
});

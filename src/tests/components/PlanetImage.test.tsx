import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { useRoute } from "wouter";
import { PlanetImage } from "../../components/PlanetImage";
import { usePlanet } from "../../hooks";
import { fixturePlanet } from "../fixture/fixturePlanet";

vi.mock("../../hooks");
vi.mock("wouter");
const mockedRoute = vi.mocked(useRoute);
const mockedPlanet = vi.mocked(usePlanet);

describe("Pruebas en el componente <PlanetImage />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("debe de mostrar la imagen del planeta y solo debe tener un solo elemento img", () => {
    const objectRouteOverview = {
      planetName: "Earth",
      characteristicName: "overview",
    };

    mockedPlanet.mockReturnValue({
      planetCurrent: fixturePlanet,
      loading: false,
      isError: false,
      messageData: "",
      clearStatePlanet: vi.fn(),
      loadPlanets: vi.fn(),
      errorPlanet: vi.fn(),
      isNotFound: false,
      notFoundPlanet: vi.fn(),
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

  test("debe de mostrar la imagen del planeta y debe tener dos elementos img", () => {
    const objectRouteSurfaceGeology = {
      planetName: "Earth",
      characteristicName: "surface-geology",
    };

    mockedPlanet.mockReturnValue({
      planetCurrent: fixturePlanet,
      loading: false,
      isError: false,
      messageData: "",
      clearStatePlanet: vi.fn(),
      loadPlanets: vi.fn(),
      errorPlanet: vi.fn(),
      isNotFound: false,
      notFoundPlanet: vi.fn(),
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

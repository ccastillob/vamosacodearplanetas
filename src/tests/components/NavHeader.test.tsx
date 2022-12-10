import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { NavHeader } from "../../components";
import { usePlanet } from "../../hooks";
import { fixturePlanet } from "../fixture/fixturePlanet";

vi.mock("../../hooks");
const mockedPlanet = vi.mocked(usePlanet);

describe("Pruebas en el componente <NavHeader />", () => {
  const listPlanetNames = [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
  ];

  beforeEach(() => {
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
  });

  test("debe de mostrarse los nombres de los planetas", () => {
    render(<NavHeader />);

    expect(screen.getByText(listPlanetNames[0])).toBeInTheDocument();
    expect(screen.getByText(listPlanetNames[1])).toBeInTheDocument();
    expect(screen.getByText(listPlanetNames[2])).toBeInTheDocument();
    expect(screen.getByText(listPlanetNames[3])).toBeInTheDocument();
    expect(screen.getByText(listPlanetNames[4])).toBeInTheDocument();
    expect(screen.getByText(listPlanetNames[5])).toBeInTheDocument();
    expect(screen.getByText(listPlanetNames[6])).toBeInTheDocument();
    expect(screen.getByText(listPlanetNames[7])).toBeInTheDocument();
  });

  test("debe de tener un border del planeta seleccionado", () => {
    render(<NavHeader />);

    expect(
      screen.getAllByRole("listitem").at(2)?.getAttribute("class")
    ).toContain(`border-${listPlanetNames[2]}`);
  });
});

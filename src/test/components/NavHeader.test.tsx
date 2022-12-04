import { render, screen } from "@testing-library/react";
import { NavHeader } from "../../components";
import { usePlanet } from "../../hooks";
import { fixturePlanet } from "../fixture/fixturePlanet";

jest.mock("../../hooks");
const mockedPlanet = jest.mocked(usePlanet);

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
      clearStatePlanet: jest.fn(),
      loadPlanets: jest.fn(),
      errorPlanet: jest.fn(),
      isNotFound: false,
      notFoundPlanet: jest.fn(),
    });
  });

  test("debe de mostrarse los nombres de los planetas", () => {
    render(<NavHeader />);

    expect(screen.getByText(listPlanetNames[0])).toBeInTheDocument();
  });

  test("debe de tener un border del planeta seleccionado", () => {
    render(<NavHeader />);

    expect(
      screen.getAllByRole("listitem").at(2)?.getAttribute("class")
    ).toContain(`border-${listPlanetNames[2]}`);
  });
});

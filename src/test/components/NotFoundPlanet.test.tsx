import { render, screen, fireEvent } from "@testing-library/react";
import { useLocation } from "wouter";
import { NotFoundPlanet } from "../../components";

jest.mock("wouter");
const navigateMock = jest.fn();
const mockedLocation = jest.mocked(useLocation);

describe("Pruebas en el componente <NotFoundPlanet />", () => {
  beforeEach(() => {
    mockedLocation.mockReturnValue(["/", navigateMock]);
  });

  test("debe de mostrarse el mensaje, un botón y la imagen del planeta (planet-notfound)", () => {
    const errorMessage = "Planeta no encontrado";
    const buttonText = "Return to home";

    render(<NotFoundPlanet message={errorMessage} />);

    const textError: HTMLHeadingElement = screen.getByText(errorMessage);
    const imagePlanetError: HTMLImageElement = screen.getByRole("img");
    const buttonPlanetError = screen.getByText(buttonText);

    expect(textError).toBeTruthy();
    expect(buttonPlanetError).toBeTruthy();
    expect(imagePlanetError.src).toContain("planet-notfound");
  });

  test("debe de redigirse al planeta Tierra al dar click en el botón", () => {
    const errorMessage = "Planeta no encontrado";
    const buttonText = "Return to home";

    render(<NotFoundPlanet message={errorMessage} />);

    const buttonPlanetError = screen.getByText(buttonText);

    fireEvent.click(buttonPlanetError);

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith("/planets/earth/overview");
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { ErrorPage } from "../../components";

vi.mock("wouter");
describe("Pruebas en el componente <ErrorPage />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("debe de mostrarse el mensaje, un botón y la imagen del planeta (planet-error)", () => {
    const errorMessage = "Ocurrio un error";
    const buttonText = "Try again";

    render(<ErrorPage message={errorMessage} />);

    const textError: HTMLHeadingElement = screen.getByText(errorMessage);
    const imagePlanetError: HTMLImageElement = screen.getByRole("img");
    const buttonPlanetError = screen.getByText(buttonText);

    expect(textError).toBeTruthy();
    expect(buttonPlanetError).toBeTruthy();
    expect(imagePlanetError.src).toContain("planet-error");
  });

  test("debe de mostrarse la ruta por defecto del planeta Jupiter al dar click en el botón", () => {
    const currentPath = "/planets/earth/overview";
    const expectedPath = "/planets/jupiter/overview";

    delete (window as any).location;
    window.location = { href: currentPath } as any as Location;

    Object.defineProperty(window.location, "href", {
      configurable: true,
    });

    const errorMessage = "Ocurrio un error";
    const buttonText = "Try again";

    render(<ErrorPage message={errorMessage} />);

    const buttonPlanetError = screen.getByText(buttonText);

    expect(window.location.href).toBe(currentPath);

    fireEvent.click(buttonPlanetError);

    expect(window.location.href).toBe(expectedPath);
  });
});

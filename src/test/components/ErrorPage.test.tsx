import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorPage } from "../../components";

jest.mock("wouter");
describe("Pruebas en el componente <ErrorPage />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  // Usando href

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

  // Usando useLocation

  // test('debe de llamar el navigate con la ruta del useLocation', () => {

  //   // const [, navigate] = useLocation();
  //   // navigate("/planets/jupiter/overview", {replace: true});

  //   // jest.mock('wouter');
  //   const navigateMock = jest.fn();
  //   const mockedLocation = jest.mocked(useLocation);

  //   mockedLocation.mockReturnValue(['/', navigateMock]);

  //   const errorMessage = 'Ocurrio un error';
  //   const buttonText = 'Try again';

  //   render(<ErrorPage message={errorMessage} />);

  //   const buttonPlanetError = screen.getByText(buttonText);

  //   fireEvent.click(buttonPlanetError);

  //   expect(navigateMock).toHaveBeenCalledTimes(1);
  //   expect(navigateMock).toHaveBeenCalledWith("/planets/jupiter/overview", {replace: true})
  // });

  // Usando assign

  // test('debe de llamar el window con assign', () => {

  //   // window.location.assign('/planets/jupiter/overview')

  //   const navigationWindow = jest.fn()

  //   delete (window as any).location
  // 	window.location = { assign: navigationWindow } as any as Location

  //   const errorMessage = 'Ocurrio un error';
  //   const buttonText = 'Try again';

  //   render(<ErrorPage message={errorMessage} />);

  //   const buttonPlanetError = screen.getByText(buttonText);

  //   fireEvent.click(buttonPlanetError);

  //   expect(navigationWindow).toHaveBeenCalledTimes(1);
  //   expect(navigationWindow).toHaveBeenCalledWith('/planets/jupiter/overview')

  // });
});

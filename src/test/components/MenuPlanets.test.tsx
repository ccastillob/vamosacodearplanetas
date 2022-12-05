import { fireEvent, render, screen } from "@testing-library/react";
import { MenuPlanets } from "../../components";

describe("Pruebas en el componente <MenuPlanets />", () => {
  test("debe de mostrarse el titulo del logo, la imagen debe contener icon-hamburger-close y el nav debe tener la clase mt-[-547px]", () => {
    const title = "the planets";
    const imageClose = "icon-hamburger-close";
    const navClassName = "mt-[-547px]";

    render(<MenuPlanets />);
    const getTitle = screen.getByText(title);
    const getImage: HTMLImageElement = screen.getByRole("img", {
      name: /icono de menú/i,
    });
    const getNav: HTMLElement = screen.getByRole("navigation");

    expect(getTitle).toBeInTheDocument();
    expect(getImage.src).toContain(imageClose);
    expect(getNav.className).toContain(navClassName);
  });

  test("debe contener icon-hamburger-open al hacer click en la imagen y el nav no debe tener la clase mt-[-547px]", () => {
    const imageOpen = "icon-hamburger-open";
    const navClassName = "mt-[-547px]";

    render(<MenuPlanets />);
    const getImage: HTMLImageElement = screen.getByRole("img", {
      name: /icono de menú/i,
    });
    const getNav: HTMLElement = screen.getByRole("navigation");

    fireEvent.click(getImage);
    expect(getImage.src).toContain(imageOpen);
    expect(getNav.className).not.toContain(navClassName);
  });
});

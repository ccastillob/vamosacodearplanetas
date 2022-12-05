import { fireEvent, render, screen } from "@testing-library/react";
import { NavBarButtons } from "../../components";

describe("Pruebas en el componente <NavBarButtons />", () => {
  test("debe de llamarse el hiddenMenu al hacer click en el elemento", () => {
    const hiddenMenu = jest.fn();
    const namePlanet = "earth";

    render(<NavBarButtons className="flex" hiddenMenu={hiddenMenu} />);

    const itemSelected = screen.getByText(namePlanet);
    fireEvent.click(itemSelected);

    expect(hiddenMenu).toHaveBeenCalledTimes(1);
  });

  test("debe mostrase la clase que le pasamos por props", () => {
    const hiddenMenu = jest.fn();
    const navClassName = "flex flex-auto";

    render(<NavBarButtons className={navClassName} hiddenMenu={hiddenMenu} />);

    const navSelected: HTMLElement = screen.getByRole("navigation");

    expect(navSelected.className).toBe(navClassName);
  });
});

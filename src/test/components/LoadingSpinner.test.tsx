import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "../../components/LoadingSpinner";

describe("Pruebas en el componente <LoadingSpinner />", () => {
  test('debe de mostrar el src de la imagen y el texto "Loading..." correctamente', () => {
    const text = "Loading...";
    const srcImagen = "/assets/planet.png";

    render(<LoadingSpinner />);
    expect(screen.getByRole("img").getAttribute("src")).toEqual(srcImagen);
    expect(screen.getByRole("heading").textContent).toEqual(text);
  });
});

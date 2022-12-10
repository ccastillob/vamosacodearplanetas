import { render, screen } from "@testing-library/react";
import { ImageIcon } from "../../components";

describe("Pruebas en el componente <ImageIcon />", () => {
  test("debe de mostrarse el elemento img al pasar su ruta, texto alternativo y clase correctamente", () => {
    const dataImage = {
      src: "/assets/icon-source.svg",
      className: "ml-1 w-3 h-3",
      altImage: "source",
    };
    const { altImage, className, src } = dataImage;

    render(<ImageIcon altImage={altImage} className={className} src={src} />);

    const elementImage: HTMLImageElement = screen.getByRole("img");

    expect(elementImage).toBeTruthy();
    expect(elementImage.src).toContain(src);
    expect(elementImage.alt).toEqual(altImage);
    expect(elementImage.className).toEqual(className);
  });

  test("debe de retornar una clase y texto alternativo vacio al no pasarlo en el componente", () => {
    const dataImage = {
      src: "/assets/icon-source.svg",
    };
    const { src } = dataImage;

    render(<ImageIcon src={src} />);

    const elementImage: HTMLImageElement = screen.getByRole("img");

    expect(elementImage).toBeTruthy();
    expect(elementImage.src).toContain(src);
    expect(elementImage.alt).toEqual("");
    expect(elementImage.className).toEqual("");
  });
});

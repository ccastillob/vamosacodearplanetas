import { render, screen } from "@testing-library/react";
import { ImageIcon, ImageIconProps } from "../../components";

describe("Pruebas en el componente <ImageIcon />", () => {
  test("debe de mostrar mostrarse el elemento img", () => {
    const dataImage: ImageIconProps = {
      src: "/assets/icon-source.svg",
      className: "ml-1 w-3 h-3",
      altImage: "source",
      eventClick: undefined,
    };
    const { altImage, className, src } = dataImage;

    render(<ImageIcon altImage={altImage} className={className} src={src} />);

    const elementImage: HTMLImageElement = screen.getByRole("img");

    expect(elementImage).toBeTruthy();
    expect(elementImage.src).toContain(src);
    expect(elementImage.alt).toEqual(altImage);
    expect(elementImage.className).toEqual(className);
  });
});

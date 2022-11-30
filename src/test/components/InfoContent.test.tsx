import { render, screen } from "@testing-library/react";
import { InfoContent, InfoContentProps } from "../../components/InfoContent";

describe("Pruebas en el componente <InfoContent />", () => {
  test("debe de mostrar el nombre y la info del planeta correctamente", () => {
    const dataInfo: InfoContentProps = {
      namePlanet: "Earth",
      dataCharacteristic: {
        content: "Esto es una descripción del planeta",
        source: "https://wikipedia.com/",
      },
    };
    const { namePlanet, dataCharacteristic } = dataInfo;

    render(
      <InfoContent
        namePlanet={namePlanet}
        dataCharacteristic={dataCharacteristic}
      />
    );

    const elementHeading: HTMLHeadingElement = screen.getByRole("heading");
    const elementLink: HTMLAnchorElement = screen.getByRole("link");

    expect(elementHeading.textContent).toContain(namePlanet);
    expect(screen.getByText(dataCharacteristic.content)).toBeTruthy();
    expect(elementLink.href).toEqual(dataCharacteristic.source);
  });
});

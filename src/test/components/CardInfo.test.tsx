import { render, screen } from "@testing-library/react";
import { CardInfo, CardProps } from "../../components/CardInfo";

describe("Pruebas en componente <CardInfo />", () => {
  test("debe de mostrarse el titulo y su valor correctamente", () => {
    const dataInfo: CardProps = {
      title: "ROTATION TIME",
      value: "604",
    };
    const { title, value } = dataInfo;
    render(<CardInfo title={title} value={value} />);
    expect(screen.getByText(title).textContent).toEqual(title);
    value && expect(screen.getByText(value)).toBeTruthy();
  });
});

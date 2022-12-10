import { render, screen } from "@testing-library/react";
import { CardInfo } from "../../components/CardInfo";

describe("Pruebas en componente <CardInfo />", () => {
  test("debe de mostrarse el título y su valor correctamente cuando se le pase información", () => {
    const dataInfo = {
      title: "ROTATION TIME",
      value: "604",
    };
    const { title, value } = dataInfo;

    render(<CardInfo title={title} value={value} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });
});

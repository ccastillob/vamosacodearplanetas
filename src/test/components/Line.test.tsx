import { render, screen } from "@testing-library/react";
import { Line, LineProps } from "../../components";

describe("Pruebas en el componente <Line />", () => {
  test("debe de mostrar la clase que se le envie por parametro", () => {
    const dataLine: LineProps = {
      className: "last:hidden",
    };
    const { className } = dataLine;
    render(<Line className={className} />);
    expect(
      screen.getByTestId("line-component").getAttribute("class")
    ).toContain(className);
  });

  test("debe de tener una clase vacia si no se le pasa parametro al className", () => {
    render(<Line />);
    expect(
      screen.getByTestId("line-component").getAttribute("class")
    ).toContain("");
  });
});

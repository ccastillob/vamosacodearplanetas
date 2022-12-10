import { render, screen } from "@testing-library/react";
import { Button } from "../../components";

describe("Pruebas en componente <Button />", () => {
  test("debe de mostrar el título correctamente", () => {
    const dataButton = {
      title: "overview",
      name: "Earth",
      characteristicName: "overview",
      index: 0,
    };
    const { title, characteristicName, index, name } = dataButton;

    render(
      <Button
        title={title}
        characteristicName={characteristicName}
        index={index}
        name={name}
      />
    );
    expect(screen.getByText(title)).toBeTruthy();
  });

  test("debe de mostrar el hover darkGray cuando el title y characteristicName son diferentes", () => {
    const dataButtonDiff = {
      title: "internal-structure",
      name: "Earth",
      characteristicName: "overview",
      index: 0,
    };
    const { title, characteristicName, index, name } = dataButtonDiff;

    render(
      <Button
        title={title}
        characteristicName={characteristicName}
        index={index}
        name={name}
      />
    );
    expect(screen.getByRole("button").className).toContain(
      "hover:bg-darkGray/20"
    );
  });
});

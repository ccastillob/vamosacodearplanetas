import { renderHook } from "@testing-library/react";
import { usePlanet } from "../../hooks";

const mockContext = jest.fn();

jest.mock("react", () => {
  const originalModule = jest.requireActual("react");

  return {
    ...originalModule,
    useContext: () => mockContext(),
  };
});

describe("Pruebas en el custom hook usePlanet", () => {
  const realError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = realError;
  });

  test("debe de regresar un error cuando no existe el contexto", () => {
    const messageError = "usePlanet must be used within a PlanetProvider";
    mockContext.mockReturnValueOnce(undefined);
    const result = () => renderHook(() => usePlanet());

    expect(result).toThrow(messageError);
  });
});

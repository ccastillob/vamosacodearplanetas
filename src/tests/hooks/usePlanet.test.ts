import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { usePlanet } from "../../hooks";

const mockContext = vi.fn();

vi.mock("react", async () => {
  const originalModule = await vi.importActual("react");

  return {
    ...(originalModule as Record<string, unknown>),
    useContext: () => mockContext(),
  };
});

describe("Pruebas en el custom hook usePlanet", () => {
  const realError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
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

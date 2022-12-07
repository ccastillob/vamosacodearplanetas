import { act, renderHook } from "@testing-library/react";
import { useMenu } from "../../hooks";

describe("Pruebas en el custom hook useMenu", () => {
  test("debe de regresar el valor por defecto", () => {
    const { result } = renderHook(() => useMenu());

    expect(result.current).toEqual({
      showMenu: false,
      toggleMenu: expect.any(Function),
      hiddenMenu: expect.any(Function),
    });
  });

  test("debe de realizar el toggle del Menu", () => {
    const { result } = renderHook(() => useMenu());
    const { toggleMenu } = result.current;

    act(() => {
      toggleMenu();
    });

    expect(result.current.showMenu).toBe(true);
  });

  test("debe de realizar el hidden del Menu", () => {
    const { result } = renderHook(() => useMenu());
    const { toggleMenu, hiddenMenu } = result.current;

    act(() => {
      toggleMenu();
      hiddenMenu();
    });

    expect(result.current.showMenu).toBe(false);
  });
});

import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useFetchPlanet } from "../../hooks";
import { fixturePlanet } from "../fixture/fixturePlanet";

const mockContext = vi.fn();
const mockRoute = vi.fn();
const mockGetPlanet = vi.fn();

vi.mock("../../service/planet", () => ({
  getPlanet: () => mockGetPlanet(),
}));

vi.mock("wouter", async () => {
  const originalModule = await vi.importActual("wouter");

  return {
    ...(originalModule as Record<string, unknown>),
    useRoute: () => mockRoute(),
  };
});

vi.mock("react", async () => {
  const originalModule = await vi.importActual("react");

  return {
    ...(originalModule as Record<string, unknown>),
    useContext: () => mockContext(),
  };
});

const currentPath = "/planets/earth/overview";

delete (window as any).location;
window.location = { href: currentPath } as any as Location;

Object.defineProperty(window.location, "href", {
  configurable: true,
});

describe("Pruebas en el custom hook useFetchPlanet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("debe de llamarse clearStatePlanet y traer la data el loadPlanets cuando el status sea 200", async () => {
    const namePlanet = "earth";

    const contextValue = {
      planetCurrent: {},
      loadPlanets: vi.fn(),
      isError: false,
      notFoundPlanet: vi.fn(),
      messageData: "",
      isNotFound: false,
      errorPlanet: vi.fn(),
      loading: false,
      clearStatePlanet: vi.fn(),
    };

    const objectRouteOverview = {
      planetName: namePlanet,
      characteristicName: "overview",
    };

    mockRoute.mockReturnValue([true, objectRouteOverview]);
    mockGetPlanet.mockResolvedValue({
      data: fixturePlanet,
      status: 200,
    });
    mockContext.mockReturnValue(contextValue);

    renderHook(() => useFetchPlanet());

    await waitFor(
      () => {
        expect(contextValue.clearStatePlanet).toHaveBeenCalledTimes(1);
        expect(contextValue.loadPlanets).toHaveBeenCalledTimes(1);
        expect(contextValue.loadPlanets).toHaveBeenCalledWith(fixturePlanet);
      },
      { timeout: 8000 }
    );
  });

  test("debe de llamarse notFoundPlanet y traer su mensaje cuando el status sea 404", async () => {
    const namePlanet = "noexiste";
    const msgNotFoundPlanet = "No se encontro el planeta";

    const contextValue = {
      planetCurrent: {},
      loadPlanets: vi.fn(),
      isError: false,
      notFoundPlanet: vi.fn(),
      messageData: "",
      isNotFound: false,
      errorPlanet: vi.fn(),
      loading: false,
      clearStatePlanet: vi.fn(),
    };

    const objectRouteOverview = {
      planetName: namePlanet,
      characteristicName: "overview",
    };

    mockRoute.mockReturnValue([true, objectRouteOverview]);
    mockGetPlanet.mockResolvedValue({
      msg: msgNotFoundPlanet,
      status: 404,
    });
    mockContext.mockReturnValue(contextValue);

    renderHook(() => useFetchPlanet());

    await waitFor(
      () => {
        expect(contextValue.notFoundPlanet).toHaveBeenCalledTimes(1);
        expect(contextValue.notFoundPlanet).toHaveBeenCalledWith(
          msgNotFoundPlanet
        );
      },
      { timeout: 8000 }
    );
  });

  test("debe de llamarse errorPlanet y traer su mensaje cuando el status sea 500", async () => {
    const namePlanet = "earth";
    const msgErrorPage = "Ocurrio un error inesperado";

    const contextValue = {
      planetCurrent: {},
      loadPlanets: vi.fn(),
      isError: false,
      notFoundPlanet: vi.fn(),
      messageData: "",
      isNotFound: false,
      errorPlanet: vi.fn(),
      loading: false,
      clearStatePlanet: vi.fn(),
    };

    const objectRouteOverview = {
      planetName: namePlanet,
      characteristicName: "overview",
    };

    mockRoute.mockReturnValue([true, objectRouteOverview]);
    mockGetPlanet.mockResolvedValue({
      msg: msgErrorPage,
      status: 500,
    });
    mockContext.mockReturnValue(contextValue);

    renderHook(() => useFetchPlanet());

    await waitFor(
      () => {
        expect(contextValue.errorPlanet).toHaveBeenCalledTimes(1);
        expect(contextValue.errorPlanet).toHaveBeenCalledWith(msgErrorPage);
      },
      { timeout: 8000 }
    );
  });

  test("debe de mostrarse la ruta por defecto del planeta Jupiter al no coincidir con un URL válido", async () => {
    const expectedPath = "/planets/jupiter/overview";
    const contextValue = {
      planetCurrent: {},
      loadPlanets: vi.fn(),
      isError: false,
      notFoundPlanet: vi.fn(),
      messageData: "",
      isNotFound: false,
      errorPlanet: vi.fn(),
      loading: false,
      clearStatePlanet: vi.fn(),
    };

    mockRoute.mockReturnValue([false, null]);
    mockContext.mockReturnValue(contextValue);
    expect(window.location.href).toBe(currentPath);

    renderHook(() => useFetchPlanet());

    expect(window.location.href).toBe(expectedPath);
  });
});

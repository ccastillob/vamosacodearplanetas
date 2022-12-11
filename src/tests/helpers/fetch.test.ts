import { responsePlanet } from "@planet/types";
import { vi } from "vitest";
import { fetchData } from "../../helpers/fetch";
import { fixturePlanet } from "../fixture/fixturePlanet";

describe("Pruebas en la función fetchData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("debe retornar la data y el status cuando exista un planeta", async () => {
    const namePlanet = "earth";
    const responseData = fixturePlanet;
    const statusData = 200;
    const responseFetch = {
      json: async () => await Promise.resolve(responseData),
      status: statusData,
    };

    globalThis.fetch = vi.fn(
      async () => await Promise.resolve(responseFetch)
    ) as jest.Mock;

    const response = (await fetchData(namePlanet)) as responsePlanet;
    const { status, data } = response;

    expect(status).toBe(statusData);
    expect(data).toBe(responseData);
  });

  test("debe retornar el mensaje y el status cuando no exista un planeta", async () => {
    const namePlanet = "noexiste";
    const messageData = `Not found planet ${namePlanet}`;
    const statusData = 404;
    const responseFetch = {
      json: async () => await Promise.resolve(messageData),
      status: statusData,
    };

    globalThis.fetch = vi.fn(
      async () => await Promise.resolve(responseFetch)
    ) as jest.Mock;

    const response = (await fetchData(namePlanet)) as responsePlanet;
    const { status, msg } = response;

    expect(status).toBe(statusData);
    expect(msg).toBe(messageData);
  });

  test("debe retornar el mensaje de error cuando ocurre un problema con el servidor", async () => {
    const namePlanet = "earth";
    const messageErrorData = `Unexpected error, please try again`;

    globalThis.fetch = vi.fn(
      async () => await Promise.reject(new Error(messageErrorData))
    ) as jest.Mock;

    const response = (await fetchData(namePlanet)) as Error;

    expect(response.message).toBe(messageErrorData);
  });
});

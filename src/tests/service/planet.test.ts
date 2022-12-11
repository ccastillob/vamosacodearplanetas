import { vi } from "vitest";
import { fetchData } from "../../helpers/fetch";
import { getPlanet } from "../../service/planet";
import { fixturePlanet } from "../fixture/fixturePlanet";

vi.mock("../../helpers/fetch");

const mockedfetchData = vi.mocked(fetchData);

describe("Pruebas en service planet", () => {
  test("debe de responder getPlanet con un status 200 al ingresar un planeta correcto", async () => {
    mockedfetchData.mockResolvedValue({
      data: fixturePlanet,
      status: 200,
    });

    const responseService = await getPlanet(fixturePlanet.name);
    const { status, data, msg } = responseService;

    expect(status).toBe(200);
    expect(data?.name).toBe(fixturePlanet.name);
    expect(msg).toBeUndefined();
  });

  test("debe de responder getPlanet con un status 404 al ingresar un planeta incorrecto", async () => {
    const planetName = "cualquiercosa";
    const notFoundMessage = `Not found this planet: ${planetName}`;

    mockedfetchData.mockResolvedValue({
      msg: notFoundMessage,
      status: 404,
    });

    const responseService = await getPlanet(planetName);
    const { status, data, msg } = responseService;

    expect(status).toBe(404);
    expect(data).toBeUndefined();
    expect(msg).toBe(notFoundMessage);
  });

  test("debe de responder getPlanet con un status 500 cuando existe un error interno en la API", async () => {
    const planetName = "Earth";
    const errorMessage = "Ocurrio un error inesperado, intentelo de nuevo";

    mockedfetchData.mockResolvedValue(new Error(errorMessage));

    const responseService = await getPlanet(planetName);
    const { status, data, msg } = responseService;

    expect(status).toBe(500);
    expect(data).toBeUndefined();
    expect(msg).toBe(errorMessage);
  });
});

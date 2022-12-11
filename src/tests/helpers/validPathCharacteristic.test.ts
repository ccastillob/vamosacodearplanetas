import { isValidPathCharacteristic } from "../../helpers/validPathCharacteristic";

describe("Pruebas en la función validPathCharacteristic", () => {
  test("debe de retornar true cuando no se le pase un path", () => {
    const path = null;
    const isValidPath = isValidPathCharacteristic(path);

    expect(isValidPath).toBe(true);
  });

  test("debe de retornar false cuando el characteristicName no se encuentre", () => {
    const path = {
      characteristicName: "noencontrado",
    };
    const isValidPath = isValidPathCharacteristic(path);

    expect(isValidPath).toBe(false);
  });
});

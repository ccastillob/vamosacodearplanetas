require("isomorphic-fetch");
require("dotenv").config({
  path: ".env.test.local",
});

jest.mock("./src/helpers/getEnvironments", () => ({
  getEnvironments: () => ({ ...process.env }),
}));

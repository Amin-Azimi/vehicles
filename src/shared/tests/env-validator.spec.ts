/* eslint-disable @typescript-eslint/ban-ts-comment */
import { envDtoValidator } from "../env-validator";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

jest.mock("class-validator", () => ({
  ...jest.requireActual("class-validator"),
  validateSync: jest.fn(),
}));
const mockErrors = [
  {
    constraints: "constraints",
    value: "value",
  },
];

describe("envDtoValidator", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should validate config and return validated object if no errors", () => {
    // Arrange
    //@ts-expect-error
    plainToInstance = jest.fn().mockReturnValue("plainToInstance");
    //@ts-ignore
    validateSync.mockReturnValue([]);

    // Act
    //@ts-ignore
    const result = envDtoValidator({})("config");

    // Assert
    expect(plainToInstance).toHaveBeenCalledWith({}, "config", {
      enableImplicitConversion: true,
    });
    expect(validateSync).toHaveBeenCalledWith("plainToInstance", {
      skipMissingProperties: false,
    });
    expect(result).toBe("plainToInstance");
  });

  it("should log errors and exit process if validation fails", () => {
    // Arrange
    console.log = jest.fn();
    //@ts-ignore
    plainToInstance = jest.fn();
    //@ts-ignore
    validateSync.mockReturnValue(mockErrors);

    jest.spyOn(process, "exit").mockImplementation();

    // Act
    //@ts-ignore
    envDtoValidator({})("config");

    // Assert
    expect(console.log).toHaveBeenNthCalledWith(
      1,
      "env variables validation failed:",
      mockErrors
    );
    expect(console.log).toHaveBeenNthCalledWith(2, "notified");
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});

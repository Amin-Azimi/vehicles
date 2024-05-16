import { Test, TestingModule } from "@nestjs/testing";
import { VehiclesService } from "../vehicles.service";
import { VehiclesController } from "../vehicles.controller";
import { mockStateLog, mockTimestamp, mockVehicle } from "./stubs";

describe("VehiclesService", () => {
  let service: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesController,
        {
          provide: VehiclesService,
          useValue: {
            findVehicleStateAtTimestamp: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findVehicleStateAtTimestamp", () => {
    it("should return vehicle state at timestamp", async () => {
      // Arrange
      const vehicleState = {
        vehicleId: mockVehicle.id,
        state: mockStateLog.state,
        timestamp: mockStateLog.timestamp,
      };
      jest
        .spyOn(service, "findVehicleStateAtTimestamp")
        .mockResolvedValue(vehicleState);

      // Act
      const result = await service.findVehicleStateAtTimestamp(
        mockVehicle.id,
        mockTimestamp
      );

      // Assert
      expect(result).toEqual({
        vehicleId: mockVehicle.id,
        state: mockStateLog.state,
        timestamp: mockStateLog.timestamp,
      });
    });
  });
});

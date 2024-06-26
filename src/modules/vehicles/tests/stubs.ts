import { StateLog } from 'src/modules/state-logs/state-log.entity';
import { Vehicle } from '../vehicle.entity';

export const mockVehicle = { id: 1,make:'BMW',model:'X1',state:'quoted' } as Vehicle;
export const mockTimestamp = '2022-09-11 10:00:00';
export const mockStateLog = { state: 'selling', mockTimestamp, vehicleId: mockVehicle.id } as unknown as StateLog;

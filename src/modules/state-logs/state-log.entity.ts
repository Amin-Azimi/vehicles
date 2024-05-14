// stateLog.entity.ts
import { Vehicle } from '../vehicles/vehicle.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'stateLogs' })
export class StateLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleId: number;

  @Column()
  state: string;

  @Column({ type: 'timestamp with time zone' })
  timestamp: Date;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;
}

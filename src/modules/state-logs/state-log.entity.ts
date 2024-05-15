import { Vehicle } from '../vehicles/vehicle.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index } from 'typeorm';

@Entity({ name: 'stateLogs' })
export class StateLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleId: number;

  @Column()
  state: string;

  @Column({ type: 'timestamp with time zone' })
  @Index()
  timestamp: Date;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;
}

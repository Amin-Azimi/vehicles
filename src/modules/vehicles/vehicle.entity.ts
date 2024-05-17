import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  make: string;

  @Column({ type: 'text', nullable: false })
  model: string;

  @Column({ type: 'text', nullable: false })
  state: string;
}

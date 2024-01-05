import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column({ default: 0 })
  numberOfProducts: number;

  @Column({ default: 0 })
  numberOfUsers: number;

  @Column({ default: 0 })
  percentage: number;

  @Column({ nullable: true })
  companyLogo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

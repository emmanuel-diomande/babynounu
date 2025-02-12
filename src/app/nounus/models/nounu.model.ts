import { Medias } from 'src/app/media/models/media.model';
import { Preference } from 'src/app/Preference/models/preference.model';
import { User } from 'src/app/user/user.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Nounus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  age: string;

  @Column()
  phone: string;

  @Column()
  annees_experience: string;

  @Column()
  tarif_horaire: string;

  @Column()
  tarif_mensuel: string;

  @Column({ type: 'boolean', default: false })
  flexibilite_tarifaire: boolean;

  @Column({ type: 'boolean', default: false })
  urgences: boolean;

  @Column({ type: 'text' })
  evaluation_precedentes: string;

  @Column({ type: 'text' })
  references: string;

  @Column({ type: 'text' })
  courte_biographie: string;

  @OneToMany(() => Preference, (preference) => preference.nounus, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  preferences: Preference[];

  @ManyToOne(() => User, (user) => user.nounu, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}

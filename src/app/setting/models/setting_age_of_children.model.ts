import { NounuSettings } from 'src/app/nounu/models/nounu_setting.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class settingAgeOfChildren {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true, nullable: true })
  slug: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  name: string;

  @OneToMany(() => ParentSettings, (SU) => SU.age_of_children, { cascade: true})
  parent: ParentSettings

  @OneToMany(() => NounuSettings, (NS) => NS.certification, { cascade: true})
  nounu: NounuSettings

}

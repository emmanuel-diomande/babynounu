import { Parents } from 'src/app/parent/models/parent.model';
import { CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { settingAgeOfChildren } from '../../setting/models/setting_age_of_children.model';
import { SettingGuardSchedules } from '../../setting/models/setting_guard_schedule.model';
import { SettingSpecificNeed } from '../../setting/models/setting_specific_need.model';
import { SettingSpecificSkills } from '../../setting/models/setting_specific_skill.model';
import { SettingLanguages } from '../../setting/models/setting_language.model';
import { settingLocalization } from '../../setting/models/setting_localization.model';

@Entity()
export class ParentSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Parents, (parent) => parent.setting, { onDelete: 'CASCADE' })
  parent: Parents;

  @ManyToOne(() => settingAgeOfChildren, (AOC) => AOC.parent, {
    onDelete: 'CASCADE',
  })
  age_of_children: settingAgeOfChildren;

  @ManyToOne(() => SettingGuardSchedules, (GS) => GS.parent, {
    onDelete: 'CASCADE',
  })
  guard_schedule: SettingGuardSchedules;

  @ManyToOne(() => SettingSpecificNeed, (SN) => SN.parent, {
    onDelete: 'CASCADE',
  })
  specific_need: SettingSpecificNeed;

  @ManyToOne(() => SettingSpecificSkills, (SN) => SN.parent, {
    onDelete: 'CASCADE',
  })
  specific_skills: SettingSpecificSkills;

  @ManyToOne(() => SettingLanguages, (SN) => SN.parent, {
    onDelete: 'CASCADE',
  })
  language: SettingLanguages;

  @ManyToOne(() => settingLocalization, (SN) => SN.parent, {
    onDelete: 'CASCADE',
  })
  localization: settingLocalization;

  @ManyToOne(() => settingLocalization, (SN) => SN.parent, {
    onDelete: 'CASCADE',
  })
  work_area: settingLocalization[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}

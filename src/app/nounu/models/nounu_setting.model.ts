import { Parents } from 'src/app/parent/models/parent.model';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { settingAgeOfChildren } from '../../setting/models/setting_age_of_children.model';
import { SettingGuardSchedules } from '../../setting/models/setting_guard_schedule.model';
import { SettingSpecificNeed } from '../../setting/models/setting_specific_need.model';
import { SettingSpecificSkills } from '../../setting/models/setting_specific_skill.model';
import { SettingLanguages } from '../../setting/models/setting_language.model';
import { settingLocalization } from '../../setting/models/setting_localization.model';
import { Nounus } from './nounu.model';
import { settingCertifications } from 'src/app/setting/models/setting_certification.model';

@Entity()
export class NounuSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  
  @OneToMany(() => Nounus, (nounu) => nounu.setting, { onDelete: 'CASCADE' })
  nounu: Nounus;

  @ManyToOne(() => settingAgeOfChildren, (AOC) => AOC.nounu, {
    onDelete: 'CASCADE',
  })
  specific_skills: SettingSpecificSkills;

  @ManyToOne(() => SettingLanguages, (SN) => SN.nounu, {
    onDelete: 'CASCADE',
  })
  language: SettingLanguages;

  @ManyToOne(() => SettingGuardSchedules, (AOC) => AOC.nounu, {
    onDelete: 'CASCADE',
  })
  guard_schedule: SettingGuardSchedules;

  @ManyToOne(() => settingLocalization, (SN) => SN.nounu, {
    onDelete: 'CASCADE',
  })
  localization: settingLocalization;

  @ManyToOne(() => settingCertifications, (SN) => SN.nounu, {
    onDelete: 'CASCADE',
  })
  certification: settingCertifications[];
}

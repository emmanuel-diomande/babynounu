import { Parents } from 'src/app/parent/models/parent.model';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SettingAgeOfChildren } from '../../setting/models/setting_age_of_children.model';
import { SettingGuardSchedules } from '../../setting/models/setting_guard_schedule.model';
import { SettingSpecificNeed } from '../../setting/models/setting_specific_need.model';
import { SettingSpecificSkills } from '../../setting/models/setting_specific_skill.model';
import { SettingLanguages } from '../../setting/models/setting_language.model';
import { SettingLocalization } from '../../setting/models/setting_localization.model';
import { Nounus } from './nounu.model';
import { SettingCertifications } from 'src/app/setting/models/setting_certification.model';
import { SettingDesiredTime } from 'src/app/setting/models/setting_desired_time.model';

@Entity()
export class NounuSettingDeriredTimes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Nounus, (nounu) => nounu.settingDesiredTimes, { cascade: true })
  nounu: Nounus;

  @ManyToOne(() => SettingDesiredTime, (NS) => NS.id, { cascade: true })
  time: SettingDesiredTime;
}

import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Medias } from '../media/models/media.model';
import { ParentSettingSpecificSkills } from '../parent/models/parent_settring_specific_skill.model';
import { User } from '../user/user.model';
import { SettingSpecificSkills } from '../setting/models/setting_specific_skill.model';
import { SettingDesiredTime } from '../setting/models/setting_desired_time.model';
import { SettingCertifications } from '../setting/models/setting_certification.model';
import { SettingLocalization } from '../setting/models/setting_localization.model';
import { SettingAgeOfChildren } from '../setting/models/setting_age_of_children.model';
import { ParentSettingAreaWork } from '../parent/models/parent_settring_area_work.model';
import { ParentSettingDeriredTimes } from '../parent/models/parent_setting_desired_time.model';
import { ParentSettingAgeOfChildrens } from '../parent/models/parent_setting_age_of_children.model';
import { ParentSettingLocalizations } from '../parent/models/parent_setting_localization.model';
import { ParentSettingLanguages } from '../parent/models/parent_setting_languages.model';
import { SettingLanguages } from '../setting/models/setting_language.model';
import { ParentSettingGuardSchedules } from './models/parent_setting_guard_schedules.model';
import { SettingGuardSchedules } from '../setting/models/setting_guard_schedule.model';
import { SettingSpecificNeed } from '../setting/models/setting_specific_need.model';
import { Parents } from './models/parent.model';

export const ParentProviders = [
  {
    provide: 'SEETING_LANGUAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SettingLanguages),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PARENT_SEETING_LANGUAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ParentSettingLanguages),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PARENT_SETTING_SPECIFIC_NEEDS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ParentSettingSpecificSkills),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PARENT_SETTING_LOCALIZATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ParentSettingLocalizations),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PARENT_SETTING_AGE_OF_CHILDRENS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ParentSettingAgeOfChildrens),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PARENT_SETTING_DESIREDTIMES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ParentSettingDeriredTimes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PARENT_SETTING_AREA_WORK_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ParentSettingAreaWork),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SETTING_AGE_OF_CHILDRENS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SettingAgeOfChildren),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SETTING_LOCALIZATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SettingLocalization),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SETTING_DESIRED_TIME_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SettingDesiredTime),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SETTING_SPECIFIC_SKILLS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SettingSpecificSkills),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },

  {
    provide: 'PARENT_SETTING_SPECIFIC_SKILLS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ParentSettingSpecificSkills),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MEDIA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Medias),
    inject: ['DATA_SOURCE'],
  },

  {
    provide: 'PARENT_SETTING_GUARD_SCHEDULES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ParentSettingGuardSchedules),
    inject: ['DATA_SOURCE'],
  },

  {
    provide: 'SETTING_GUARD_SCHEDULE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingGuardSchedules),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SETTING_SPECIFIC_NEEDS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingSpecificNeed),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PARENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Parents),
    inject: ['DATA_SOURCE'],
  },
];

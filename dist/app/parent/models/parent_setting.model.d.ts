import { Parents } from 'src/app/parent/models/parent.model';
import { settingAgeOfChildren } from '../../setting/models/setting_age_of_children.model';
import { SettingGuardSchedules } from '../../setting/models/setting_guard_schedule.model';
import { SettingSpecificNeed } from '../../setting/models/setting_specific_need.model';
import { SettingSpecificSkills } from '../../setting/models/setting_specific_skill.model';
import { SettingLanguages } from '../../setting/models/setting_language.model';
import { settingLocalization } from '../../setting/models/setting_localization.model';
export declare class ParentSettings {
    id: string;
    parent: Parents;
    age_of_children: settingAgeOfChildren;
    guard_schedule: SettingGuardSchedules;
    specific_need: SettingSpecificNeed;
    specific_skills: SettingSpecificSkills;
    language: SettingLanguages;
    localization: settingLocalization;
    work_area: settingLocalization[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

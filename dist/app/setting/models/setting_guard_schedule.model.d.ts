import { NounuSettings } from 'src/app/nounu/models/nounu_setting.model';
import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
export declare class SettingGuardSchedules {
    id: string;
    slug: string;
    name: string;
    description: string;
    parent: ParentSettings;
    nounu: NounuSettings;
}

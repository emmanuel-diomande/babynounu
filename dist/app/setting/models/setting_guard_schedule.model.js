"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingGuardSchedules = void 0;
const nounu_setting_model_1 = require("../../nounu/models/nounu_setting.model");
const parent_setting_model_1 = require("../../parent/models/parent_setting.model");
const typeorm_1 = require("typeorm");
let SettingGuardSchedules = class SettingGuardSchedules {
    id;
    slug;
    name;
    parent;
    nounu;
};
exports.SettingGuardSchedules = SettingGuardSchedules;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SettingGuardSchedules.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: true, nullable: true }),
    __metadata("design:type", String)
], SettingGuardSchedules.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], SettingGuardSchedules.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_setting_model_1.ParentSettings, (SU) => SU.guard_schedule, { cascade: true }),
    __metadata("design:type", parent_setting_model_1.ParentSettings)
], SettingGuardSchedules.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_setting_model_1.NounuSettings, (NS) => NS.guard_schedule, { cascade: true }),
    __metadata("design:type", nounu_setting_model_1.NounuSettings)
], SettingGuardSchedules.prototype, "nounu", void 0);
exports.SettingGuardSchedules = SettingGuardSchedules = __decorate([
    (0, typeorm_1.Entity)()
], SettingGuardSchedules);

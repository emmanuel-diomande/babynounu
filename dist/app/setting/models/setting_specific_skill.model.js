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
exports.SettingSpecificSkills = void 0;
const typeorm_1 = require("typeorm");
const parent_setting_model_1 = require("../../parent/models/parent_setting.model");
const nounu_setting_model_1 = require("../../nounu/models/nounu_setting.model");
let SettingSpecificSkills = class SettingSpecificSkills {
};
exports.SettingSpecificSkills = SettingSpecificSkills;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SettingSpecificSkills.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: true, nullable: true }),
    __metadata("design:type", String)
], SettingSpecificSkills.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], SettingSpecificSkills.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_setting_model_1.ParentSettings, (PS) => PS.specific_skills, { cascade: true }),
    __metadata("design:type", parent_setting_model_1.ParentSettings)
], SettingSpecificSkills.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_setting_model_1.NounuSettings, (NS) => NS.specific_skills, { cascade: true }),
    __metadata("design:type", nounu_setting_model_1.NounuSettings)
], SettingSpecificSkills.prototype, "nounu", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], SettingSpecificSkills.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], SettingSpecificSkills.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], SettingSpecificSkills.prototype, "deletedAt", void 0);
exports.SettingSpecificSkills = SettingSpecificSkills = __decorate([
    (0, typeorm_1.Entity)()
], SettingSpecificSkills);
//# sourceMappingURL=setting_specific_skill.model.js.map
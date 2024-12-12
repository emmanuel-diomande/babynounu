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
exports.ParentSettingHousekeepers = void 0;
const typeorm_1 = require("typeorm");
const parent_model_1 = require("./parent.model");
const setting_housekeeper_model_1 = require("../../setting/models/setting_housekeeper.model");
let ParentSettingHousekeepers = class ParentSettingHousekeepers {
    id;
    parent;
    Housekeepers;
};
exports.ParentSettingHousekeepers = ParentSettingHousekeepers;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ParentSettingHousekeepers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parent_model_1.Parents, (parent) => parent.settingHousekeepers, { onDelete: 'CASCADE' }),
    __metadata("design:type", parent_model_1.Parents)
], ParentSettingHousekeepers.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_housekeeper_model_1.SettingHousekeeper, { onDelete: 'CASCADE' }),
    __metadata("design:type", setting_housekeeper_model_1.SettingHousekeeper)
], ParentSettingHousekeepers.prototype, "Housekeepers", void 0);
exports.ParentSettingHousekeepers = ParentSettingHousekeepers = __decorate([
    (0, typeorm_1.Entity)()
], ParentSettingHousekeepers);

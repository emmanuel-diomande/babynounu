"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingModule = void 0;
const common_1 = require("@nestjs/common");
const setting_controller_1 = require("./setting.controller");
const setting_service_1 = require("./setting.service");
const setting_guard_schedule_controller_1 = require("./_partiels/controllers/setting_guard_schedule.controller");
const database_module_1 = require("../../database/database.module");
const general_service_1 = require("./_partiels/general.service");
const setting_1 = require("./setting");
let SettingModule = class SettingModule {
};
exports.SettingModule = SettingModule;
exports.SettingModule = SettingModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [setting_controller_1.SettingController, setting_guard_schedule_controller_1.SettingGuardScheduleController],
        providers: [setting_service_1.SettingService, ...setting_1.SettingProviders, general_service_1.SettingGeneraleService]
    })
], SettingModule);
//# sourceMappingURL=setting.module.js.map
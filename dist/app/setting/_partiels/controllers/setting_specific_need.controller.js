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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingSpecificNeedController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const general_service_1 = require("../general.service");
const typeorm_1 = require("typeorm");
const setting_dto_1 = require("../../dto/setting.dto");
const auh_guard_1 = require("../../../auth/auh.guard");
let SettingSpecificNeedController = class SettingSpecificNeedController {
    settingGeneraleService;
    settingSpecificNeedRepository;
    constructor(settingGeneraleService, settingSpecificNeedRepository) {
        this.settingGeneraleService = settingGeneraleService;
        this.settingSpecificNeedRepository = settingSpecificNeedRepository;
    }
    GetSettings() {
        return this.settingGeneraleService.settings(this.settingSpecificNeedRepository);
    }
    GetSetting(slug) {
        return this.settingGeneraleService.setting(this.settingSpecificNeedRepository, { slug });
    }
    CreateSetting(settingSpecificNeedBody) {
        return this.settingGeneraleService.createSetting(this.settingSpecificNeedRepository, { createSettingBody: settingSpecificNeedBody });
    }
    UpdateSetting(settingSpecificNeedBody, slug) {
        return this.settingGeneraleService.updateSetting(this.settingSpecificNeedRepository, { updateSettingBody: settingSpecificNeedBody }, { slug });
    }
    DeleteSetting(slug) {
        return this.settingGeneraleService.deleteSetting(this.settingSpecificNeedRepository, { slug });
    }
};
exports.SettingSpecificNeedController = SettingSpecificNeedController;
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingSpecificNeedController.prototype, "GetSettings", null);
__decorate([
    (0, common_1.Get)('/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettingSpecificNeedController.prototype, "GetSetting", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setting_dto_1.SettingDto]),
    __metadata("design:returntype", void 0)
], SettingSpecificNeedController.prototype, "CreateSetting", null);
__decorate([
    (0, common_1.Patch)('update/:slug'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setting_dto_1.SettingDto, String]),
    __metadata("design:returntype", void 0)
], SettingSpecificNeedController.prototype, "UpdateSetting", null);
__decorate([
    (0, common_1.Delete)('/delete/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettingSpecificNeedController.prototype, "DeleteSetting", null);
exports.SettingSpecificNeedController = SettingSpecificNeedController = __decorate([
    (0, common_1.UseGuards)(auh_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('Setting Specific Need'),
    (0, common_1.Controller)('setting/specific_need'),
    __param(1, (0, common_1.Inject)('SETTING_SPECIFIC_NEED_REPOSITORY')),
    __metadata("design:paramtypes", [general_service_1.SettingGeneraleService,
        typeorm_1.Repository])
], SettingSpecificNeedController);
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModule = void 0;
const common_1 = require("@nestjs/common");
const job_controller_1 = require("./job.controller");
const job_service_1 = require("./job.service");
const job_1 = require("./job");
const database_module_1 = require("../../database/database.module");
const media_service_1 = require("../media/media.service");
const media_1 = require("../media/media");
const parameter_1 = require("../parameter/parameter");
const parameter_service_1 = require("../parameter/parameter.service");
let JobModule = class JobModule {
};
exports.JobModule = JobModule;
exports.JobModule = JobModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [job_controller_1.JobsController],
        providers: [job_service_1.JobsService, media_service_1.MediaService, parameter_service_1.ParameterService, ...media_1.MediaProviders, ...parameter_1.ParameterProviders, ...job_1.JobProviders]
    })
], JobModule);

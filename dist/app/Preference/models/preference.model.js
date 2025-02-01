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
exports.Preference = void 0;
const typeorm_1 = require("typeorm");
const parameter_model_1 = require("../../parameter/models/parameter.model");
const user_model_1 = require("../../user/user.model");
const parameter_type_model_1 = require("../../parameter/models/parameter_type.model");
let Preference = class Preference {
    id;
    parameter;
    parent;
    user;
    created_at;
    updated_at;
    deleted_at;
};
exports.Preference = Preference;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Preference.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, (type) => type.preference, { onDelete: 'CASCADE', }),
    __metadata("design:type", Array)
], Preference.prototype, "parameter", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_type_model_1.TypeParameter, (type) => type.parameter, { onDelete: 'CASCADE', }),
    __metadata("design:type", parameter_type_model_1.TypeParameter)
], Preference.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (type) => type.preference, { onDelete: 'CASCADE', }),
    __metadata("design:type", user_model_1.User)
], Preference.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Preference.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Preference.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Preference.prototype, "deleted_at", void 0);
exports.Preference = Preference = __decorate([
    (0, typeorm_1.Entity)("user_preferences")
], Preference);

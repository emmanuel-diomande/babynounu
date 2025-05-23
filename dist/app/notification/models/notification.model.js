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
exports.Notification = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("../../user/user.model");
const job_model_1 = require("../../job/models/job.model");
let Notification = class Notification {
    id;
    type;
    job;
    message;
    tolinkId;
    isRead;
    user;
    sender;
    isActions;
    isDeleted;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_model_1.Job, (job) => job.notifications, { onDelete: 'CASCADE' }),
    __metadata("design:type", job_model_1.Job)
], Notification.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "tolinkId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.notifications, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_model_1.User)
], Notification.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.sentNotifications, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_model_1.User)
], Notification.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isActions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Notification.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Notification.prototype, "deletedAt", void 0);
exports.Notification = Notification = __decorate([
    (0, typeorm_1.Entity)()
], Notification);

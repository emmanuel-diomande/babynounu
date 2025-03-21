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
exports.UpdatePaymentDto = void 0;
const class_validator_1 = require("class-validator");
class UpdatePaymentDto {
    userId;
    amount;
    transaction_id;
    payment_token;
    currency;
    description;
    notify_url;
    return_url;
    metadata;
    paymentMethod;
    status;
    operator_id;
}
exports.UpdatePaymentDto = UpdatePaymentDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdatePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "transaction_id", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Object)
], UpdatePaymentDto.prototype, "payment_token", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "notify_url", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "return_url", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "metadata", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Object)
], UpdatePaymentDto.prototype, "operator_id", void 0);

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
exports.SginUpAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SginUpAuthDto {
    slug;
    email;
    password;
    role;
    type_profil;
}
exports.SginUpAuthDto = SginUpAuthDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'bill-pather-9520',
        required: false,
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], SginUpAuthDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'rehmat.sayani@gmail.com',
        required: true,
    }),
    (0, class_validator_1.IsString)({ message: 'Ce champs est requis' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email invalide' }),
    __metadata("design:type", String)
], SginUpAuthDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'password',
        required: true,
    }),
    (0, class_validator_1.IsString)({ message: 'Ce champs est requis' }),
    (0, class_validator_1.MinLength)(8, { message: 'Le mot de passe doit avoir au moins 8 caractères' }),
    __metadata("design:type", String)
], SginUpAuthDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user',
        required: true
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le role est requis' }),
    (0, class_validator_1.IsString)({ message: 'Le role doit être une chaine de caractères' }),
    __metadata("design:type", String)
], SginUpAuthDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Nounu',
        required: true
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Type du profil champ est requis' }),
    (0, class_validator_1.IsString)({ message: 'Type du profil doit être une chaine de caractères' }),
    __metadata("design:type", String)
], SginUpAuthDto.prototype, "type_profil", void 0);

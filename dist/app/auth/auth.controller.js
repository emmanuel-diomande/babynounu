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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signIn_dto_1 = require("./dto/signIn.dto");
const signUp_dto_1 = require("./dto/signUp.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    AuthService;
    constructor(AuthService) {
        this.AuthService = AuthService;
    }
    SignUp(signUpBody) {
        return this.AuthService.signUp({ signUpBody });
    }
    SignIn(signInBody) {
        return this.AuthService.signIn({ signInBody });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/sign-up'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The record has been successfully created.',
    }),
    (0, swagger_1.ApiBody)({
        type: signUp_dto_1.SginUpAuthDto,
        description: 'Json structure for register object',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUp_dto_1.SginUpAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "SignUp", null);
__decorate([
    (0, common_1.Post)('/sign-in'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The record has been successfully created.',
    }),
    (0, swagger_1.ApiBody)({
        type: signIn_dto_1.SginInAuthDto,
        description: 'Json structure for login object',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_dto_1.SginInAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "SignIn", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentification'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);

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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const axios_1 = require("axios");
let PaymentService = class PaymentService {
    paymentRepository;
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async createPayment(createPaymentDto) {
        const hasUserPaid = await this.paymentRepository.findOne({
            where: { user: { id: createPaymentDto.userId } },
            relations: ['user'],
        });
        if (hasUserPaid) {
            throw new common_1.BadRequestException({
                message: "L'utilisateur a deja paye",
            });
        }
        const payment = this.paymentRepository.create({
            ...createPaymentDto,
            user: { id: createPaymentDto.userId },
        });
        await this.paymentRepository.save(payment);
        var config = {
            method: 'post',
            url: 'https://api-checkout.cinetpay.com/v2/payment',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                apikey: process.env.CINETPAY_API_KEY,
                site_id: process.env.CINETPAY_SITE_ID,
                mode: 'PRODUCTION',
                ...createPaymentDto,
            },
        };
        const { data: paymentDataSave } = await (0, axios_1.default)(config);
        if (!paymentDataSave) {
            throw new common_1.BadRequestException({
                message: "Erreur lors de l'initiation du paiement",
            });
        }
        await this.paymentRepository.update({ id: paymentDataSave.id }, { payment_token: paymentDataSave.payment_token });
        return paymentDataSave;
    }
    async getPaymentsByUser(userId) {
        return this.paymentRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async getPaymentById(paymentId) {
        return this.paymentRepository.findOne({
            where: { id: paymentId.toString() },
        });
    }
    async updatePaymentStatus(paymentId, status) {
        await this.paymentRepository.update(paymentId, { status });
        return this.getPaymentById(paymentId);
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PAYMENT_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PaymentService);

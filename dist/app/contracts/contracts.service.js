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
exports.ContractsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const notification_service_1 = require("../notification/notification.service");
let ContractsService = class ContractsService {
    contractsRepository;
    nounusRepository;
    parentsRepository;
    notificationService;
    constructor(contractsRepository, nounusRepository, parentsRepository, notificationService) {
        this.contractsRepository = contractsRepository;
        this.nounusRepository = nounusRepository;
        this.parentsRepository = parentsRepository;
        this.notificationService = notificationService;
    }
    async create(createContractDto) {
        const nounu = await this.nounusRepository.findOne({
            where: { id: createContractDto.nounuId }, relations: { user: true }
        });
        if (!nounu) {
            throw new common_1.NotFoundException('Nounu not found');
        }
        const parent = await this.parentsRepository.findOne({
            where: { id: createContractDto.parentId }, relations: { user: true }
        });
        if (!parent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        const contract = this.contractsRepository.create({
            ...createContractDto,
            nounu,
            parent,
        });
        await this.notificationService.createNotification({
            type: 'CONTRAT',
            userId: nounu.user.id,
            message: `La missions de ${nounu.fullname} a bien été validé.`,
            is_read: false,
            senderUserId: parent.user.id,
        });
        return this.contractsRepository.save(contract);
    }
    async findAll() {
        return this.contractsRepository.find({
            relations: ['nounu', 'parent'],
        });
    }
    async findOne(id) {
        const contract = await this.contractsRepository.findOne({
            where: { id },
            relations: ['nounu', 'parent'],
        });
        if (!contract) {
            throw new common_1.NotFoundException(`Contract with ID ${id} not found`);
        }
        return contract;
    }
    async update(id, updateContractDto) {
        const contract = await this.findOne(id);
        const updated = this.contractsRepository.merge(contract, updateContractDto);
        return this.contractsRepository.save(updated);
    }
    async remove(id) {
        const result = await this.contractsRepository.softDelete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Contract with ID ${id} not found`);
        }
    }
    async restore(id) {
        const result = await this.contractsRepository.restore(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Contract with ID ${id} not found`);
        }
        return this.findOne(id);
    }
};
exports.ContractsService = ContractsService;
exports.ContractsService = ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("CONTRACTS_REPOSITORY")),
    __param(1, (0, common_1.Inject)("NOUNUS_REPOSITORY")),
    __param(2, (0, common_1.Inject)("PARENT_REPOSITORY")),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        notification_service_1.NotificationService])
], ContractsService);

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
exports.MediaController = void 0;
const media_service_1 = require("./media.service");
const common_1 = require("@nestjs/common");
const create_media_dto_1 = require("./dtos/create-media.dto");
const update_media_dto_1 = require("./dtos/update-media.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const media_model_1 = require("./models/media.model");
const media_config_1 = require("../../config/media.config");
let MediaController = class MediaController {
    mediaService;
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    create(createMediaDto, files) {
    }
    createDocumentByNounu(userId, files) {
        return this.mediaService.createDocumentByNounu(userId, files);
    }
    findDocumentByUserId(userId) {
        return this.mediaService.findDocumentByUserId(userId);
    }
    findAll() {
        return this.mediaService.findAll();
    }
    findOne(id) {
        return this.mediaService.findOne(+id);
    }
    getGalleryNounus(userId) {
        return this.mediaService.getGalleryNounus(userId);
    }
    getDocumentNounus(userId) {
        return this.mediaService.getGalleryNounus(userId);
    }
    update(id, typeMedia, updateMediaDto) {
        return this.mediaService.update({ id, typeMedia }, updateMediaDto);
    }
    remove(id) {
        return this.mediaService.remove(id);
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'test', maxCount: 4 },
        { name: 'image_2', maxCount: 1 },
        { name: 'image_3', maxCount: 1 },
        { name: 'image_4', maxCount: 1 },
        { name: 'documents', maxCount: 5 },
    ], {
        storage: media_config_1.storageMedia,
        fileFilter: media_config_1.fileFilterMedia,
        limits: media_config_1.LimiterMedia,
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_media_dto_1.CreateMediaDto, Object]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('document/:userId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'documents', maxCount: 5 }], {
        storage: media_config_1.storageMedia,
        fileFilter: media_config_1.fileFilterMedia,
        limits: media_config_1.LimiterMedia,
    })),
    (0, swagger_1.ApiOkResponse)({ description: 'Document created for nounu', type: media_model_1.Medias }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "createDocumentByNounu", null);
__decorate([
    (0, common_1.Get)('document/:userId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get document by user ID',
        type: media_model_1.Medias
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "findDocumentByUserId", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'List of media', type: [media_model_1.Medias] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Media by ID', type: media_model_1.Medias }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('gallery/:userId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of gallery media by user ID',
        type: [media_model_1.Medias],
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "getGalleryNounus", null);
__decorate([
    (0, common_1.Get)('documents/:userId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of gallery media by user ID',
        type: [media_model_1.Medias],
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "getDocumentNounus", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Media updated', type: media_model_1.Medias }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_media_dto_1.UpdateMediaDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Media deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "remove", null);
exports.MediaController = MediaController = __decorate([
    (0, swagger_1.ApiTags)('media'),
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);

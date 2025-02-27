import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    NotFoundException,
    UseInterceptors,
    UploadedFiles,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
  import { NounusService } from './nounus.service';
  import { CreateNounuDto } from './dtos/create-nounu.dto';
  import { UpdateNounuDto } from './dtos/update-nounu.dto';
  import { Nounus } from './models/nounu.model';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storageMedia } from 'src/config/media.config';
  
  @ApiTags('nounu') // Tag pour Swagger
  @Controller('nounu')
  export class NounusController {
    constructor(private readonly nounuService: NounusService) {}
  
      @Post('create')
      @UseInterceptors(
          FileFieldsInterceptor(
            [
              { name: 'imageNounu', maxCount: 1 },
              { name: 'documents', maxCount: 4 },
              { name: 'gallery', maxCount: 20 },
            ],
            {
              storage: storageMedia
            }
          )
        )
    @ApiOperation({ summary: 'Create a new Nounus' })
    @ApiResponse({ status: 201, description: 'Nounus created successfully', type: Nounus })
    async create(@Body() createNounuDto: CreateNounuDto, @UploadedFiles() files): Promise<Nounus> {
      return await this.nounuService.create(createNounuDto, files);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all Nounus' })
    @ApiResponse({ status: 200, description: 'List of Nounus', type: [Nounus] })
    async findAll(): Promise<Nounus[]> {
      return await this.nounuService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a Nounus by ID' })
    @ApiParam({ name: 'id', description: 'Nounus ID', type: Number })
    @ApiResponse({ status: 200, description: 'Nounus found', type: Nounus })
    @ApiResponse({ status: 404, description: 'Nounus not found' })
    async findOne(@Param('id') id: number): Promise<Nounus> {
      return await this.nounuService.findOne(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update a Nounus by ID' })
    @ApiParam({ name: 'id', description: 'Nounus ID', type: Number })
    @ApiResponse({ status: 200, description: 'Nounus updated successfully', type: Nounus })
    @ApiResponse({ status: 404, description: 'Nounus not found' })
    async update(
      @Param('id') id: number,
      @Body() updateNounuDto: UpdateNounuDto,
    ): Promise<Nounus> {
      return await this.nounuService.update(id, updateNounuDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Nounus by ID' })
    @ApiParam({ name: 'id', description: 'Nounus ID', type: Number })
    @ApiResponse({ status: 204, description: 'Nounus deleted successfully' })
    @ApiResponse({ status: 404, description: 'Nounus not found' })
    async remove(@Param('id') id: number): Promise<void> {
      return await this.nounuService.remove(id);
    }
  }
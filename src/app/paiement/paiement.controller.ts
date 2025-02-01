import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentService } from './paiement.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('payments') // Tag pour regrouper les endpoints dans Swagger UI
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' }) // Description de l'opération
  @ApiBody({ type: CreatePaymentDto }) // Documenter le corps de la requête
  @ApiResponse({
    status: 201,
    description: 'Payment created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UsePipes(new ValidationPipe())
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get payments for a user' }) // Description de l'opération
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' }) // Documenter le paramètre de route
  @ApiResponse({
    status: 200,
    description: 'Payments retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getPaymentsByUser(@Param('userId') userId: number) {
    return this.paymentService.getPaymentsByUser(userId);
  }

  @Get(':paymentId')
  @ApiOperation({ summary: 'Get a payment by ID' }) // Description de l'opération
  @ApiParam({ name: 'paymentId', type: Number, description: 'ID of the payment' }) // Documenter le paramètre de route
  @ApiResponse({
    status: 200,
    description: 'Payment retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async getPaymentById(@Param('paymentId') paymentId: string) {
    return this.paymentService.getPaymentById(paymentId);
  }

  @Patch(':paymentId/status')
  @ApiOperation({ summary: 'Update payment status' }) // Description de l'opération
  @ApiParam({ name: 'paymentId', type: Number, description: 'ID of the payment' }) // Documenter le paramètre de route
  @ApiBody({ schema: { example: { status: 'completed' } } }) // Documenter le corps de la requête
  @ApiResponse({
    status: 200,
    description: 'Payment status updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async updatePaymentStatus(
    @Param('paymentId') paymentId: string,
    @Body('status') status: string,
  ) {
    return this.paymentService.updatePaymentStatus(paymentId, status);
  }
}
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateReservationDto } from '../src/dto/create-reservation.dto';
import { UpdateReservationDto } from '../src/dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { Types } from 'mongoose';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationsRepository) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    return await this.reservationService.createReservation(
      createReservationDto,
    );
  }

  @Get()
  async findAll() {
    return await this.reservationService.findAllReservations();
  }

  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId) {
    return await this.reservationService.findOneReservation(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return await this.reservationService.findAndUpdateReservation(
      id,
      updateReservationDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId) {
    await this.reservationService.findAndDeleteReservation(id);
  }

  @Get(':id')
  async findManyReservations(@Param('id') reservation: CreateReservationDto) {
    return this.reservationService.findManyReservations(reservation);
  }
}

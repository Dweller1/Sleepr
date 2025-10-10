import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { Types } from 'mongoose';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationsRepository) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationService.findAllReservations();
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.reservationService.findOneReservation(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.findAndUpdateReservation(
      id,
      updateReservationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    this.reservationService.findAndDeleteReservation(id);
  }
}

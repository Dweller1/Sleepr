import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { FilterQuery } from 'mongoose';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationDocument } from '../models/reservation.schema';

@Injectable()
export class ReservationsRepository {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    private readonly abstractRepo: AbstractRepository<ReservationDocument>,
  ) {}

  async createReservation(reservation: CreateReservationDto) {
    return this.abstractRepo.create(reservation);
  }

  async findOneReservation(filterQuery: FilterQuery<ReservationDocument>) {
    return await this.abstractRepo.findOne(filterQuery);
  }

  async findAndUpdateReservation(
    filterQuery: FilterQuery<ReservationDocument>,
    update: UpdateReservationDto,
  ) {
    return await this.abstractRepo.findOneAndUpdate(filterQuery, {
      $set: update,
    });
  }

  async findManyReservations(filterQuery: FilterQuery<ReservationDocument>) {
    return await this.abstractRepo.findMany(filterQuery);
  }

  async findAllReservations() {
    return await this.abstractRepo.findAll();
  }

  async findAndDeleteReservation(
    filterQuery: FilterQuery<ReservationDocument>,
  ) {
    return await this.abstractRepo.findOneAndDelete(filterQuery);
  }
}

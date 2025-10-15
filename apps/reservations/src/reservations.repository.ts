import { BaseRepository } from '@app/common/abstract/base.repository';
import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../src/dto/create-reservation.dto';
import { FilterQuery, Model } from 'mongoose';
import { UpdateReservationDto } from '../src/dto/update-reservation.dto';
import { Reservation } from '../src/models/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReservationsRepository extends BaseRepository<Reservation> {
  constructor(
    @InjectModel(Reservation.name)
    reservationModel: Model<Reservation>,
  ) {
    super(reservationModel);
  }

  async createReservation(reservation: CreateReservationDto) {
    return await this.create(reservation);
  }

  async findOneReservation(filterQuery: FilterQuery<Reservation>) {
    return await this.findOne(filterQuery);
  }

  async findAndUpdateReservation(
    filterQuery: FilterQuery<Reservation>,
    update: UpdateReservationDto,
  ) {
    return await this.findOneAndUpdate(filterQuery, {
      $set: update,
    });
  }

  async findManyReservations(
    filterQuery: FilterQuery<Reservation>,
  ): Promise<Reservation[]> {
    return await this.findMany(filterQuery);
  }

  async findAllReservations() {
    return await this.findAll();
  }

  async findAndDeleteReservation(filterQuery: FilterQuery<Reservation>) {
    return await this.findOneAndDelete(filterQuery);
  }
}

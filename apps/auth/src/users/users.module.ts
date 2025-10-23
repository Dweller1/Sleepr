import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CommonLogger, DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema';
import {
  Reservation,
  ReservationSchema,
} from 'apps/reservations/src/models/reservation.schema';

@Module({
  imports: [
    CommonLogger,
    DatabaseModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: Reservation.name,
        schema: ReservationSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

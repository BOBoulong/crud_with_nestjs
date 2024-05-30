import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenitiesModule } from './amenities/amenities.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomTypesModule } from './room_types/room_types.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomRatesModule } from './room_rates/room_rates.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'hotel_api',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),

    AmenitiesModule,
    HotelsModule,
    RoomTypesModule,
    RoomsModule,
    RoomRatesModule,
  ],
})
export class AppModule {}

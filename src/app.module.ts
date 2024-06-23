import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenitiesModule } from './amenities/amenities.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomTypesModule } from './room_types/room_types.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomRatesModule } from './room_rates/room_rates.module';
import { HotelDetailsModule } from './hotel_details/hotel_details.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env.production'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AmenitiesModule,
    HotelsModule,
    HotelDetailsModule,
    RoomTypesModule,
    RoomsModule,
    RoomRatesModule,
  ],
})
export class AppModule {}

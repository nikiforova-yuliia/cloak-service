import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForbiddenIpAddressRepository, UnauthorizedCountryRepository } from './repositories';
import {
    ForbiddenIpAddress,
    ForbiddenIpAddressSchema,
    UnauthorizedCountry,
    UnauthorizedCountrySchema
} from './schemas';
import { DatabaseModule } from './common/database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        MongooseModule.forFeature([
            { name: ForbiddenIpAddress.name, schema: ForbiddenIpAddressSchema },
            {
                name: UnauthorizedCountry.name,
                schema: UnauthorizedCountrySchema
            }
        ])
    ],
    controllers: [AppController],
    providers: [AppService, ForbiddenIpAddressRepository, UnauthorizedCountryRepository]
})
export class AppModule {}

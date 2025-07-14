import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnauthorizedCountry } from '../schemas';

export class UnauthorizedCountryRepository {
    constructor(
        @InjectModel(UnauthorizedCountry.name)
        private readonly model: Model<UnauthorizedCountry>,
    ) {}

    async findUnauthorizedCountry(country: string): Promise<UnauthorizedCountry> {
        return this.model.findOne({ name: country });
    }
}

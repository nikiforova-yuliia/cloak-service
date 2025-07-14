import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForbiddenIpAddress } from '../schemas';

export class ForbiddenIpAddressRepository {
    constructor(
        @InjectModel(ForbiddenIpAddress.name)
        private readonly model: Model<ForbiddenIpAddress>
    ) {}

    async addForbiddenIpAddress(ip: string): Promise<void> {
        await this.model.create({ ip });
    }

    async findForbiddenIpAddress(ip: string): Promise<ForbiddenIpAddress> {
        return this.model.findOne({ ip });
    }
}

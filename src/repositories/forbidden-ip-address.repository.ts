import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForbiddenIpAddress } from '../schemas';

export class ForbiddenIpAddressRepository {
    constructor(
        @InjectModel(ForbiddenIpAddress.name)
        private readonly model: Model<ForbiddenIpAddress>
    ) {}

    async addForbiddenIpAddress(ip: string): Promise<void> {
        console.log(4343434);
        try {
            console.log(111);
            console.log(this.model.collection.name);
            await this.model.create({ ip });
            console.log(this.model.collection.name);
        } catch (err) {
            console.log(err);
        }
    }

    async findForbiddenIpAddress(ip: string): Promise<ForbiddenIpAddress> {
        return this.model.findOne({ ip });
    }
}

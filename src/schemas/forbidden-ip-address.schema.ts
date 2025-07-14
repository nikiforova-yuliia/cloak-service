import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'forbiddenIpAddresses' })
export class ForbiddenIpAddress extends Document {
    @Prop({ type: MongooseSchema.Types.String, required: true })
    readonly ip: string;
}

export const ForbiddenIpAddressSchema = SchemaFactory.createForClass(ForbiddenIpAddress);

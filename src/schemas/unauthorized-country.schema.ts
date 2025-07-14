import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'unauthorizedCountries' })
export class UnauthorizedCountry extends Document {
    @Prop({ type: MongooseSchema.Types.String, required: true })
    readonly name: string;
}

export const UnauthorizedCountrySchema = SchemaFactory.createForClass(UnauthorizedCountry);

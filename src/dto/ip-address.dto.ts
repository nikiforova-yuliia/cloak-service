import { IsIP, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class IpAddressDto {
    @ApiProperty({ type: () => String, required: true, example: '8.8.8.8' })
    @IsIP()
    @IsNotEmpty()
    @Type(() => String)
    readonly ip: string;
}

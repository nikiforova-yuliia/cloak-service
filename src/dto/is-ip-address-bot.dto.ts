import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class IsIpAddressBotDto {
    constructor(isBot: boolean) {
        this.isBot = isBot;
    }

    @ApiProperty({ type: () => Boolean, required: true })
    @IsNotEmpty()
    @IsBoolean()
    readonly isBot: boolean;
}

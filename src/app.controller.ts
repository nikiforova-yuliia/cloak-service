import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UnprocessableEntityException
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { IpAddressDto, IsIpAddressBotDto } from './dto';
import { Public } from './common/decorators';

@ApiTags('ip-check')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @ApiOperation({ summary: 'Check if the request is from bot' })
    @ApiOkResponse({ type: () => IsIpAddressBotDto })
    @HttpCode(HttpStatus.OK)
    @Post()
    async checkBot(@Body() body: IpAddressDto): Promise<IsIpAddressBotDto> {
        const isForbiddenAddress = await this.appService.checkForbiddenIpAddress(body.ip);

        if (isForbiddenAddress) {
            return new IsIpAddressBotDto(true);
        }

        const ipAddressInfo = await this.appService.getIpAddressInfo(body.ip);

        if (!ipAddressInfo || ipAddressInfo.message) {
            throw new UnprocessableEntityException();
        }

        const { vpn, proxy, tor, relay } = ipAddressInfo.security;

        if (vpn || proxy || tor || relay) {
            await this.appService.addForbiddenIpAddress(body.ip);
            return new IsIpAddressBotDto(true);
        }

        const isUnauthorizedCountry = await this.appService.checkUnauthorizedCountry(
            ipAddressInfo.location.country
        );

        if (isUnauthorizedCountry) {
            await this.appService.addForbiddenIpAddress(body.ip);
            return new IsIpAddressBotDto(true);
        }

        return new IsIpAddressBotDto(false);
    }
}

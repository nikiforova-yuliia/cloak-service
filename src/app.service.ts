import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ForbiddenIpAddressRepository, UnauthorizedCountryRepository } from './repositories';

@Injectable()
export class AppService {
    constructor(
        private readonly forbiddenIpAddressRepository: ForbiddenIpAddressRepository,
        private readonly unauthorizedCountryRepository: UnauthorizedCountryRepository,
        private readonly configService: ConfigService
    ) {}

    async checkForbiddenIpAddress(ipAddress: string): Promise<boolean> {
        const forbiddenAddress = await this.forbiddenIpAddressRepository.findForbiddenIpAddress(
            ipAddress
        );

        return !!forbiddenAddress;
    }

    async checkUnauthorizedCountry(country: string): Promise<boolean> {
        const unauthorizedCountry =
            await this.unauthorizedCountryRepository.findUnauthorizedCountry(country);

        return !!unauthorizedCountry;
    }

    async addForbiddenIpAddress(ipAddress: string): Promise<void> {
        await this.forbiddenIpAddressRepository.addForbiddenIpAddress(ipAddress);
    }

    async getIpAddressInfo(ipAddress: string): Promise<any> {
        const url = this.configService.get('VPNAPI_BASE_URL');
        const apiKey = this.configService.get('VPNAPI_API_KEY');

        try {
            const response = await axios({
                method: 'get',
                url: url + ipAddress + '?key=' + apiKey,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (err) {
            console.log(err.message);

            if (err.response) {
                console.log(err.response?.status);
                console.log(err.response?.data?.message);
            }
        }
    }
}

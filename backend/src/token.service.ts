import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class TokenService {
  private readonly clientId = 31992158;

  // Получение токена
  async getToken() {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'X-Client-Id': this.clientId,
        },
      };
      const tokenResponse = await axios.get('https://app2.gnzs.ru/amocrm/test/oauth/get-token.php', config);
      return tokenResponse.data;
    } catch (error) {
      console.error('Error getting token:', error.response?.data || error.message);
      throw new Error('Failed to get token');
    }
  }
}
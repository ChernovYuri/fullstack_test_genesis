import { Controller, Post, Body } from '@nestjs/common';
import { TokenService } from './token.service';
import { AmoCRMService } from './amocrm.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly amoCRMService: AmoCRMService,
  ) {
  }

  @Post('create')
  async createEntity(@Body() body: { entityType: string }) {
    try {
      const token = await this.tokenService.getToken();
      const { entityType } = body;
      const entityUrl = this.amoCRMService.getEntityUrl(entityType, token.base_domain);

      // Создание сущности
      const createResponse = await this.amoCRMService.createEntity(entityUrl, token.access_token);
      const entityId = this.amoCRMService.getEntityId(createResponse, entityType);

      if (entityId) {
        // Получение данных сущности
        const entityData = await this.amoCRMService.getEntityById(entityUrl, entityId, token.access_token);
        return { data: entityData };
      }

      throw new Error('Entity creation failed');
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw new Error('Failed');
    }
  }
}

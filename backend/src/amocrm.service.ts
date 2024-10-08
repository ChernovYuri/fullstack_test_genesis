import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AmoCRMService {
  // Формирование заголовка для авторизации
  private createHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  // Создание сущности
  async createEntity(entityUrl: string, token: string, entityData: any[] = [{}]) {
    const headers = this.createHeaders(token);
    try {
      const response = await axios.post(entityUrl, entityData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating entity:', error.response?.data || error.message);
      throw new Error('Failed to create entity');
    }
  }

  // Получение сущности по id
  async getEntityById(entityUrl: string, entityId: string, token: string) {
    const headers = this.createHeaders(token);
    try {
      const response = await axios.get(`${entityUrl}/${entityId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching entity:', error.response?.data || error.message);
      throw new Error('Failed to fetch entity');
    }
  }

  // Получение URL для сущности
  getEntityUrl(entityType: string, baseDomain: string) {
    const baseUrl = `https://${baseDomain}/api/v4`;
    switch (entityType) {
      case 'lead':
        return `${baseUrl}/leads`;
      case 'contact':
        return `${baseUrl}/contacts`;
      case 'company':
        return `${baseUrl}/companies`;
      default:
        throw new Error('Invalid entity type');
    }
  }

  // Получение id созданной сущности
  getEntityId(responseData: any, entityType: string): string | null {
    if (responseData && responseData._embedded) {
      switch (entityType) {
        case 'lead':
          return responseData._embedded.leads?.[0]?.id || null;
        case 'contact':
          return responseData._embedded.contacts?.[0]?.id || null;
        case 'company':
          return responseData._embedded.companies?.[0]?.id || null;
        default:
          return null;
      }
    }
    return null;
  }
}

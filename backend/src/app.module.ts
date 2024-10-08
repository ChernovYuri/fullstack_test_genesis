import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TokenService } from './token.service';
import { AmoCRMService } from './amocrm.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TokenService, AmoCRMService],
})
export class AppModule {}

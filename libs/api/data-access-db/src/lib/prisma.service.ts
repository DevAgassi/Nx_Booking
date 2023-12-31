import {
  INestApplication,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }
  
  async onModuleDestroy() {
    await this['$disconnect']();
  }

  async onModuleInit() {
    await this['$connect']();
  }

  async enableShutdownHooks(app: INestApplication) {
    //@ts-ignore
    this['$on']('beforeExit', async () => {
      await app.close();
    });
  }
}

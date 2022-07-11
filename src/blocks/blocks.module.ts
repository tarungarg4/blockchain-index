import { Module } from '@nestjs/common';
import { BlocksController } from './blocks.controller';
import { BlocksService } from './blocks.service';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import {
  getMongooseModuleImport,
  ModelName,
} from '../infrastructure/model.util';
@Module({
  imports: [getMongooseModuleImport(ModelName.Block)],
  controllers: [BlocksController],
  providers: [BlocksService],
})
export class BlocksModule {}

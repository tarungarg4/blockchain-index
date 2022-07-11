import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from './mongoose.module';
import { Schema } from 'mongoose';
import { BlockSchema, TransactionSchema } from '../blocks/blocks.schema';

export enum ModelName {
  Block = 'block',
  Transaction = 'transaction',
}
export const modelToSchemaMap: Record<ModelName, Schema> = {
  [ModelName.Block]: BlockSchema,
  [ModelName.Transaction]: TransactionSchema,
};

export function getMongooseModuleImport(
  ...modelNames: ModelName[]
): DynamicModule {
  return MongooseModule.forFeature(
    modelNames.map((modelName) => ({
      name: modelName,
      schema: modelName,
    })),
  );
}

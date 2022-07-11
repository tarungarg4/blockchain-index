import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from './mongoose.module';
import { Schema } from 'mongoose';
import { BlockSchema } from '../blocks/blocks.schema';

export enum ModelName {
  Block = 'block',
}
export const modelToSchemaMap: Record<ModelName, Schema> = {
  [ModelName.Block]: BlockSchema,
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

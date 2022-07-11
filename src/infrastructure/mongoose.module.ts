/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import mongooseProfiler from 'mongoose-profiler';
import url from 'url';
import { local } from '../../conf';

@Global()
@Module({})
export class MongooseModule {
  public static register(): DynamicModule {
    return NestMongooseModule.forRootAsync({
      useFactory: async () => {
        const {
          host,
          user,
          password,
          database,
          replicaSet,
          authSource,
          writeConcern,
          socketTimeout,
          maxQueryExecutionTime,
        } = local.mongodb;
        const query = {
          ...(replicaSet ? { replicaSet } : undefined),
          ...(authSource ? { authSource } : undefined),
        };
        const uri = url.format({
          protocol: 'mongodb',
          slashes: true,
          auth: user ? user + (password ? ':' + password : '') : undefined,
          host,
          pathname: database,
          query,
        });
        return {
          uri,
          autoIndex: false,
          autoCreate: false,
          writeConcern,
          socketTimeoutMS: socketTimeout,
          connectionFactory: (connection: Connection): Connection => {
            connection.set('maxTimeMS', maxQueryExecutionTime);

            connection.plugin(
              mongooseProfiler({
                isAlwaysShowQuery: false,
                duration: 1000,
                totalDocsExamined: 1000,
                level: 'COLLSCAN',
                logger: {
                  info: (result: Record<string, any>) => {
                    console.log(
                      `Mongoose-Profiler Slow Query ${JSON.stringify(result)}`,
                    );
                  },
                  error: (error: Record<string, any>) => {
                    console.log(
                      `Mongoose-Profiler Error: ${JSON.stringify(error)}`,
                    );
                  },
                },
              }),
            );

            return connection;
          },
        };
      },
    });
  }

  public static forFeature(
    models: {
      name: string;
      schema: any;
      collection?: string;
    }[],
  ): DynamicModule {
    return NestMongooseModule.forFeature(models);
  }
}

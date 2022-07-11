import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { ModelName } from '../infrastructure/model.util';
import { Block } from './blocks.schema';
import { BlockDto } from './blocks.dto';

@Injectable()
export class BlocksService {
  constructor(
    @InjectModel(ModelName.Block)
    private readonly blockModel: Model<Block>,
  ) {}

  public async indexBlocks(): Promise<void> {
    const blocks = require('../../200.json');
    for (let i = 0; i < blocks.length; i++) {
      let block: BlockDto = plainToClass(BlockDto, blocks[i]);
      await this.blockModel
        .findOneAndUpdate(
          { hash: block.hash },
          { $set: { ...block } },
          { upsert: true, new: true },
        )
        .lean()
        .exec();
    }
  }

  public async getBlocksByMaxHeight(height: number): Promise<BlockDto[]> {
    return await this.blockModel
      .find({ height: { $lte: height } })
      .sort({ height: -1 })
      .lean<BlockDto[]>()
      .exec();
  }

  public async getBlocksByHash(hash: string): Promise<BlockDto> {
    return await this.blockModel.find({ hash }).lean<BlockDto>().exec();
  }
}

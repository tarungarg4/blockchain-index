import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { ModelName } from '../infrastructure/model.util';
import { Block, Transaction } from './blocks.schema';
import { BlockDto, TransactionDto, TransactionInputDto } from './blocks.dto';

@Injectable()
export class BlocksService {
  constructor(
    @InjectModel(ModelName.Block)
    private readonly blockModel: Model<Block>,
    private readonly transactionModel: Model<Transaction>,
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
      block.tx.forEach((txn) => {
        this.transactionModel.findOneAndUpdate(
          { hash: txn.txid },
          { $set: { ...txn } },
          { upsert: true, new: true },
        );
      });
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

  public async getTransactionsByBlockHeight(
    height: number,
  ): Promise<TransactionDto[]> {
    const block = await this.blockModel
      .findOne({ height: height })
      .sort({ height: -1 })
      .lean<BlockDto>()
      .exec();
    return block.tx;
  }

  public async getTransactionsByAddress(
    address: string,
  ): Promise<{ parent: TransactionDto; children?: TransactionInputDto[] }> {
    const txn = await this.transactionModel.findOne({ txid: address });
    return { parent: txn };
    //TODO: Pull vin vout transactions based on txid
  }
}

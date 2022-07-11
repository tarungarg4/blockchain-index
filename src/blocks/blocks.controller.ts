import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlocksService } from './blocks.service';

@ApiTags('Blocks')
@Controller('/blocks')
export class BlocksController {
  constructor(private readonly blockService: BlocksService) {}

  @Post()
  async indexBlocks() {
    return this.blockService.indexBlocks();
  }

  @Get()
  async getBlocks(@Query('maxHeight') maxHeight: number) {
    return this.blockService.getBlocksByMaxHeight(maxHeight);
  }

  @Get(':hash')
  async getBlockByHash(@Param('hash') hash: string) {
    return this.blockService.getBlocksByHash(hash);
  }

  @Get(':height/transactions')
  async getTransactionsByBlockHeight() {}

  @Get(':hash/transactions')
  async getTransactionsByBlockHash() {}
}

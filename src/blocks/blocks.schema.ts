import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
  BlockDto,
  NonuTransactionDto,
  ScriptPublicDto,
  ScriptSignatureDto,
  TransactionDto,
  TransactionInputDto,
  TransactionOutputDto,
} from './blocks.dto';

@Schema({
  _id: false,
  timestamps: false,
})
export class ScriptSignature implements ScriptSignatureDto {
  @Prop({
    type: String,
    required: true,
  })
  asm: string;

  @Prop({
    type: String,
    required: true,
  })
  hex: string;
}
export const ScriptSignatureSchema =
  SchemaFactory.createForClass(ScriptSignature);

@Schema({ _id: false, timestamps: false })
export class ScriptPublic implements ScriptPublicDto {
  @Prop({
    type: String,
    required: true,
  })
  asm: string;

  @Prop({
    type: String,
    required: true,
  })
  hex: string;
  @Prop({
    type: Number,
    required: false,
  })
  reqSigs?: number;

  @Prop({
    type: String,
    required: true,
  })
  type: string;
  @Prop({
    type: [String],
    required: false,
  })
  addresses?: string[];
}
export const ScriptPublicSchema = SchemaFactory.createForClass(ScriptPublic);

@Schema({ _id: false, timestamps: false })
export class TransactionOutput implements TransactionOutputDto {
  @Prop({
    type: Number,
    required: true,
  })
  value: number;

  @Prop({
    type: Number,
    required: true,
  })
  n: number;

  @Prop({
    type: ScriptPublicSchema,
    required: false,
  })
  scriptPubKey: ScriptPublicDto;

  @Prop({
    type: Number,
    required: false,
  })
  tokenID?: number;
}
export const TransactionOutputSchema =
  SchemaFactory.createForClass(TransactionOutput);

@Schema({ _id: false, timestamps: false })
export class TransactionInput implements TransactionInputDto {
  @Prop({
    type: String,
    required: false,
  })
  coinbase?: string;

  @Prop({
    type: String,
    required: false,
  })
  txid?: string;

  @Prop({
    type: Number,
    required: false,
  })
  vout?: number;
  @Prop({
    type: [String],
    required: false,
  })
  txinwitness?: string[];

  @Prop({
    type: ScriptSignatureSchema,
    required: false,
  })
  scriptSig?: ScriptSignature;

  @Prop({
    type: Number,
    required: true,
  })
  sequence: number;
}
export const TransactionInputSchema =
  SchemaFactory.createForClass(TransactionInput);

@Schema({ _id: false, timestamps: false })
export class Transaction implements TransactionDto {
  @Prop({
    type: String,
    required: true,
  })
  txid: string;
  @Prop({
    type: String,
    required: true,
  })
  hash: string;

  @Prop({
    type: Number,
    required: true,
  })
  version: number;

  @Prop({
    type: Number,
    required: true,
  })
  size: number;

  @Prop({
    type: Number,
    required: true,
  })
  vsize: number;

  @Prop({
    type: Number,
    required: true,
  })
  weight: number;

  @Prop({
    type: Number,
    required: true,
  })
  lockTime: number;

  @Prop({
    type: String,
    required: true,
  })
  hex: string;
  @Prop({
    type: [TransactionInputSchema],
    required: true,
  })
  vin: TransactionInputDto[];
  @Prop({
    type: [TransactionOutputSchema],
    required: true,
  })
  vout: TransactionOutputDto[];
}
export const TransactionSchema = SchemaFactory.createForClass(Transaction);

@Schema({ _id: false, timestamps: false })
export class NonuTransaction implements NonuTransactionDto {
  @Prop({
    type: Number,
    required: true,
  })
  AnchorReward: number;

  @Prop({
    type: Number,
    required: false,
  })
  IncentiveFunding?: number;
  @Prop({
    type: Number,
    required: false,
  })
  Burnt?: number;
}
export const NonuTransactionSchema =
  SchemaFactory.createForClass(NonuTransaction);

@Schema({ timestamps: true })
export class Block implements BlockDto {
  _id: Types.ObjectId;
  @Prop({
    type: String,
    required: true,
  })
  hash: string;

  @Prop({
    type: Number,
    required: true,
  })
  confirmations: number;

  @Prop({
    type: Number,
    required: true,
  })
  strippedsize: number;
  size: number;

  @Prop({
    type: Number,
    required: true,
  })
  weight: number;

  @Prop({
    type: Number,
    required: true,
  })
  height: number;

  @Prop({
    type: String,
    required: true,
  })
  masternode: string;
  @Prop({
    type: String,
    required: true,
  })
  minter: string;

  @Prop({
    type: Number,
    required: true,
  })
  mintedBlocks: number;
  @Prop({
    type: String,
    required: true,
  })
  stakeModifier: string;

  @Prop({
    type: Number,
    required: true,
  })
  version: number;
  @Prop({
    type: String,
    required: true,
  })
  versionHex: string;
  @Prop({
    type: String,
    required: true,
  })
  merkleroot: string;

  @Prop({
    type: [NonuTransactionSchema],
    required: true,
  })
  nonutxo: NonuTransaction[];

  @Prop({
    type: [TransactionSchema],
    required: true,
  })
  tx: Transaction[];

  @Prop({
    type: Number,
    required: true,
  })
  time: number;

  @Prop({
    type: Number,
    required: true,
  })
  mediantime: number;
  @Prop({
    type: String,
    required: true,
  })
  bits: string;

  @Prop({
    type: Number,
    required: true,
  })
  difficulty: number;
  @Prop({
    type: String,
    required: true,
  })
  chainwork: string;

  @Prop({
    type: Number,
    required: true,
  })
  nTx: number;
  @Prop({
    type: String,
    required: true,
  })
  previousblockhash: string;
  @Prop({
    type: String,
    required: true,
  })
  nextblockhash: string;
}
export const BlockSchema = SchemaFactory.createForClass(Block);

BlockSchema.index({ hash: 1 }, { unique: true, background: true });
BlockSchema.index({ height: 1 }, { background: true });

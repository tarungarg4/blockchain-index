export class ScriptSignatureDto {
  asm: string;
  hex: string;
}

export class ScriptPublicDto extends ScriptSignatureDto {
  reqSigs?: number;
  type: string;
  addresses?: string[];
}

export class TransactionOutputDto {
  value: number;
  n: number;
  scriptPubKey: ScriptPublicDto;
  tokenID?: number;
}

export class TransactionInputDto {
  coinbase?: string;
  txid?: string;
  vout?: number;
  txinwitness?: string[];
  scriptSig?: ScriptSignatureDto;
  sequence: number;
}

export class TransactionDto {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  lockTime: number;
  hex: string;
  vin: TransactionInputDto[];
  vout: TransactionOutputDto[];
}

export class NonuTransactionDto {
  AnchorReward: number;
  IncentiveFunding?: number;
  Burnt?: number;
}

export class BlockDto {
  hash: string;
  confirmations: number;
  strippedsize: number;
  size: number;
  weight: number;
  height: number;
  masternode: string;
  minter: string;
  mintedBlocks: number;
  stakeModifier: string;
  version: number;
  versionHex: string;
  merkleroot: string;
  nonutxo: NonuTransactionDto[];
  tx: TransactionDto[];
  time: number;
  mediantime: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash: string;
  nextblockhash: string;
}

/* eslint-disable camelcase */

export interface AXIOS_CONFIG {
  method: string;
  url: string;
  headers: {};
}

export type BLOCK_NUMBER = number;
export type BLOCK_HASH = string;
export interface BLOCK_TXS_RESPONSE {
  txs: Array<BITCOIN_TX>;
  count: number;
}

export type TX_HASH = string;

export interface BLOCK_TX_INDEXER {
  // Key is the transaction hash
  // Value is the count of ancestors
  [key: string]: number;
}

export interface GET_BLOCK_TXS_RESPONSE {
  txs: Array<BITCOIN_TX>;
  count: number;
}

// Transaction structure for BlockStream API

export interface BLOCK_INFO {
  id: string;
  height: number;
  version: number;
  timestamp: number;
  tx_count: number;
  size: number;
  weight: number;
  merkle_root: string;
  previousblockhash: string;
  mediantime: number;
  nonce: number;
  bits: number;
  difficulty: number;
}

export interface BITCOIN_TX {
  txid: string;
  version: number;
  locktime: number;
  vin?: Array<VIN>;
  vout?: Array<VOUT>;
  size: number;
  weight: number;
  fee: number;
  status: STATUS;
}
export interface VIN {
  txid: string;
  vout: number;
  prevout?: null;
  scriptsig: string;
  scriptsig_asm: string;
  witness?: string[] | null;
  is_coinbase: boolean;
  sequence: number;
}
export interface VOUT {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address?: string | null;
  value: number;
}
export interface STATUS {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

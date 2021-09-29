/**
 * Common types
 */
export interface AXIOS_CONFIG {
        method: string,
        url: string,
        headers: { },
};

export type BLOCK_NUMBER = number;
export type BLOCK_HASH = string;
export interface BLOCK_TXS_RESPONSE {
  txs: BITCOIN_TX, // need to fix this
  count: number,
};

export type BITCOIN_TX = any; // replace with actual tx structure

export type ADDRESS = string;

// Key is the address
// Value is immediate ancestors of this address
// export interface BLOCK_TX_INDEXER {
//  [key : ADDRESS]: Array<ADDRESS>
// }

export type BLOCK_TX_INDEXER = any;

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
  txs :any, // need to fix this
  count: number,
};

import {ADDRESS, BITCOIN_TX, BLOCK_TX_INDEXER} from './types';

/**
 * Function to index the txs in the block frpm cache
 * @param {Array<BITCOIN_TX>} cache
 */
export async function indexBlockTxs(
    cache: Array<BITCOIN_TX>,
) {
  const indexer : BLOCK_TX_INDEXER = {};

  for (let index = 0; index < cache.length; index++) {
    const tx = cache[index];
    const vin = tx.vin || [];
    const vout = tx.vout || [];
    const inputAddresses = [];
    // find input addresses
    for (let i = 0; i < vin.length; i++) {
      const input:any = vin[i];
      if (input.prevout) {
        inputAddresses.push(input.prevout.scriptpubkey_address);
      }
    }
    if (inputAddresses.length == 0) {
      inputAddresses.push('coinbase');
    }

    // index output address to have inputs as ansestors
    for (let j = 0; j < vout.length; j++) {
      const outputAddress:ADDRESS = vout[j].scriptpubkey_address;
      if (!indexer[outputAddress]) {
        indexer[outputAddress] = [];
      }
      indexer[outputAddress] = [
        ...indexer[outputAddress],
        ...inputAddresses,
      ];
    }
  }

  return indexer;
}

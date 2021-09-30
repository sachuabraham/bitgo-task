import {BITCOIN_TX, BLOCK_TX_INDEXER} from './types';

/**
 * Function to index the txs in the block from cache
 * @param {Array<BITCOIN_TX>} cache
 * @return {BLOCK_TX_INDEXER}
 */
export async function indexBlockTxs(
    cache: Array<BITCOIN_TX>,
) {
  const indexer : BLOCK_TX_INDEXER = {};

  // Fetches each tx iteratively from cache
  // Looks for input UTXOs and increments count
  // if previous ancestors where found in the block
  for (let index = 0; index < cache.length; index++) {
    const tx = cache[index];
    indexer[tx.txid] = 0;
    const inputs = tx.vin || [];

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.is_coinbase) {
        continue;
      }
      // eslint-disable-next-line max-len
      const ancestorCount = indexer[input.txid] >=0 ? (indexer[input.txid] + 1): 0;
      indexer[tx.txid] += ancestorCount;
    }
  }
  return indexer;
}

import {
  ANCESTOR_COUNT,
  BITCOIN_TX,
  BLOCK_ANCESTOR_COUNT,
  BLOCK_TX_INDEXER,
} from './types';


/**
 * Comparator for index sort descending
 * @param {ANCESTOR_COUNT} a
 * @param {ANCESTOR_COUNT} b
 * @return {number}
 */
function sorter(
    a:ANCESTOR_COUNT,
    b:ANCESTOR_COUNT) {
  return b.count - a.count;
}


/**
 * Convert index to array
 * @param {BLOCK_TX_INDEXER} a
 * @return {BLOCK_ANCESTOR_COUNT}
 */
function indexToArray(
    a:BLOCK_TX_INDEXER) {
  const ancestorCounts: BLOCK_ANCESTOR_COUNT = [];
  Object.keys(a).map((key: string) => {
    ancestorCounts.push({
      hash: key,
      count: a[key],
    });
  });
  return ancestorCounts;
}

/**
 * Function to find ancestors in a block
 * @param {Array<BITCOIN_TX>} cache
 * @return {BLOCK_ANCESTOR_COUNT}
 */
export async function findAncestors(
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
  const ancestorCounts = indexToArray(indexer).sort(sorter);
  return ancestorCounts;
}

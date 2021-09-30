/**
 * Starter script to find the transactions
 */

import {
  getBlockHashFromBlockNumber,
  getBlockInfoFromBlockHash,
  getBlockTxsFromBlockHash,
} from './src/bitcoin_apis';
import {indexBlockTxs} from './src/tx_index';
import {
  BITCOIN_TX, BLOCK_NUMBER,
  GET_BLOCK_TXS_RESPONSE,
} from './src/types';

// We can use redis / any other persistance layer in place here
// in order to bypass rate limiting issues
let cache:Array<BITCOIN_TX> = [];

/**
 * Function to find ancestry list from a bitcoin block
 * @param {BLOCK_NUMBER}blockNumber
 */
async function findAncestry(blockNumber: BLOCK_NUMBER) {
  const blockHash = await getBlockHashFromBlockNumber(blockNumber);
  const blockInfo = await getBlockInfoFromBlockHash(blockHash);
  let getBlockTxs: GET_BLOCK_TXS_RESPONSE;
  let index = 0;
  const txCount = blockInfo?.tx_count;
  console.log('Total Transaction Count found ', txCount);

  // Iterates through all txs in that block 25 at a time
  do {
    // we could use Promise.All here if we know exactly how
    // is the rate limiting. For now calling it serially
    getBlockTxs = await getBlockTxsFromBlockHash(blockHash, index);
    if (getBlockTxs.txs.length) {
      const txs = getBlockTxs.txs;
      cache = [...cache, ...txs];
      console.log(`Loaded transaction from index ${index} to ${index +25}`);
    }
    index += 25;
  } while (getBlockTxs.txs.length &&
    index <txCount
  );
  const indexedTxs = await indexBlockTxs(cache);
  // index all transactions with key address and output array of ansestors
  console.log(indexedTxs);
}


findAncestry(680000);

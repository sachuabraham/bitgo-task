/**
 * Starter script to find the transactions
 */

import {
  getBlockHashFromBlockNumber,
  getBlockTxsFromBlockHash,
} from './src/bitcoin_apis';
import {BLOCK_NUMBER, BLOCK_TXS_RESPONSE} from './src/types';

// We can use redis / any other persistance layer in place here
// in order to bypass rate limiting issues
const cache:any = [];

/**
 * Function to find ancestry list from a bitcoin block
 * @param {BLOCK_NUMBER}blockNumber
 */
async function findAncestry(blockNumber: BLOCK_NUMBER) {
  const blockHash = await getBlockHashFromBlockNumber(blockNumber);
  let getBlockTxs: BLOCK_TXS_RESPONSE | false;
  let index = 0;

  // Iterates through all txs in that block 25 at a time
  do {
    // we could use Promise.All here if we know exactly how
    // is the rate limiting. For now calling it serially
    getBlockTxs = await getBlockTxsFromBlockHash(blockHash, index);
    if (getBlockTxs) {
      cache.push(getBlockTxs.txs);
      console.log('tx count', index);
    }
    index += 25;
  } while (getBlockTxs && index < 150); // 150 just for testing purposes
  console.log(cache);
}


findAncestry(680000);

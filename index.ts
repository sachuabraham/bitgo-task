/**
 * Starter script to find the transactions
 */

import {
  getBlockHashFromBlockNumber,
  getBlockTxsFromBlockHash,
} from './src/bitcoin_apis';
import {indexBlockTxs} from './src/tx_index';
import {BITCOIN_TX, BLOCK_NUMBER, BLOCK_TXS_RESPONSE} from './src/types';

// We can use redis / any other persistance layer in place here
// in order to bypass rate limiting issues
let cache:Array<BITCOIN_TX> = [];

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
      cache = [...cache, ...getBlockTxs.txs];
      console.log('tx count', index);
    }
    index += 25;
  } while (getBlockTxs && index < 150); // 150 just for testing purposes
  const indexedTxs = await indexBlockTxs(cache);
  // index all transactions with key address and output array of ancestors
  console.log(indexedTxs);
}


findAncestry(680000);

/**
 * Starter script to find the transactions
 */

import {
  getBlockHashFromBlockNumber,
  getBlockTxsFromBlockHash,
} from './src/bitcoin_apis';
import {BLOCK_NUMBER} from './src/types';


/**
 * Function to find ancestry list from a bitcoin block
 * @param {BLOCK_NUMBER}blockNumber
 */
async function findAncestry(blockNumber: BLOCK_NUMBER) {
  const blockHash = await getBlockHashFromBlockNumber(blockNumber);
  const getBlockTxs = await getBlockTxsFromBlockHash(blockHash, 0);
  console.log(getBlockTxs);
}


findAncestry(680000);

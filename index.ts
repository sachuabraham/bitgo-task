/**
 * Starter script to find the transactions
 */

import {
  getBlockHashFromBlockNumber,
  getBlockInfoFromBlockHash,
  getBlockTxsFromBlockHash,
} from './src/bitcoin_apis';
import {BLOCK_NUMBER as blockNumber, TOP_ENTRIES} from './src/constants';
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
 * @param {number} count Number of top hits to return
 */
async function findAncestry(blockNumber: BLOCK_NUMBER, count : number) {
  console.log(`Started Script for blocknumber ${blockNumber} for top ${count}`);
  const blockHash = await getBlockHashFromBlockNumber(blockNumber);
  if (!blockHash) {
    console.error(`Block Not found. Enter a valid block`);
    process.exit(0);
  }
  console.log(`Block hash for block ${blockNumber} is ${blockHash}`);
  const blockInfo = await getBlockInfoFromBlockHash(blockHash);
  let getBlockTxs: GET_BLOCK_TXS_RESPONSE;
  let index = 0;
  const txCount = blockInfo?.tx_count;
  console.log('Total Transaction Count found in the block', txCount);
  console.log('Starting load transactions from block stream API');

  // Iterates through all txs in that block 25 at a time
  do {
    // we could use Promise.All here if we know exactly what
    // is the rate limiting. For now calling it serially
    getBlockTxs = await getBlockTxsFromBlockHash(blockHash, index);
    if (getBlockTxs.txs.length) {
      const txs = getBlockTxs.txs;
      cache = [...cache, ...txs];
      console.log(
          `Loaded block transactions from index ${index} to ${index +25}`);
    }
    index += 25;
  } while (getBlockTxs.txs.length &&
    index <txCount
  );
  const indexedTxs = await indexBlockTxs(cache);
  // index all transactions with key address and output array of ancestors
  for (let index = 0; index < indexedTxs.length && index < count; index++) {
    console.log(
        // eslint-disable-next-line max-len
        `Top :#${index+1} Hash = ${indexedTxs[index].hash} Count = ${indexedTxs[index].count}`);
  }
}


findAncestry(blockNumber, TOP_ENTRIES);

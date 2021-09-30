/**
 * File which contains different bitcoin utility REST APIs
 */

import {BITCOIN_UTILITY_API_URL} from './constants';
import {AXIOS_CONFIG, BLOCK_HASH} from './types';
import {doGetApiCall} from './utils/rest_api_caller';

/**
 * Function to get block hash from block height
 * @param {BLOCK_NUMBER} blockHeight
 * @param {string} apiUrl
 */
export async function getBlockHashFromBlockNumber(
    blockHeight : number,
    apiUrl = BITCOIN_UTILITY_API_URL,
) {
  try {
    const config:AXIOS_CONFIG = {
      method: 'get',
      url: `${apiUrl}/block-height/${blockHeight}`,
      headers: { },
    };
    const hash = await doGetApiCall(config);
    return hash;
  } catch (err) {
    console.log(err);
    return false;
  }
}


/**
 * Function to get block info from block hash
 * @param {BLOCK_HASH} blockHash
 * @param {string} apiUrl
 * @return {BLOCK_INFO}
 */
export async function getBlockInfoFromBlockHash(
    blockHash : BLOCK_HASH,
    apiUrl = BITCOIN_UTILITY_API_URL,
) {
  try {
    const config:AXIOS_CONFIG = {
      method: 'get',
      url: `${apiUrl}/block/${blockHash}`,
      headers: { },
    };
    const hash = await doGetApiCall(config);
    return hash;
  } catch (err) {
    console.log(err);
    return false;
  }
}


/**
 * Function to get block txs from a specif index
 * @dev Kindly note the API return 25 txs at a time
 * @param {BLOCK_HASH} blockHash
 * @param {number} index
 * @param {string} apiUrl
 * @return {GET_BLOCK_TXS_RESPONSE}
 */
export async function getBlockTxsFromBlockHash(
    blockHash: BLOCK_HASH,
    index = 0,
    apiUrl = BITCOIN_UTILITY_API_URL,
) {
  try {
    const config:AXIOS_CONFIG = {
      method: 'get',
      url: `${apiUrl}/block/${blockHash}/txs/${index}`,
      headers: { },
    };
    const txs = await doGetApiCall(config);

    return {
      txs: txs || [],
      count: txs.length || 0,
    };
  } catch (err:any) {
    console.log(err.data);
    return {
      txs: false,
      count: 0,
    };
  }
}


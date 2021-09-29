/**
 * File which contains different bitcoin utility REST APIs
 */

import {BITCOIN_UTILITY_API_URL} from './constants';
import {AXIOS_CONFIG} from './types';
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
  const config:AXIOS_CONFIG = {
    method: 'get',
    url: `${apiUrl}/block-height/${blockHeight}`,
    headers: { },
  };
  return await doGetApiCall(config);
}

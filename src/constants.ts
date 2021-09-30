/**
 * Constants used in this application
 *
 */

require('dotenv').config();


export const BITCOIN_UTILITY_API_URL = 'https://blockstream.info/api';
export const BLOCK_NUMBER = parseInt(process.env.BLOCK_NUMBER || '680000');
export const TOP_ENTRIES = parseInt(process.env.TOP_ENTRIES || '10');

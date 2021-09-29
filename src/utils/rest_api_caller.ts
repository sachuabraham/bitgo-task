import {AXIOS_CONFIG} from '../types';

const axios = require('axios');

/**
 * Function to make GET API calls
 * @param {AXIOS_CONFIG} config
 */
export async function doGetApiCall(config:AXIOS_CONFIG) {
  try {
    const response = await axios(config);
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}


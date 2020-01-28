import axios from 'axios';
import config from '../config';

const { randomUserAPIURL } = config;
const validateStatus = () => true;

/**
 * Get random 100 random users from randomUsers API
 */
export const getRandomUsers = async () => {
  try {
    const url = `${randomUserAPIURL}`;
    const { data: response } = await axios({
      method: 'get',
      url,
      params: {
        results: 100,
      },
      validateStatus,
    });

    return response;
  } catch (error) {
    return error;
  }
};

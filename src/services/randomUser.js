import axios from 'axios';
import config from '../config';

const { randomUserAPIURL } = config;
const validateStatus = () => true;

export const getRandomUsers = async () => {
  try {
    const url = `${randomUserAPIURL}/?results=100`;
    const { data: response } = await axios({
      method: 'get',
      url,
      validateStatus,
    });

    return response;
  } catch (e) {
    return e;
  }
};

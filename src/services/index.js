import axios from 'axios';
import config from '../config';
const validateStatus = () => true;

// export const apiCall = () => new Promise (async( resolve, reject) => {
//   try {
//     const {data: response} = await axios({
//       method,
//       url,
//       validateStatus,
//       ....
//     });

//     resolve(response);
//   } catch (error) {
//     reject(error);
//   }
// });
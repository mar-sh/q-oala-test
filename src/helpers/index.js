/**
 *
 * @param {Object} obj Input Object
 * @param {Array} shownAttributes Array of attributes to show
 * @return {Object} Object with attributes that are in shownAttributes array, will return the original input object if no attributes is found
 */
export const getAttributesShown = (obj, shownAttributes = []) => {
  const results = {};

  for (const key in obj) {
    if (shownAttributes.includes(key)) {
      results[key] = obj[key];
    }
  }

  return Object.keys(results).length ? results : obj;
};

/**
 *
 * @param {String} key localStorage key name
 * @return {Object | Array} parsed localStorage item
 */
export const getLocalStorageItem = key => {
  const results = JSON.parse(localStorage.getItem(key));

  return results;
};

/**
 *
 * @param {String} key localStorage key name
 * @param {Object | Array} data data input to store in localStorage
 * @return {null}
 */
export const writeToLocalStorage = (key, data) => {
  const JSONdata = JSON.stringify(data);

  localStorage.setItem(key, JSONdata);
};

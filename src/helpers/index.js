export const getAttributesShown = (obj, shownAttributes = []) => {
  const results = {};

  for (const key in obj) {
    if (shownAttributes.includes(key)) {
      results[key] = obj[key];
    }
  }

  return results;
};

export const getLocalStorageItem = key => {
  const results = JSON.parse(localStorage.getItem(key));

  return results;
};

export const writeToLocalStorage = (key, data) => {
  const JSONdata = JSON.stringify(data);

  localStorage.setItem(key, JSONdata);
};

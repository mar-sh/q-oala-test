export const getAttributesShown = (obj, shownAttributes = []) => {
  const results = {};
  for (const key in obj) {
    if (shownAttributes.includes(key)) {
      results[key] = obj[key];
    }
  }
  return results;
};

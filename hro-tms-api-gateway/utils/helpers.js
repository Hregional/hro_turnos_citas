export const replaceSpacesForUrl = (inputString) => {
  return inputString.replace(/\s/g, "%20");
};

export const buildQueryStrinParams = (params) => {
  let queryString = "?";
  for (const [key, value] of Object.entries(params)) {
    queryString += `${value && key + "=" + value + "&"}`.trim();
  }
  return replaceSpacesForUrl(queryString);
};

export const formatDate = (dateString, format) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formats = {
    "YYYY-MM-DD": `${year}-${month}-${day}`,
    "DD/MM/YYYY": `${day}/${month}/${year}`,
    "MM/DD/YYYY": `${month}/${day}/${year}`,
  };
  return formats[format];
};

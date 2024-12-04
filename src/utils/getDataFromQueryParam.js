export const getDataFromQueryParam = (paramName) => {
  const queryParams = new URLSearchParams(window.location.search);
  const paramValue = queryParams.get(paramName);
  return paramValue ? paramValue : null;
};

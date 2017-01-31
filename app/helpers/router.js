export function replaceUrlParams(url, params) {
  let newUrl = url;
  Object.keys(params).forEach((key) => {
    const paramVal = params[key] || '';
    const pattern = new RegExp(`\\b(${key}=).*?(&|$)`);
    if (newUrl.search(pattern) >= 0) {
      newUrl = newUrl.replace(pattern, `$1${paramVal}$2`);
    } else {
      newUrl += `${(newUrl.indexOf('?') > 0 ? '&' : '?')}${key}=${paramVal}`;
    }
  });
  return newUrl;
}

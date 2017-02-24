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

export function toggleParams(action, targetParam, route) {
  const path = route.pathname.split('/').filter(Boolean);
  let url = '';
  if (route.pathname.indexOf(targetParam) > -1 && action !== targetParam) {
    const index = path.indexOf(targetParam);
    path.splice(index, 1);
    path.forEach(function (param) {
      url += `/${param}`;
    });
  } else if (route.pathname.indexOf(targetParam) === -1 && action === targetParam) {
    path.forEach(function (param) {
      url += `/${param}`;
    });
    url += `/${action}`;
  }
  url += route.search;
  return url;
}

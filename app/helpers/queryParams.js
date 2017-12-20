const esc = encodeURIComponent;

function mapQueryParam(key, value) {
  return `${esc(key)}=${esc(value)}`;
}

export function queryParams(params) {
  return Object.keys(params)
    .reduce((acc, key) => {
      const value = params[key];

      if (Array.isArray(value)) {
        value.forEach((v) => {
          acc.push(mapQueryParam(key, v));
        });
      } else {
        acc.push(mapQueryParam(key, value));
      }

      return acc;
    }, []).join('&');
}

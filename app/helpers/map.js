import { ENDPOINT_SQL } from 'constants/map';

export function getSqlQuery(query) {
  return fetch(ENDPOINT_SQL + query).then(res => res.json());
}

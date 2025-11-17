export function buildQueryString(params: Record<string, any>): string {
  const queryString = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      queryString.append(key, params[key].toString());
    }
  }
  return queryString.toString();
}

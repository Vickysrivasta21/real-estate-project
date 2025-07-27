const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchData(endpoint, options = {}) {
  return fetch(`${BASE_URL}${endpoint}`, options);
}

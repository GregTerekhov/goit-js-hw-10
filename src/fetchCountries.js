const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER_CONFIG = {
  name,
  capital,
  population,
  flags,
  languages,
};

export function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/name/${name}?fields=${Object.keys(FILTER_CONFIG)}`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return response.json();
  });
}

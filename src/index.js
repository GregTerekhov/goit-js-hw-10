import debounce from 'lodash.debounce';
import Notiflix, { Loading } from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
// const FILTER_CONFIG = {
//   name: name.official,
//   city: capital,
//   population,
//   flags: {
//     svg,
//   },
//   languages,
// };
const BASE_URL = 'https://restcountries.com/v2';

const refs = {
  inputEl: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countriesInfo: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInputData, DEBOUNCE_DELAY));

function onInputData() {
  const country = refs.inputEl.value.trim();
  if (!country) {
    refs.countriesList.innerHTML = '';
    refs.countriesInfo.innerHTML = '';
    return;
  }
  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  fetchCountries(country).then(renderCountriesName);
}

function renderCountriesName(countriesName) {
  const markup = countriesName
    .map(({ name, flags }) => {
      return `<li><img src="${flags}" alt="${flags}" width="25" height="15"><span>${name}</span></li>`;
    })
    .join('');
  refs.countriesList.innerHTML = markup;
}

// ${refs.country}?fields=${FILTER_CONFIG}

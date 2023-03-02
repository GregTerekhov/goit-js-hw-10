import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
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

  return fetchCountries(country).then(renderCountriesName);
}

function renderCountriesName(countriesName) {
  if (countriesName.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countriesName > 2 && countriesName <= 10) {
    renderCountryIdentification(countriesName);
  } else {
    renderCountryIdentification(countriesName);
    renderCountryData(countriesName);
  }
}

function renderCountryIdentification(countriesName) {
  const markupCountry = countriesName
    .map(({ name, flags }) => {
      return `<li><img src="${flags.svg}" alt="${name.common}" width="25" height="15"><span>${name.official}</span></li>`;
    })
    .join('');
  refs.countriesList.innerHTML = markupCountry;
}

function renderCountryData(countriesName) {
  const markupInfo = countriesName
    .map(({ capital, population, languages }) => {
      return `<p>${capital}</p><p>${population}</p><p>${Object.values(
        languages
      ).join('')}</p>`;
    })
    .join('');
  refs.countriesInfo.innerHTML = markupInfo;
}

// ${refs.country}?fields=${FILTER_CONFIG}

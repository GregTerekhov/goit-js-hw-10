import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

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

  return fetchCountries(country)
    .then(renderCountriesName)
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function renderCountriesName(countriesName) {
  if (countriesName.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countriesName.length >= 2 && countriesName.length <= 10) {
    renderCountryIdentification(countriesName);
    refs.countriesInfo.innerHTML = ''; // це для очищення непотрібної розмітки, коли після вибору валідного значення інпуту відображався варіант з однією країною і додатковою інформацією, а після віднімання однієї літери умова відображення змінилась
  } else {
    renderCountryIdentification(countriesName);
    renderCountryData(countriesName);
  }
}

function renderCountryIdentification(countriesName) {
  const markupCountry = countriesName
    .map(({ name, flags }) => {
      return `<li class = "country-list__item"><img src="${flags.svg}" alt="${name.common}" width="60" height="45"><span class = "country-list__name">${name.official}</span></li>`;
    })
    .join('');
  refs.countriesList.innerHTML = markupCountry;
}

function renderCountryData(countriesName) {
  const markupInfo = countriesName
    .map(({ capital, population, languages }) => {
      return `<p class = "country-info__data"><b>Capital:</b> ${capital}</p><p class = "country-info__data"><b>Population:</b> ${population}</p><p class = "country-info__data"><b>Languages:</b> ${Object.values(
        languages
      ).join(', ')}</p>`;
    })
    .join('');
  refs.countriesInfo.innerHTML = markupInfo;
}

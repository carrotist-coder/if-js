import { initGuestsDropdown } from './modules';
import { fetchPopularHotels } from './utils';
import { fetchHotels } from './modules';

initGuestsDropdown();

document.querySelector('.search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  fetchHotels();
});

document.addEventListener('DOMContentLoaded', fetchPopularHotels);

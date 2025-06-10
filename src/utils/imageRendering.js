import { hotelsNameBubbleSort } from './bubbleSort.js';

export const renderHotels = (hotels, container) => {
  container.innerHTML = '';

  if (!hotels || hotels.length === 0) {
    const nothingFound = document.createElement('div');
    nothingFound.className = 'nothing-found';
    nothingFound.textContent = 'Nothing found...';
    container.appendChild(nothingFound);
    return;
  }

  let sortedHotels = hotelsNameBubbleSort(hotels);
  sortedHotels.forEach((hotel) => {
    const card = document.createElement('div');
    card.classList.add('homes-guests-card');
    card.innerHTML = `
      <figure>
        <img src="${hotel.imageUrl}" alt="${hotel.name} picture" />
        <figcaption>
          <p>${hotel.name}</p>
          <p>${hotel.city}, ${hotel.country}</p>
        </figcaption>
      </figure>
    `;
    container.appendChild(card);
  });
};

const fetchPopularHotels = () => {
  const container = document.querySelector('.homes-guests .cards');

  const cachedData = sessionStorage.getItem('popularHotels');
  if (cachedData) {
    const hotels = JSON.parse(cachedData);
    renderHotels(hotels, container);
    return;
  }

  fetch('https://if-student-api.onrender.com/api/hotels/popular')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      sessionStorage.setItem('popularHotels', JSON.stringify(data));
      renderHotels(data, container);
    })
    .catch((error) => {
      console.error('Fetch error: ', error);
      container.innerHTML = '<p>Не удалось загрузить данные.</p>';
    });
};

document.addEventListener('DOMContentLoaded', fetchPopularHotels);

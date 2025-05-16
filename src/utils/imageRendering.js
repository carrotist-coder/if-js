const renderPopularHotels = (hotelsData, container) => {
  container.innerHTML = '';

  if (!hotelsData || hotelsData.length === 0) {
    container.innerHTML = '<p>Не удалось загрузить данные.</p>';
    return;
  }

  hotelsData.forEach((hotel) => {
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

  fetch('https://if-student-api.onrender.com/api/hotels/popular')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      renderPopularHotels(data, container);
    })
    .catch((error) => {
      console.error('Fetch error: ', error);
      container.innerHTML = '<p>Не удалось загрузить данные.</p>';
    });
};

document.addEventListener('DOMContentLoaded', fetchPopularHotels);

const renderPopularHotelCard = (hotel, container) => {
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
};

const renderError = (container) => {
  container.innerHTML = '<p>Не удалось загрузить данные.</p>';
};

const fetchPopularHotels = async (container) => {
  try {
    const response = await fetch(
      'https://if-student-api.onrender.com/api/hotels/popular',
    );
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }
    const data = await response.json();
    data.forEach((hotel) => renderPopularHotelCard(hotel, container));
  } catch (error) {
    console.error('Fetch error: ', error);
    renderError(container);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.homes-guests .cards');
  fetchPopularHotels(container);
});

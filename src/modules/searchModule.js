import { counts, renderHotels } from '../utils';

export const fetchHotels = () => {
  const search = document.getElementById('destination').value.trim();
  const adults = counts.adults;
  const rooms = counts.rooms;
  const childrenAges = [];

  document.querySelectorAll('.child-age-select').forEach((select) => {
    childrenAges.push(select.value);
  });

  const url = new URL('https://if-student-api.onrender.com/api/hotels');
  url.searchParams.append('search', search);
  url.searchParams.append('adults', adults);
  url.searchParams.append('rooms', rooms);
  if (childrenAges.length > 0) {
    url.searchParams.append('children', childrenAges.join(','));
  }

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Error status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      renderHotels(data, document.querySelector('.available-hotels .cards'));
    })
    .catch((error) => {
      console.error('Error fetching hotels:', error);
    });
};

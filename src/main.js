import { counts, limits } from './utils/consts';

const descriptionInput = document.getElementById('description');
const dropdown = document.getElementById('guests-dropdown');
const childAgeContainer = document.getElementById('child-age-container');
const childAgeSelects = document.getElementById('child-age-selects');

const updateDisplay = () => {
  const map = {
    adults: 'adults-count',
    children: 'children-count',
    rooms: 'rooms-count',
  };

  Object.keys(counts).forEach((key) => {
    const value = counts[key];
    const span = document.getElementById(map[key]);
    span.innerText = value;

    const row = span.closest('.guests-row');
    const incBtn = row.querySelector('.guests-btn-increase');
    const decBtn = row.querySelector('.guests-btn-decrease');

    // Проверка на максимум
    if (value >= limits[key].max) {
      incBtn.classList.add('guests-btn-disabled');
      incBtn.disabled = true;
    } else {
      incBtn.classList.remove('guests-btn-disabled');
      incBtn.disabled = false;
    }

    // Проверка на минимум
    if (value <= limits[key].min) {
      decBtn.classList.add('guests-btn-disabled');
      decBtn.disabled = true;
    } else {
      decBtn.classList.remove('guests-btn-disabled');
      decBtn.disabled = false;
    }
  });
};

const createAgeSelect = () => {
  const select = document.createElement('select');
  select.className = 'child-age-select';

  for (let i = 0; i <= 17; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${i} years old`;
    select.appendChild(option);
  }

  childAgeSelects.appendChild(select);
};

const removeLastAgeSelect = () => {
  if (childAgeSelects.lastChild) {
    childAgeSelects.removeChild(childAgeSelects.lastChild);
  }
};

const updateChildrenVisuals = () => {
  if (counts.children > 0) {
    childAgeContainer.style.display = 'flex';
    while (childAgeSelects.childElementCount < counts.children) {
      createAgeSelect();
    }
    while (childAgeSelects.childElementCount > counts.children) {
      removeLastAgeSelect();
    }
  } else {
    childAgeContainer.style.display = 'none';
    childAgeSelects.innerHTML = '';
  }
};

const renderHotelCards = (hotels, container) => {
  container.innerHTML = '';
  if (!hotels || hotels.length === 0) {
    const nothingFound = document.createElement('div');
    nothingFound.className = 'nothing-found';
    nothingFound.textContent = 'Nothing found...';
    container.appendChild(nothingFound);
    return;
  }
  hotels.forEach((hotel) => {
    const card = document.createElement('figure');
    card.className = 'homes-guests-card';
    card.innerHTML = `
      <img src="${hotel.imageUrl}" alt="${hotel.name}">
      <figcaption>
        <p>${hotel.name}</p>
        <p>${hotel.country}, ${hotel.city}</p>
      </figcaption>
    `;
    container.appendChild(card);
  });
};

const fetchHotels = (search) => {
  const url = `https://if-student-api.onrender.com/api/hotels?search=${encodeURIComponent(search)}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Error status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      renderHotelCards(
        data,
        document.querySelector('.available-hotels .cards'),
      );
    })
    .catch((error) => {
      console.error('Error fetching hotels:', error);
    });
};

// Показ фильтров
descriptionInput.addEventListener('click', () => {
  dropdown.style.display = 'block';
  const rect = descriptionInput.getBoundingClientRect();
  dropdown.style.top = rect.bottom + window.scrollY + 'px';
  dropdown.style.left = rect.left + 'px';
});

document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target) && e.target !== descriptionInput) {
    dropdown.style.display = 'none';
  }
});

document.querySelectorAll('.guests-row').forEach((row) => {
  const labelElement = row.querySelector('label');
  if (!labelElement) return;

  const label = labelElement.innerText.toLowerCase();
  const increaseBtn = row.querySelector('.guests-btn-increase');
  const decreaseBtn = row.querySelector('.guests-btn-decrease');

  if (!increaseBtn || !decreaseBtn) return;

  increaseBtn.addEventListener('click', () => {
    if (counts[label] < limits[label].max) {
      counts[label]++;
      updateDisplay();
      if (label === 'children') updateChildrenVisuals();
    }
  });

  decreaseBtn.addEventListener('click', () => {
    if (counts[label] > limits[label].min) {
      counts[label]--;
      updateDisplay();
      if (label === 'children') updateChildrenVisuals();
    }
  });
});

document.querySelector('.search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const searchQuery = document.getElementById('destination').value.trim();
  if (searchQuery) {
    fetchHotels(searchQuery);
  }
});

updateDisplay();
updateChildrenVisuals();

import { counts, limits } from './utils/consts.js';
import { renderHotels } from './utils/imageRendering.js';

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

  descriptionInput.value = `${counts.adults} Adult${counts.adults !== 1 ? 's' : ''} — ${counts.children} Child${counts.children !== 1 ? 'ren' : ''} — ${counts.rooms} Room${counts.rooms !== 1 ? 's' : ''}`;
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

const fetchHotels = () => {
  const search = document.getElementById('destination').value.trim();
  const adults = counts.adults;
  const rooms = counts.rooms;

  const childrenAges = [];
  const ageSelects = document.querySelectorAll('.child-age-select');
  ageSelects.forEach((select) => {
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
  fetchHotels();
});

updateDisplay();
updateChildrenVisuals();

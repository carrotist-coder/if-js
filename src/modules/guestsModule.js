import { counts, limits } from '../utils';

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

    if (value >= limits[key].max) {
      incBtn.classList.add('guests-btn-disabled');
      incBtn.disabled = true;
    } else {
      incBtn.classList.remove('guests-btn-disabled');
      incBtn.disabled = false;
    }

    if (value <= limits[key].min) {
      decBtn.classList.add('guests-btn-disabled');
      decBtn.disabled = true;
    } else {
      decBtn.classList.remove('guests-btn-disabled');
      decBtn.disabled = false;
    }
  });

  const descriptionInput = document.getElementById('description');
  descriptionInput.value = `${counts.adults} Adult${counts.adults !== 1 ? 's' : ''} — ${counts.children} Child${counts.children !== 1 ? 'ren' : ''} — ${counts.rooms} Room${counts.rooms !== 1 ? 's' : ''}`;
};

const createAgeSelect = () => {
  const childAgeSelects = document.getElementById('child-age-selects');
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
  const childAgeSelects = document.getElementById('child-age-selects');
  if (childAgeSelects.lastChild) {
    childAgeSelects.removeChild(childAgeSelects.lastChild);
  }
};

export const initGuestsDropdown = () => {
  const dropdown = document.getElementById('guests-dropdown');
  const descriptionInput = document.getElementById('description');
  const childAgeContainer = document.getElementById('child-age-container');

  const updateChildrenUI = () => {
    if (counts.children > 0) {
      childAgeContainer.style.display = 'flex';
      while (
        document.querySelectorAll('.child-age-select').length < counts.children
      ) {
        createAgeSelect();
      }
      while (
        document.querySelectorAll('.child-age-select').length > counts.children
      ) {
        removeLastAgeSelect();
      }
    } else {
      childAgeContainer.style.display = 'none';
      document.getElementById('child-age-selects').innerHTML = '';
    }
  };

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
        if (label === 'children') updateChildrenUI();
      }
    });

    decreaseBtn.addEventListener('click', () => {
      if (counts[label] > limits[label].min) {
        counts[label]--;
        updateDisplay();
        if (label === 'children') updateChildrenUI();
      }
    });
  });

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

  updateDisplay();
  updateChildrenUI();
};

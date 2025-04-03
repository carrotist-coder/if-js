import { data } from '../consts/hotelsArray.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.homes-guests .cards');

  data.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('homes-guests-card');
    card.innerHTML = `
      <figure>
        <img src="${item.imageUrl}" alt="${item.name} picture" />
        <figcaption>
          <p>${item.name}</p>
          <p>${item.city}, ${item.country}</p>
        </figcaption>
      </figure>
    `;
    container.appendChild(card);
  });
});

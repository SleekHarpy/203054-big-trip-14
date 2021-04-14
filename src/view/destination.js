const generationDestination = (point) => {
  if (point.destination.description.length > 0) {
    return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${point.destination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${point.destination.photos.map((item) => `
              <img class="event__photo" src="${item.src}" alt="${item.destination}">
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  return '';
};

export default generationDestination;

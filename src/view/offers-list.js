import {offers} from '../mock/point';
import {findOffersFoType} from '../utils/point';

const generateOffersElement = (point) => {
  const typeOffers = findOffersFoType(offers, point.type);
  const offersChecked = point.offers;
  // console.log(offersChecked.some((el) => el.isChecked));

  if (typeOffers.length !== 0) {
    return `
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersChecked.map((item) => `
              <div class="event__offer-selector">
                <input
                  class="event__offer-checkbox  visually-hidden"
                  id="event-offer-luggage-${item.price}"
                  type="checkbox"
                  name="event-offer-luggage"
                   ${item.isChecked ? 'checked' : ''}
                   data-offer-title="${item.title}"
                >
                <label class="event__offer-label" for="event-offer-luggage-${item.price}">
                  <span class="event__offer-title">${item.title} +&euro; </span>
                  <span class="event__offer-price">${item.price}</span>
                </label>
              </div>
            `).join('')}
          </div>
        </section>
      `;
  }
  return '';
};

export default generateOffersElement;

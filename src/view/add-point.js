import generateOffersElement from './offers-list';
import generationDestination from './destination';
import { CITIES, TYPES } from '../mock/point';
import dayjs from 'dayjs';
import { offersArr } from '../mock/offersArr';

const generateCityOptions = CITIES.map((city) => `
  <option value="${city}"></option>
`).join('');

export const createAddPointElement = (point) => {
  const { destination, type } = point;
  const checkedType = point.type;
  const currentTime = dayjs().format('DD/MM/YY HH:mm');
  const currentTypeOffers = offersArr.find((item) => item.type === type).offers;

  const typeElements = TYPES.map((item) => `
    <div class="event__type-item">
      <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}" ${item === checkedType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
    </div>
  `).join('');

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${checkedType.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                ${typeElements}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${checkedType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="${checkedType.toLowerCase()}" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1"
              ${generateCityOptions}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${currentTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${currentTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>

          ${generateOffersElement(currentTypeOffers, point.offers)}

          ${generationDestination(point)}

        </section>
      </form>
    </li>
  `;
};

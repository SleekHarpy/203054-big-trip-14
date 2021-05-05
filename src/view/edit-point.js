import generateOffersElement from './offers-list';
import generationDestination from './destination';
import {CITIES, generateDescription, generatePictures, offers, TYPES} from '../mock/point';
import dayjs from 'dayjs';
import {findOffersFoType} from '../utils/point';
import SmartView from './smart';

const generateCityOptions = CITIES.map((city) => `
  <option value="${city}"></option>
`).join('');

const createPointFormElement = (data) => {
  const { destination, dateFrom, dateTo, basePrice } = data;
  const checkedType = data.type;
  // const currentTime = dayjs().format('DD/MM/YY HH:mm');

  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YY HH:mm');
  };

  const typeElements = TYPES.map((item) => `
    <div class="event__type-item">
      <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}" ${item === checkedType || item.toLowerCase() === checkedType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
    </div>
  `).join('');

  return (
    `<li class="trip-events__item">
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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${generateCityOptions}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

          ${generateOffersElement(data)}

          ${generationDestination(data)}

        </section>
      </form>
    </li>`
  );
};

export default class EditPoint extends SmartView{
  constructor(point) {
    super();
    this._data = EditPoint.parsePointToData(point);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._pointTypeToggleHandler = this._pointTypeToggleHandler.bind(this);
    this._pointCityToggleHandler = this._pointCityToggleHandler.bind(this);
    this._pointOfferToggleHandler = this._pointOfferToggleHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(point) {
    this.updateData(
      EditPoint.parsePointToData(point),
    );
  }

  getTemplate() {
    return createPointFormElement(this._data);
  }

  _pointTypeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: findOffersFoType(offers, evt.target.value),
    });
  }

  _pointCityToggleHandler(evt) {
    if (CITIES.includes(evt.target.value)) {
      this.updateData({
        destination: {
          description: generateDescription(),
          name: evt.target.value,
          photos: generatePictures(),
        },
      });
    }
  }

  _pointOfferToggleHandler(evt) {
    this.updateData({
      offers: this._data.offers.map((item) => {
        if (item.title === evt.target.dataset.offerTitle) {
          item.isChecked = !item.isChecked;
        }
        return item;
      }),
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseDataToPoint(this._data));
  }

  _formCloseHandler() {
    this._callback.formClose();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._pointTypeToggleHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._pointCityToggleHandler);

    if (this.getElement().querySelector('.event__available-offers') !== null) {
      this.getElement()
        .querySelector('.event__available-offers')
        .addEventListener('change', this._pointOfferToggleHandler);
    }
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setFormCloseHandler(callback) {
    this._callback.formClose = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formCloseHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    return data;
  }
}

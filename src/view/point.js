import dayjs from 'dayjs';
import { calcTimeDuration, sumPricePoint } from '../utils/point';
import AbstractView from './abstract';

const createPointElement = (point) => {
  const {dateFrom, dateTo, type, destination, isFavorite} = point;
  const date = dayjs(dateFrom).format('MMM D');
  const timeFrom = dayjs(dateFrom);
  const timeTo = dayjs(dateTo);
  const typeLowerCase = type.toLowerCase();
  const durationTemplate = calcTimeDuration(timeFrom, timeTo);

  const generateOffersElement = () => {
    return point.offers.map((item) => `
      <li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
      </li>
    `).join('');
  };

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${typeLowerCase}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${timeFrom.format('HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${timeTo.format('HH:mm')}</time>
          </p>
          <p class="event__duration">${durationTemplate}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${sumPricePoint(point)}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${generateOffersElement()}
        </ul>
        <button class="${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Point extends AbstractView{
  constructor(point) {
    super();
    this._point = point;

    this._pointOpenHandler = this._pointOpenHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointElement(this._point);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }

  setPointOpenHandler(callback) {
    this._callback.pointOpen = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pointOpenHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _pointOpenHandler() {
    this._callback.pointOpen();
  }
}

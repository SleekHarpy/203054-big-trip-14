import dayjs from 'dayjs';
import {createElement, getLastIndex, sortByDateFrom, sortByDateTo} from '../utils';

const MAX_CITY = 3;

const createTripInfoElement = (points) => {
  const sortCity = () => {
    const firstCity = points[0].destination.name;
    const lastCity = points[getLastIndex(points)].destination.name;

    return points.length <= MAX_CITY
      ? `${points.map((item) => item.destination.name).join(' &mdash; ')}`
      : `${firstCity} &mdash;...&mdash; ${lastCity}`;
  };

  const getFirstDate = () => {
    sortByDateFrom(points);

    return dayjs(points[0].dateFrom);
  };

  const getLastDate = () => {
    sortByDateTo(points);

    return dayjs(points[getLastIndex(points)].dateTo);
  };

  const sortDate = () => {
    const firstDate = getFirstDate();
    const lastDate = getLastDate();
    const firstDateMonth = firstDate.format('YYMM');
    const lastDateMonth = lastDate.format('YYMM');


    return firstDateMonth === lastDateMonth
      ? `${firstDate.format('MMM D')}&nbsp;&mdash;&nbsp;${lastDate.format('D')}`
      : `${firstDate.format('MMM D')}&nbsp;&mdash;&nbsp;${lastDate.format('MMM D')}`;
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${sortCity()}</h1>

        <p class="trip-info__dates">${sortDate()}</p>
      </div>
    </section>`
  );
};

export default class TripInfo {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoElement(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

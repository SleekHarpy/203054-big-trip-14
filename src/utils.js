import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_HOUR = 3600000;

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const SortType = {
  PRICE: 'price',
  DAY: 'day',
  DURATION: 'duration',
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const totalSumOffers = (offers) => {

  if (offers.length !== 0 ) {
    return offers.reduce((total, amount) => total + amount.price, 0);
  }

  return 0;
};

export const sumPricePoint = (point) => {
  if (point.offers.length !== 0 ) {
    return point.offers.reduce((total, amount) => total + amount.price, 0) + point.basePrice;
  }

  return point.basePrice;
};

export const calcTimeDuration = (timeFrom, timeTo) => {
  const durationTime = dayjs.duration(timeTo.diff(timeFrom));
  const durationTimeSec = durationTime.asMilliseconds();

  if (durationTimeSec < MILLISECONDS_IN_HOUR) {
    return durationTime.format('mm[M]');
  } else if (durationTimeSec < MILLISECONDS_IN_DAY && durationTimeSec >= MILLISECONDS_IN_HOUR) {
    return durationTime.format('HH[H] mm[M]');
  } else {
    return durationTime.format('DD[D] HH[H] mm[M]');
  }
};

export const getRandomIndex = (arr) => {
  return getRandomInteger(0, arr.length - 1);
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const sortByDateFrom = (points) => {
  return points.sort((a,b) => a.dateFrom > b.dateFrom ? 1 : -1);
};

export const sortByDateTo = (points) => {
  return points.sort((a,b) => a.dateTo > b.dateTo ? 1 : -1);
};

export const getLastIndex = (array) => {
  return array.length - 1;
};

export const findOffersFoType = (offers, type) => {
  return offers.find((item) => item.type === type).offers;
};

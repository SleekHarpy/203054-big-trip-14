import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_HOUR = 3600000;

export const SortType = {
  PRICE: 'price',
  DAY: 'day',
  DURATION: 'duration',
};

export const totalSumOffers = (offers) => {

  if (offers.length !== 0 ) {
    return offers.reduce((total, amount) => total + amount.price, 0);
  }

  return 0;
};

export const sumPricePoint = (point) => {
  if (point.offers.length !== 0 ) {
    return point.offers
      .filter((item) => item.isChecked)
      .reduce((total, amount) => total + amount.price, 0) + point.basePrice;
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

export const sortByDateFrom = (points) => {
  return points.sort((a,b) => a.dateFrom > b.dateFrom ? 1 : -1);
};

export const sortPrice = (points) => {
  return points.sort((a,b) => (a.basePrice + totalSumOffers(a.offers)) > (b.basePrice + totalSumOffers(b.offers)) ? 1 : -1).reverse();
};

export const sortDuration = (points) => {
  return points.sort((a,b) => {
    const aTimeFrom = dayjs(a.dateFrom);
    const aTimeTo = dayjs(a.dateTo);
    const bTimeFrom = dayjs(b.dateFrom);
    const bTimeTo = dayjs(b.dateTo);

    a = aTimeTo.diff(aTimeFrom, 's');
    b = bTimeTo.diff(bTimeFrom, 's');
    return a - b;
  }).reverse();
};

export const sortByDateTo = (points) => {
  return points.sort((a,b) => a.dateTo > b.dateTo ? 1 : -1);
};

export const getLastIndex = (array) => {
  return array.length - 1;
};

export const findOffersFoType = (offers, type) => {
  return offers.find((item) => item.type.toLowerCase() === type.toLowerCase()).offers;
};

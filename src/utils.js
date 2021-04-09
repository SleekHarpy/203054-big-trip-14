export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const totalSumOffers = (offers) => {
  if (offers.length !== 0 ) {
    return offers.map((item) => {
      return item.price;
    }).reduce((total, amount) => total + amount);
  }

  return 0;
};

export const sumPricePoint = (point) => {
  if (point.offers.length !== 0 ) {
    return point.offers.map((item) => {
      return item.price;
    }).reduce((total, amount) => total + amount) + point.basePrice;
  }

  return point.basePrice;
};

export const calcTimeDuration = (seconds) => {
  let d = Math.floor(seconds / (3600*24));
  let h = Math.floor(seconds % (3600*24) / 3600);
  let m = Math.floor(seconds % 3600 / 60);

  const isDay = d > 0;
  const isHour = h > 0;
  const isMinute = m > 0;

  if (d >= 0 && d < 10) {
    d = `0${d}D`;
  }
  if (d >= 10) {
    d = `${d}D`;
  }

  if (h >= 0 && h < 10) {
    h = `0${h}H`;
  }
  if (h >= 10) {
    h = `${h}H`;
  }

  if (m >= 0 && m < 10) {
    m = `0${m}M`;
  }
  if (m >= 10) {
    m = `${m}M`;
  }

  return `${isDay ? d : ''} ${isHour || isDay ? h : ''} ${isMinute || isDay || isHour ? m : ''}`;
};

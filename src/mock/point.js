import dayjs from 'dayjs';
import { getRandomInteger } from '../utils';

const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const textLorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const generateTypePoint = () => {
  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateCity = () => {
  const cities = ['Moscow, Saint-Petersburg', 'New-York', 'San-Francisco', 'Tokyo', 'Sydney'];
  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const generateDescription = () => {
  const count = textLorem.replace(/([.?!])\s*(?=[A-Z])/g, '$1|').split('|');
  const randomIndex = getRandomInteger(0, count.length - 1);

  return count.slice(0, randomIndex).join(' ');
};

const generateDate = () => {
  const maxDaysGap = 3;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().utc().add(daysGap, 'day').add(daysGap, 'hour').add(daysGap, 'minute').format();
};

const generateOffersArr = () => {
  const arr = [];

  for (let i = 0; i < getRandomInteger(0, 7); i++) {
    arr.push({ title: textLorem.slice(0, getRandomInteger(5, 25)), price: getRandomInteger(0, 800) });
  }

  return arr;
};

const generatePictures = () => {
  const pictures = [];
  for (let i = 0; i < getRandomInteger(1, 6); i++) {
    pictures.push(
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 1000)}`,
        description: textLorem.slice(0, getRandomInteger(5, 25)),
      },
    );
  }

  return pictures;
};

const generateDestination = () => {
  return {
    description: generateDescription(),
    name: generateCity(),
    photos: generatePictures(),
  };
};

export const generatePoint = () => {
  return {
    type: generateTypePoint(),
    city: generateCity(),
    destination: generateDestination(),
    dateFrom: generateDate(),
    dateTo: '2021-04-16T06:23:52Z',
    isFavorite: Boolean(getRandomInteger(0, 1)),
    basePrice: getRandomInteger(1, 500),
  };
};

export const generateOffer = () => {
  return {
    type: generateTypePoint(),
    offers: generateOffersArr(),
  };
};

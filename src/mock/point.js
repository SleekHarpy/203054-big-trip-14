import dayjs from 'dayjs';
import { getRandomIndex, getRandomInteger } from '../utils';
import { offersArr } from './offersArr';

const DAY_GAP = 2;
const HOURS_GAP = getRandomInteger(0, 24);
const MINUTES_GAP = getRandomInteger(0, 60);
const TEXT_LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
export const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
export const CITIES = ['Moscow', 'Saint-Petersburg', 'New-York', 'San-Francisco', 'Tokyo', 'Sydney', 'Hong Kong', 'Bangkok', 'London', 'Paris', 'Istanbul'];

const generateTypePoint = () => {
  return TYPES[getRandomIndex(TYPES)];
};

const generateDescription = () => {
  const sentences = TEXT_LOREM.replace(/([.?!])\s*(?=[A-Z])/g, '$1|').split('|');
  const randomIndex = getRandomInteger(0, sentences.length - 1);

  return sentences.slice(0, randomIndex).join(' ');
};

const generateDate = () => {
  return dayjs().add(getRandomInteger(-DAY_GAP, DAY_GAP), 'day').add(HOURS_GAP, 'hour').add(MINUTES_GAP, 'minute').format('YYYY-MM-DDTHH:mm');
};

const generatePictures = () => {
  const pictures = [];
  for (let i = 0; i < getRandomInteger(1, 6); i++) {
    pictures.push(
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 1000)}`,
        description: TEXT_LOREM.slice(0, getRandomInteger(5, 25)),
      },
    );
  }

  return pictures;
};

const generateDestination = (cityI) => {
  return {
    description: generateDescription(),
    name: CITIES[cityI],
    photos: generatePictures(),
  };
};

export const generatePoint = (cityI) => {
  const randomType = generateTypePoint();
  const typeOffers = offersArr.find((item) => item.type === randomType).offers;
  const randomDateFrom = generateDate();
  const randomDateTo = dayjs(randomDateFrom).add(getRandomInteger(0, HOURS_GAP), 'hour').add(getRandomInteger(0, MINUTES_GAP), 'minute');

  return {
    type: randomType,
    destination: generateDestination(cityI),
    dateFrom: randomDateFrom,
    dateTo: randomDateTo,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    basePrice: getRandomInteger(1, 500),
    offers: typeOffers.slice(0, getRandomIndex(typeOffers)),
  };
};
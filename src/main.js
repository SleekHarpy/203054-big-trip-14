import { createSiteMenuTemplate } from './view/site-menu';
import { createTripInfoElement } from './view/trip-info';
import { createCostTripElement } from './view/cost-trip';
import { createTripFiltersElement } from './view/trip-filters';
import { createTripSortElement } from './view/trip-sort';
import { createEventsListElement } from './view/events-list';
import { createEditFormElement } from './view/edit-form';
import { createAddPointElement } from './view/add-point';
import { createPointElement } from './view/point';
import { generatePoint, generateOffer } from './mock/point';
import dayjs from 'dayjs';
import { totalSumOffers } from './utils';

const POINT_COUNT = 18;

const pointsOffers = () => {
  return {...generatePoint(), ...generateOffer()};
};

const points = new Array(POINT_COUNT).fill().map(pointsOffers);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.page-main');
const headerMainElement = document.querySelector('.trip-main');
const navigationContainerElement = headerMainElement.querySelector('.trip-controls__navigation');
const filtersContainerElement = headerMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(navigationContainerElement, createSiteMenuTemplate());
render(headerMainElement, createTripInfoElement(), 'afterbegin');

const tripInfoElement = headerMainElement.querySelector('.trip-info');
render(tripInfoElement, createCostTripElement());

render(filtersContainerElement, createTripFiltersElement());
render(tripEventsElement, createTripSortElement());
render(tripEventsElement, createEventsListElement());

const eventsListElement = tripEventsElement.querySelector('.trip-events__list');

const onClickSortPoints = (sort) => {
  if (sort === 'price') {
    points.sort((a,b) => (a.basePrice + totalSumOffers(a.offers)) > (b.basePrice + totalSumOffers(b.offers)) ? 1 : -1).reverse();
  }
  if (sort === 'day') points.sort((a,b) => a.dateFrom > b.dateFrom ? 1 : -1);
  if (sort === 'duration') {
    points.sort((a,b) => {
      const aTimeFrom = dayjs(a.dateFrom);
      const aTimeTo = dayjs(a.dateTo);
      const bTimeFrom = dayjs(b.dateFrom);
      const bTimeTo = dayjs(b.dateTo);

      a = aTimeTo.diff(aTimeFrom, 's');
      b = bTimeTo.diff(bTimeFrom, 's');
      return a - b;
    }).reverse();
  }
  renderingPoints();
};

const renderingPoints = () => {
  eventsListElement.innerHTML = '';
  render(eventsListElement, createEditFormElement(points[0]));
  render(eventsListElement, createAddPointElement(points[1]));
  for (let i = 2; i < POINT_COUNT; i++) {
    render(eventsListElement, createPointElement(points[i]));
  }
};

renderingPoints();

const sortPrice = document.querySelector('.trip-sort__item--price');
const sortInputPrice = sortPrice.querySelector('.trip-sort__input');
const sortDay = document.querySelector('.trip-sort__item--day');
const sortInputDay = sortDay.querySelector('.trip-sort__input');
const sortTime = document.querySelector('.trip-sort__item--time');
const sortInputTime = sortTime.querySelector('.trip-sort__input');

sortInputPrice.addEventListener('change', () => onClickSortPoints('price'));
sortInputDay.addEventListener('change', () => onClickSortPoints('day'));
sortInputTime.addEventListener('change', () => onClickSortPoints('duration'));

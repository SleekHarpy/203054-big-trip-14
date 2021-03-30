import { createSiteMenuTemplate } from './view/site-menu';
import { createTripInfoElement } from './view/trip-info';
import { createCostTripElement } from './view/cost-trip';
import { createTripFiltersElement } from './view/trip-filters';
import { createTripSortElement } from './view/trip-sort';
import { createEventsListElement } from './view/events-list';
import { createEditFormElement } from './view/edit-form';
import { createAddPointElement } from './view/add-point';
import { createPointElement } from './view/point';

const POINT_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.page-main');
const headerMainElement = document.querySelector('.trip-main');
const navigationContainerElement = headerMainElement.querySelector('.trip-controls__navigation');
const filtersContainerElement = headerMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(navigationContainerElement, createSiteMenuTemplate(), 'beforeend');
render(headerMainElement, createTripInfoElement(), 'afterbegin');

const tripInfoElement = headerMainElement.querySelector('.trip-info');
render(tripInfoElement, createCostTripElement(), 'beforeend');

render(filtersContainerElement, createTripFiltersElement(), 'beforeend');
render(tripEventsElement, createTripSortElement(), 'beforeend');
render(tripEventsElement, createEventsListElement(), 'beforeend');

const eventsListElement = tripEventsElement.querySelector('.trip-events__list');
render(eventsListElement, createEditFormElement(), 'beforeend');
render(eventsListElement, createAddPointElement(), 'beforeend');

for (let i = 0; i < POINT_COUNT; i++) {
  render(eventsListElement, createPointElement(), 'beforeend');
}

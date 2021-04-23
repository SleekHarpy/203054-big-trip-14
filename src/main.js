import SiteMenuView from './view/site-menu';
import TripInfoView from './view/trip-info';
import TripCostView from './view/cost-trip';
import TripFilterView from './view/trip-filters';
import { generatePoint } from './mock/point';
// import dayjs from 'dayjs';
// import {totalSumOffers, SortType, sortByDateFrom} from './utils/point';
import {render, RenderPosition} from './utils/render';
import TripEventsPresenter from './resenter/trip-events';

const POINT_COUNT = 6;
const points = new Array(POINT_COUNT).fill().map((item, index) => generatePoint(index));

const tripEventsContainer = document.querySelector('.page-main__container');
const headerMainElement = document.querySelector('.trip-main');
const navigationContainerElement = headerMainElement.querySelector('.trip-controls__navigation');
const filtersContainerElement = headerMainElement.querySelector('.trip-controls__filters');

render(navigationContainerElement, new SiteMenuView());
render(filtersContainerElement, new TripFilterView());
render(headerMainElement, new TripInfoView(points), RenderPosition.AFTERBEGIN);
const tripInfoElement = headerMainElement.querySelector('.trip-info');
render(tripInfoElement, new TripCostView(points));

// const sortPrice = document.querySelector('.trip-sort__item--price');
// const sortInputPrice = sortPrice.querySelector('.trip-sort__input');
// const sortDay = document.querySelector('.trip-sort__item--day');
// const sortInputDay = sortDay.querySelector('.trip-sort__input');
// const sortTime = document.querySelector('.trip-sort__item--time');
// const sortInputTime = sortTime.querySelector('.trip-sort__input');
//
// sortInputPrice.addEventListener('change', () => sortPoints(SortType.PRICE));
// sortInputDay.addEventListener('change', () => sortPoints(SortType.DAY));
// sortInputTime.addEventListener('change', () => sortPoints(SortType.DURATION));

// render(tripEventsElement, eventsListComponent);

// const sortPoints = (sort) => {
//   if (sort === SortType.PRICE) {
//     points.sort((a,b) => (a.basePrice + totalSumOffers(a.offers)) > (b.basePrice + totalSumOffers(b.offers)) ? 1 : -1).reverse();
//   }
//   if (sort === SortType.DAY) {
//     sortByDateFrom(points);
//   }
//   if (sort === SortType.DURATION) {
//     points.sort((a,b) => {
//       const aTimeFrom = dayjs(a.dateFrom);
//       const aTimeTo = dayjs(a.dateTo);
//       const bTimeFrom = dayjs(b.dateFrom);
//       const bTimeTo = dayjs(b.dateTo);
//
//       a = aTimeTo.diff(aTimeFrom, 's');
//       b = bTimeTo.diff(bTimeFrom, 's');
//       return a - b;
//     }).reverse();
//   }
//
//   renderPoints();
// };

const tripEventsPresenter = new TripEventsPresenter(tripEventsContainer);

tripEventsPresenter.init(points);

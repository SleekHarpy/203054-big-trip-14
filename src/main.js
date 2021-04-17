import SiteMenuView from './view/site-menu';
import TripInfoView from './view/trip-info';
import TripCostView from './view/cost-trip';
import TripFilterView from './view/trip-filters';
import TripSortView from './view/trip-sort';
import EventsListView from './view/events-list';
// import AddPointView from './view/add-point';
import EditPointView from './view/edit-point';
import PointView from './view/point';
import { generatePoint } from './mock/point';
import dayjs from 'dayjs';
import {render, totalSumOffers, SortType, sortByDateFrom, RenderPosition} from './utils';

const POINT_COUNT = 6;
const points = new Array(POINT_COUNT).fill().map((item, index) => generatePoint(index));

const siteMainElement = document.querySelector('.page-main');
const headerMainElement = document.querySelector('.trip-main');
const navigationContainerElement = headerMainElement.querySelector('.trip-controls__navigation');
const filtersContainerElement = headerMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(navigationContainerElement, new SiteMenuView().getElement());

const eventsListComponent = new EventsListView();

render(filtersContainerElement, new TripFilterView().getElement());
render(headerMainElement, new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN);
const tripInfoElement = headerMainElement.querySelector('.trip-info');
render(tripInfoElement, new TripCostView(points).getElement());
render(tripEventsElement, new TripSortView().getElement());

const sortPrice = document.querySelector('.trip-sort__item--price');
const sortInputPrice = sortPrice.querySelector('.trip-sort__input');
const sortDay = document.querySelector('.trip-sort__item--day');
const sortInputDay = sortDay.querySelector('.trip-sort__input');
const sortTime = document.querySelector('.trip-sort__item--time');
const sortInputTime = sortTime.querySelector('.trip-sort__input');

sortInputPrice.addEventListener('change', () => sortPoints(SortType.PRICE));
sortInputDay.addEventListener('change', () => sortPoints(SortType.DAY));
sortInputTime.addEventListener('change', () => sortPoints(SortType.DURATION));


render(tripEventsElement, eventsListComponent.getElement());

const sortPoints = (sort) => {
  if (sort === SortType.PRICE) {
    points.sort((a,b) => (a.basePrice + totalSumOffers(a.offers)) > (b.basePrice + totalSumOffers(b.offers)) ? 1 : -1).reverse();
  }
  if (sort === SortType.DAY) {
    sortByDateFrom(points);
  }
  if (sort === SortType.DURATION) {
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

  renderPoints();
};

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
  });

  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  render(pointListElement, pointComponent.getElement());
};

const renderPoints = () => {
  eventsListComponent.getElement().innerHTML = '';
  // render(eventsListComponent.getElement(), new AddPointView(points[0]).getElement());
  for (let i = 0; i < POINT_COUNT; i++) {
    renderPoint(eventsListComponent.getElement(), points[i]);
  }
};

renderPoints();

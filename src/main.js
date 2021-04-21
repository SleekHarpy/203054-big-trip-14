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
import {totalSumOffers, SortType, sortByDateFrom} from './utils/point';
import NoPointView from './view/no-point';
import {render, RenderPosition} from './utils/render';

const POINT_COUNT = 6;
const points = new Array(POINT_COUNT).fill().map((item, index) => generatePoint(index));

const siteMainElement = document.querySelector('.page-main');
const headerMainElement = document.querySelector('.trip-main');
const navigationContainerElement = headerMainElement.querySelector('.trip-controls__navigation');
const filtersContainerElement = headerMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(navigationContainerElement, new SiteMenuView());

const eventsListComponent = new EventsListView();

render(filtersContainerElement, new TripFilterView());

if (points.length === 0) {
  render(tripEventsElement, new NoPointView());
} else {
  render(headerMainElement, new TripInfoView(points), RenderPosition.AFTERBEGIN);
  const tripInfoElement = headerMainElement.querySelector('.trip-info');
  render(tripInfoElement, new TripCostView(points));
  render(tripEventsElement, new TripSortView());

  const sortPrice = document.querySelector('.trip-sort__item--price');
  const sortInputPrice = sortPrice.querySelector('.trip-sort__input');
  const sortDay = document.querySelector('.trip-sort__item--day');
  const sortInputDay = sortDay.querySelector('.trip-sort__input');
  const sortTime = document.querySelector('.trip-sort__item--time');
  const sortInputTime = sortTime.querySelector('.trip-sort__input');

  sortInputPrice.addEventListener('change', () => sortPoints(SortType.PRICE));
  sortInputDay.addEventListener('change', () => sortPoints(SortType.DAY));
  sortInputTime.addEventListener('change', () => sortPoints(SortType.DURATION));
}

render(tripEventsElement, eventsListComponent);

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

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setPointOpenHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setPointCloseHandler(() => {
    replaceFormToPoint();
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent);
};

const renderPoints = () => {
  eventsListComponent.getElement().innerHTML = '';
  // render(eventsListComponent.getElement(), new AddPointView(points[0]).getElement());
  for (let i = 0; i < POINT_COUNT; i++) {
    renderPoint(eventsListComponent.getElement(), points[i]);
  }
};

renderPoints();

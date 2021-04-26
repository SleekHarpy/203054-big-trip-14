import SiteMenuView from './view/site-menu';
import TripInfoView from './view/trip-info';
import TripCostView from './view/cost-trip';
import TripFilterView from './view/trip-filters';
import { generatePoint } from './mock/point';
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

const tripEventsPresenter = new TripEventsPresenter(tripEventsContainer);
tripEventsPresenter.init(points);

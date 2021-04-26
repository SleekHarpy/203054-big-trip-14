import TripEventsView from '../view/trip-events';
import TripSortView from '../view/trip-sort';
import NoPointView from '../view/no-point';
import EventsListView from '../view/events-list';
import {render, RenderPosition} from '../utils/render';
import PointPresenter from './point';
import {updateItem} from '../utils/common';
import {sortByDateFrom, sortDuration, sortPrice, SortType} from '../utils/point';

export default class TripEvents {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._tripEventsComponent = new TripEventsView();
    this._tripSortComponent = new TripSortView();
    this._noPointComponent = new NoPointView();
    this._eventsListComponent = new EventsListView();

    this._handlePointChange  = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(eventPoints) {
    this._eventPoints = eventPoints;
    render(this._tripEventsContainer, this._tripEventsComponent);
    render(this._tripEventsComponent, this._eventsListComponent);

    this._renderTripEvents();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatePoint) {
    this._eventPoints = updateItem(this._eventPoints, updatePoint);
    this._pointPresenter[updatePoint.id].init(updatePoint);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        sortPrice(this._eventPoints);
        break;
      case SortType.DURATION:
        sortDuration(this._eventPoints);
        break;
      default: sortByDateFrom(this._eventPoints);
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderPoints();
  }

  _renderSort() {
    render(this._tripEventsComponent, this._tripSortComponent, RenderPosition.AFTERBEGIN);
    this._tripSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventsListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._eventPoints.forEach((eventPoint) => this._renderPoint(eventPoint));
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderNoPoints() {
    render(this._tripEventsComponent, this._noPointComponent);
  }

  _renderTripEvents() {
    if (this._eventPoints.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints();
  }
}

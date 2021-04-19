import { createElement } from '../utils';

const createNoPointElement = () => {
  return (
    '<p class="trip-events__msg">Click New Event to create your first point</p>'
  );
};

export default class NoPoint {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createNoPointElement(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

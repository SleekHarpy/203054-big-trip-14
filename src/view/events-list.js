import { createElement } from '../utils';

const createEventsListElement = () => {
  return (
    '<ul class="trip-events__list"></ul>'
  );
};

export default class EventsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsListElement();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    return this._element = null;
  }
}

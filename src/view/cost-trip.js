import { createElement } from '../utils';

const createCostTripElement = (points) => {
  const countTotalPrice = () => {
    return points.map((item) => item.offers.reduce((total, amount) => total + amount.price, 0) + item.basePrice).reduce((total, amount) => total + amount, 0);
  };

  const totalPrice = countTotalPrice();

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>`
  );
};

export default class TripCost {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createCostTripElement(this._points);
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

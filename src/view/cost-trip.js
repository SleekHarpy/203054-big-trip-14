import AbstractView from './abstract';

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

export default class TripCost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createCostTripElement(this._points);
  }
}

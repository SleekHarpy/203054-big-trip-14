import AbstractView  from './abstract';

const createTripEventsElement = () => {
  return (
    `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>

    </section>`
  );
};

export default  class TripEvents extends AbstractView {
  getTemplate() {
    return createTripEventsElement();
  }
}

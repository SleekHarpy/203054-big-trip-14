import Abstract from '../view/abstract';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const replace = (newElement, oldElement) => {
  if  (oldElement instanceof Abstract) {
    oldElement = oldElement.getElement();
  }

  if (newElement instanceof  Abstract) {
    newElement = newElement.getElement();
  }

  const parent = oldElement.parentElement;

  if (parent === null || oldElement === null || newElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newElement, oldElement);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

import { GET_BEER, OPEN_MODAL, CLOSE_MODAL } from './actionTypes';
import { getBeer } from './detailsActions';
import { openModal, closeModal } from './modalActions';

describe('actions', () => {
  it('GET_BEER', () => {
    const defaultBeer = { beer: { id: 1 } };
    const getBeerAction = {
      type: GET_BEER,
      beer: defaultBeer
    };

    expect(getBeer(defaultBeer)).toEqual(getBeerAction);
  });

  it('OPEN_MODAL', () => {
    const openModalAction = {
      type: OPEN_MODAL
    };

    expect(openModal()).toEqual(openModalAction);
  });

  it('CLOSE_MODAL', () => {
    const closeModalAction = {
      type: CLOSE_MODAL
    };

    expect(closeModal()).toEqual(closeModalAction);
  });
});

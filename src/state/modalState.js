import { atom } from 'recoil';

export const dayViewModalState = atom({
  key: 'dayViewModalState',
  default: false,
});

export const userTripsModalState = atom({
  key: 'userTripsModalState',
  default: false,
});
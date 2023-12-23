import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState', 
  default: false,
});

export const dayViewModalState = atom({
  key: 'dayViewModalState',
  default: false,
});

export const userTripsModalState = atom({
  key: 'userTripsModalState',
  default: false,
});
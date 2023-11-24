import { atom } from 'recoil';

export const tripInfoState = atom({
  key: 'tripInfoState', 
  default: { location: '', startDate: '', endDate: '', events: {} },
});

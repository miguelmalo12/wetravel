// This is used as the source of truth for the view trip pages/components

import { atom } from 'recoil';

export const viewTripState = atom({
  key: 'viewTripState',
  default: null,
});
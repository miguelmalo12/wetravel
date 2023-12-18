// This is used for the PUT request to update a trip
import { atom } from 'recoil';

export const updatedTripState = atom({
  key: 'updatedTripState',
  default: {
    destination: "",
    start_date: "",
    end_date: "",
    events: []
  },
});
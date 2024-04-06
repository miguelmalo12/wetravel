import { to24HourFormat } from '../utils/convertHourUtils';

// Helper Function to sort events by time
export const sortEventsByTime = (events) => {
    return events.sort((a, b) => {
      const timeA = to24HourFormat(a.event_time || a.time);
      const timeB = to24HourFormat(b.event_time || b.time);
      return timeA.localeCompare(timeB);
    });
};
  // Helper function to convert 24-hour format to 12-hour format + AM/PM
  export function to12HourFormat(timeString) {
    if (timeString.includes("AM") || timeString.includes("PM")) {
        // Time is already in 12-hour format
        return timeString;
    }

    const [hours24, minutes] = timeString.split(':').map(Number);
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12; // Convert 00 and 12 to 12
    return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Helper function to convert 12-hour format to 24-hour format
export function to24HourFormat (time12h) {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};
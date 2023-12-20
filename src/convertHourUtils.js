  // Helper function to convert 24-hour format to 12-hour format + AM/PM

export function to12HourFormat(timeString) {
    const [hours24, minutes] = timeString.split(':').map(Number);
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12; // Convert 00 and 12 to 12
    return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}
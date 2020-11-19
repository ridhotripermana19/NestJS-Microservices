import dateFormat = require('dateformat');

export function dateFormatter(date: Date);
export function dateFormatter(date: Date, formatDate: string);
export function dateFormatter(date: Date, formatDate?: string) {
  // Localization date format
  dateFormat.i18n = {
    dayNames: [
      'Min',
      'Sen',
      'Sel',
      'Rab',
      'Kam',
      'Jum',
      'Sab',
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ],
    monthNames: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Okt',
      'Nov',
      'Des',
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ],
    timeNames: ['a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'],
  };
  if (typeof formatDate === 'string' && typeof formatDate !== 'undefined')
    return dateFormat(date, formatDate);
  // Date format example => Rabu, 18 November, 2020 18:00:31
  else return dateFormat(date, 'dddd, d mmmm, yyyy HH:MM:ss');
}

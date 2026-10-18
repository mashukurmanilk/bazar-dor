/**
 * Bengali Date and Number utility functions
 */

const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const bengaliDays = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const bengaliMonths = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

/**
 * Converts a number or numeric string to Bengali digits
 */
export function toBengaliNumerals(num: number | string): string {
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)] ?? digit);
}

/**
 * Formats a Date object into a readable Bengali date string.
 * Example output: "শুক্রবার, ৩ অক্টোবর ২০২৫" or "রবিবার, ১৮ অক্টোবর ২০২৬"
 */
export function formatBanglaDate(date: Date = new Date()): string {
  const dayName = bengaliDays[date.getDay()];
  const dayNumber = toBengaliNumerals(date.getDate());
  const monthName = bengaliMonths[date.getMonth()];
  const year = toBengaliNumerals(date.getFullYear());

  return `${dayName}, ${dayNumber} ${monthName} ${year}`;
}

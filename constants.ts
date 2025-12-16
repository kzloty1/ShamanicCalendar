import { ZodiacSign } from './types';

export const WESTERN_MOON_NAMES = [
  "Wolf Moon", // Jan
  "Snow Moon", // Feb
  "Worm Moon", // Mar
  "Pink Moon", // Apr
  "Flower Moon", // May
  "Strawberry Moon", // Jun
  "Buck Moon", // Jul
  "Sturgeon Moon", // Aug
  "Corn Moon", // Sep (Harvest handled dynamically usually, but Corn is standard fixed)
  "Hunter's Moon", // Oct
  "Beaver Moon", // Nov
  "Cold Moon"  // Dec
];

export const VEINTENAS = [
  "Izcalli", "Atlacacauallo", "Tlacaxipehualiztli", "Tozoztontli", 
  "Huey Tozoztli", "Toxcatl", "Etzalcualiztli", "Tecuilhuitontli", 
  "Huey Tecuilhuitl", "Tlaxochimaco", "Xocotlhuetzi", "Ochpaniztli", 
  "Teotleco", "Tepeilhuitl", "Quecholli", "Panquetzaliztli", 
  "Atemoztli", "Tititl", "Nemontemi"
];

// Sidereal Zodiac Approximate Entry (Degrees 0-360)
// Using Lahiri Ayanamsa approx 24 degrees offset from Tropical
export const SIDEREAL_ZODIAC_START = {
  [ZodiacSign.ARIES]: 0,
  [ZodiacSign.TAURUS]: 30,
  [ZodiacSign.GEMINI]: 60,
  [ZodiacSign.CANCER]: 90,
  [ZodiacSign.LEO]: 120,
  [ZodiacSign.VIRGO]: 150,
  [ZodiacSign.LIBRA]: 180,
  [ZodiacSign.SCORPIO]: 210,
  [ZodiacSign.SAGITTARIUS]: 240,
  [ZodiacSign.CAPRICORN]: 270,
  [ZodiacSign.AQUARIUS]: 300,
  [ZodiacSign.PISCES]: 330
};

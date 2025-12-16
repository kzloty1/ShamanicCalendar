export enum MoonPhase {
  NEW = "New Moon",
  WAXING_CRESCENT = "Waxing Crescent",
  FIRST_QUARTER = "First Quarter",
  WAXING_GIBBOUS = "Waxing Gibbous",
  FULL = "Full Moon",
  WANING_GIBBOUS = "Waning Gibbous",
  LAST_QUARTER = "Last Quarter",
  WANING_CRESCENT = "Waning Crescent"
}

export enum ZodiacSign {
  ARIES = "Aries",
  TAURUS = "Taurus",
  GEMINI = "Gemini",
  CANCER = "Cancer",
  LEO = "Leo",
  VIRGO = "Virgo",
  LIBRA = "Libra",
  SCORPIO = "Scorpio",
  SAGITTARIUS = "Sagittarius",
  CAPRICORN = "Capricorn",
  AQUARIUS = "Aquarius",
  PISCES = "Pisces"
}

export enum BiodynamicType {
  ROOT = "Root",
  LEAF = "Leaf",
  FLOWER = "Flower",
  FRUIT = "Fruit",
  UNSPECIFIED = "Unspecified"
}

export interface AstroData {
  date: Date;
  phase: MoonPhase;
  illumination: number; // 0.0 to 1.0
  age: number; // days
  zodiac: ZodiacSign;
  isSidereal: boolean;
}

export interface TraditionData {
  westernName?: string;
  veintena: string;
  tibetanDay: number;
  biodynamicType: BiodynamicType;
  commentary: string[];
}

export interface DayData {
  astro: AstroData;
  tradition: TraditionData;
}
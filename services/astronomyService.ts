import { MoonPhase, ZodiacSign, AstroData } from '../types';

// Julian Day Calculation
const getJulianDate = (date: Date): number => {
  return (date.getTime() / 86400000) + 2440587.5;
};

// Normalize angle to 0-360
const normalizeDegrees = (d: number): number => {
  let angle = d % 360;
  if (angle < 0) angle += 360;
  return angle;
};

// Get Moon Position
// Simplified calculation suitable for reference purposes
const getMoonPosition = (jd: number) => {
  const T = (jd - 2451545.0) / 36525;

  // Moon's mean longitude
  const L0 = 218.316 + 481267.8813 * T;
  // Moon's mean anomaly
  const M = 134.963 + 477198.8676 * T;
  // Sun's mean anomaly
  const M_sun = 357.528 + 35999.0503 * T;
  // Moon's argument of latitude
  const F = 93.272 + 483202.0175 * T;
  // Mean elongation of the Moon
  const D = 297.850 + 445267.1115 * T;

  // Ecliptic Longitude (Tropical)
  let Long = L0 + 6.289 * Math.sin(M * Math.PI / 180)
             - 1.274 * Math.sin((M - 2 * D) * Math.PI / 180)
             + 0.658 * Math.sin(2 * D * Math.PI / 180)
             - 0.186 * Math.sin(M_sun * Math.PI / 180)
             - 0.059 * Math.sin((2 * M - 2 * D) * Math.PI / 180)
             - 0.057 * Math.sin((M - 2 * D + M_sun) * Math.PI / 180)
             + 0.053 * Math.sin((M + 2 * D) * Math.PI / 180)
             + 0.046 * Math.sin((2 * D - M_sun) * Math.PI / 180)
             + 0.041 * Math.sin((M - M_sun) * Math.PI / 180)
             - 0.035 * Math.sin(D * Math.PI / 180)
             - 0.031 * Math.sin((M + M_sun) * Math.PI / 180);
  
  return normalizeDegrees(Long);
};

// Calculate Phase Angle
const getMoonAgeAndPhase = (date: Date) => {
    // Reference New Moon: Jan 6 2000 12:24 UTC
    // Synodic Month Mean: 29.53059 days
    const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 12, 24, 0));
    const msPerDay = 86400000;
    const synodicMonth = 29.53059;
    
    const diffDays = (date.getTime() - knownNewMoon.getTime()) / msPerDay;
    const cycles = diffDays / synodicMonth;
    const currentCyclePosition = cycles - Math.floor(cycles);
    const age = currentCyclePosition * synodicMonth;
    
    return { age, phaseFrac: currentCyclePosition };
};

const getZodiacSign = (longitude: number): ZodiacSign => {
    // Sidereal Offset (Lahiri Ayanamsa approx 24 deg)
    // Tropical Longitude - 24 = Sidereal Longitude
    const siderealLong = normalizeDegrees(longitude - 24);
    
    if (siderealLong < 30) return ZodiacSign.ARIES;
    if (siderealLong < 60) return ZodiacSign.TAURUS;
    if (siderealLong < 90) return ZodiacSign.GEMINI;
    if (siderealLong < 120) return ZodiacSign.CANCER;
    if (siderealLong < 150) return ZodiacSign.LEO;
    if (siderealLong < 180) return ZodiacSign.VIRGO;
    if (siderealLong < 210) return ZodiacSign.LIBRA;
    if (siderealLong < 240) return ZodiacSign.SCORPIO;
    if (siderealLong < 270) return ZodiacSign.SAGITTARIUS;
    if (siderealLong < 300) return ZodiacSign.CAPRICORN;
    if (siderealLong < 330) return ZodiacSign.AQUARIUS;
    return ZodiacSign.PISCES;
};

const getPhaseLabel = (age: number): MoonPhase => {
    // Synodic month ~29.53
    // New: 0-1
    // Waxing Crescent: 1-6.4
    // First Quarter: 6.4-8.4
    // Waxing Gibbous: 8.4-13.8
    // Full: 13.8-15.8
    // Waning Gibbous: 15.8-21.1
    // Last Quarter: 21.1-23.1
    // Waning Crescent: 23.1-28.5
    // New: > 28.5
    
    if (age < 1 || age > 28.53) return MoonPhase.NEW;
    if (age < 6.4) return MoonPhase.WAXING_CRESCENT;
    if (age < 8.4) return MoonPhase.FIRST_QUARTER;
    if (age < 13.8) return MoonPhase.WAXING_GIBBOUS;
    if (age < 15.8) return MoonPhase.FULL;
    if (age < 21.1) return MoonPhase.WANING_GIBBOUS;
    if (age < 23.1) return MoonPhase.LAST_QUARTER;
    return MoonPhase.WANING_CRESCENT;
};

export const calculateAstroData = (date: Date): AstroData => {
    const jd = getJulianDate(date);
    const long = getMoonPosition(jd);
    const { age, phaseFrac } = getMoonAgeAndPhase(date);
    
    // Illumination: 0.5 * (1 - cos(angle))
    // angle approx phaseFrac * 2PI
    const angleRad = phaseFrac * 2 * Math.PI;
    const illumination = 0.5 * (1 - Math.cos(angleRad));

    return {
        date,
        phase: getPhaseLabel(age),
        illumination: Math.round(illumination * 100),
        age: parseFloat(age.toFixed(1)),
        zodiac: getZodiacSign(long),
        isSidereal: true
    };
};

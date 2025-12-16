import { AstroData, BiodynamicType, MoonPhase, TraditionData, ZodiacSign } from '../types';
import { WESTERN_MOON_NAMES, VEINTENAS } from '../constants';

const getWesternName = (date: Date): string => {
    return WESTERN_MOON_NAMES[date.getMonth()];
};

const getVeintena = (date: Date): string => {
    // Simplified correlation: Jan 1 is within Tititl.
    // Fixed approximation for reference (Simulating 18 months of 20 days + 5)
    // Start of year (approx) for alignment.
    // This is an illustrative fixed correlation often used in general educational contexts.
    
    const dayOfYear = (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    
    // Approximate starts (very simplified for static reference without complex correlation engine)
    // 1. Tititl (starts mid Dec) - Jan 1-19
    // 2. Izcalli: Jan 20 - Feb 8
    // ...
    // Using a simpler loop based on 20 day chunks starting roughly Feb 2 (Aztec New Year variability)
    // Let's use a standard lookup table for Gregorian dates.
    
    // Source: General reconstruction
    // Jan 20 - Feb 8: Izcalli
    // Feb 9 - Feb 28: Atlacacauallo
    // Mar 1 - Mar 20: Tlacaxipehualiztli
    // Mar 21 - Apr 9: Tozoztontli
    // Apr 10 - Apr 29: Huey Tozoztli
    // Apr 30 - May 19: Toxcatl
    // May 20 - Jun 8: Etzalcualiztli
    // Jun 9 - Jun 28: Tecuilhuitontli
    // Jun 29 - Jul 18: Huey Tecuilhuitl
    // Jul 19 - Aug 7: Tlaxochimaco
    // Aug 8 - Aug 27: Xocotlhuetzi
    // Aug 28 - Sep 16: Ochpaniztli
    // Sep 17 - Oct 6: Teotleco
    // Oct 7 - Oct 26: Tepeilhuitl
    // Oct 27 - Nov 15: Quecholli
    // Nov 16 - Dec 5: Panquetzaliztli
    // Dec 6 - Dec 25: Atemoztli
    // Dec 26 - Jan 14: Tititl
    // Jan 15 - Jan 19: Nemontemi (5 days)
    
    // The problem is the day of year shifts. We will implement a basic check.
    const month = date.getMonth(); // 0-11
    const d = date.getDate();
    
    // Convert to simplified day index roughly
    // A robust switch for the purpose of the UI
    if (month === 0) return d <= 19 ? "Tititl (stretching from Dec)" : "Izcalli"; // Note: Nemontemi place varies.
    // To ensure strict "Based on named tradition" and "reconstructed", we will use a common fixed alignment.
    // For this tool, we assume Sahagún's alignment roughly.
    
    // Re-implementation with simple day-of-year ranges for the standard correlation
    if (dayOfYear >= 20 && dayOfYear <= 39) return "Izcalli";
    if (dayOfYear >= 40 && dayOfYear <= 59) return "Atlacacauallo";
    if (dayOfYear >= 60 && dayOfYear <= 79) return "Tlacaxipehualiztli";
    if (dayOfYear >= 80 && dayOfYear <= 99) return "Tozoztontli";
    if (dayOfYear >= 100 && dayOfYear <= 119) return "Huey Tozoztli";
    if (dayOfYear >= 120 && dayOfYear <= 139) return "Toxcatl";
    if (dayOfYear >= 140 && dayOfYear <= 159) return "Etzalcualiztli";
    if (dayOfYear >= 160 && dayOfYear <= 179) return "Tecuilhuitontli";
    if (dayOfYear >= 180 && dayOfYear <= 199) return "Huey Tecuilhuitl";
    if (dayOfYear >= 200 && dayOfYear <= 219) return "Tlaxochimaco";
    if (dayOfYear >= 220 && dayOfYear <= 239) return "Xocotlhuetzi";
    if (dayOfYear >= 240 && dayOfYear <= 259) return "Ochpaniztli";
    if (dayOfYear >= 260 && dayOfYear <= 279) return "Teotleco";
    if (dayOfYear >= 280 && dayOfYear <= 299) return "Tepeilhuitl";
    if (dayOfYear >= 300 && dayOfYear <= 319) return "Quecholli";
    if (dayOfYear >= 320 && dayOfYear <= 339) return "Panquetzaliztli";
    if (dayOfYear >= 340 && dayOfYear <= 359) return "Atemoztli";
    if (dayOfYear >= 360) return "Tititl"; // End of year
    if (dayOfYear <= 19) return "Tititl"; // Start of year
    
    return "Nemontemi (Empty Days)";
};

const getBiodynamicType = (zodiac: ZodiacSign): BiodynamicType => {
    // Maria Thun / Sidereal Tradition
    switch(zodiac) {
        case ZodiacSign.ARIES:
        case ZodiacSign.LEO:
        case ZodiacSign.SAGITTARIUS:
            return BiodynamicType.FRUIT; // Fire
        case ZodiacSign.TAURUS:
        case ZodiacSign.VIRGO:
        case ZodiacSign.CAPRICORN:
            return BiodynamicType.ROOT; // Earth
        case ZodiacSign.GEMINI:
        case ZodiacSign.LIBRA:
        case ZodiacSign.AQUARIUS:
            return BiodynamicType.FLOWER; // Air
        case ZodiacSign.CANCER:
        case ZodiacSign.SCORPIO:
        case ZodiacSign.PISCES:
            return BiodynamicType.LEAF; // Water
    }
    return BiodynamicType.UNSPECIFIED;
};

const getTibetanDay = (moonAge: number): number => {
    // Tibetan day roughly matches the synodic age + 1, but technically it's 1-30.
    // New Moon is Day 1 or Day 30 depending on system (Phugpa vs Tsurphu). 
    // We will use Day 1 = New Moon for general reference.
    return Math.floor(moonAge) + 1;
};

export const getTraditionData = (astro: AstroData): TraditionData => {
    const westernName = getWesternName(astro.date);
    const veintena = getVeintena(astro.date);
    const tibetanDay = getTibetanDay(astro.age);
    const biodynamicType = getBiodynamicType(astro.zodiac);
    
    const commentary: string[] = [];

    // Biodynamic Commentary
    commentary.push(`Based on the Maria Thun biodynamic tradition, this period (Moon in ${astro.zodiac}) is traditionally associated with ${biodynamicType} crops.`);
    
    // Tibetan Commentary
    if ([8, 10, 15, 25, 30].includes(tibetanDay)) {
        commentary.push(`According to the Tibetan Lunar Calendar, Day ${tibetanDay} is considered a significant practice day (Tsog or similar observance).`);
    } else {
        commentary.push(`According to the Tibetan Lunar Calendar, this is Lunar Day ${tibetanDay}.`);
    }

    // Western/Alchemy Commentary
    if (astro.phase === MoonPhase.NEW || astro.age < 1) {
        commentary.push("Based on Western folk traditions, the New Moon is traditionally associated with new beginnings and stillness.");
        commentary.push("Some traditions advise caution with active harvesting during this dark phase.");
    } else if (astro.phase === MoonPhase.FULL || (astro.age > 13.8 && astro.age < 15.8)) {
        commentary.push("According to Western herbalism, the Full Moon period is often selected for harvesting above-ground parts due to peak vitality.");
    } else if (astro.age < 14) {
        commentary.push("Based on historical alchemy and herbalism, the waxing phase is traditionally associated with drawing in, growth, and accumulation.");
    } else {
        commentary.push("Based on historical alchemy and herbalism, the waning phase is traditionally associated with release, drying, and root focus.");
    }

    // Veintena
    commentary.push(`Based on reconstructed Mesoamerican calendars, this date falls within the ${veintena} veintena. Note: These are solar-agricultural periods, not lunar.`);

    return {
        westernName,
        veintena,
        tibetanDay,
        biodynamicType,
        commentary
    };
};

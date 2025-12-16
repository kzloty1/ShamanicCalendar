import React from 'react';
import { DayData } from '../types';
import { MoonViz } from './MoonViz';
import { BookOpen, Sprout, Star } from 'lucide-react';

interface DayDetailProps {
    data: DayData;
    onClose: () => void;
}

export const DayDetail: React.FC<DayDetailProps> = ({ data, onClose }) => {
    const { astro, tradition } = data;

    return (
        <div className="bg-slate-800 border-l border-slate-700 h-full overflow-y-auto p-6 flex flex-col gap-8 shadow-2xl relative">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 md:hidden"
            >
                ✕
            </button>

            <header className="border-b border-slate-700 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-serif text-slate-100">{astro.date.getDate()}</h2>
                        <p className="text-slate-400 text-sm uppercase tracking-wider font-medium">
                            {astro.date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    <MoonViz illumination={astro.illumination} phaseAge={astro.age} />
                </div>
            </header>

            <section>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Star size={14} /> Astronomical Data
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50">
                        <span className="block text-slate-500 text-xs">Phase</span>
                        <span className="text-slate-200 font-serif text-lg">{astro.phase}</span>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50">
                        <span className="block text-slate-500 text-xs">Illumination</span>
                        <span className="text-slate-200 font-serif text-lg">{astro.illumination}%</span>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50">
                        <span className="block text-slate-500 text-xs">Sidereal Zodiac</span>
                        <span className="text-slate-200 font-serif text-lg">{astro.zodiac}</span>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50">
                        <span className="block text-slate-500 text-xs">Lunar Age</span>
                        <span className="text-slate-200 font-serif text-lg">{astro.age} Days</span>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Sprout size={14} /> Traditional Identifiers
                </h3>
                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Western Folk Name</span>
                        <span className="text-slate-200 text-right">{tradition.westernName || "—"} <span className="text-xs text-slate-600 block">(Post-Medieval)</span></span>
                    </li>
                    <li className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Mesoamerican Veintena</span>
                        <span className="text-slate-200 text-right">{tradition.veintena} <span className="text-xs text-slate-600 block">(Solar Reconstruction)</span></span>
                    </li>
                    <li className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Tibetan Lunar Day</span>
                        <span className="text-slate-200 text-right">Day {tradition.tibetanDay}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Biodynamic Type</span>
                        <span className="text-slate-200 text-right">{tradition.biodynamicType} Day</span>
                    </li>
                </ul>
            </section>

            <section className="bg-slate-900/30 p-4 rounded border border-slate-700/30">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BookOpen size={14} /> Source-Based Commentary
                </h3>
                <ul className="space-y-4">
                    {tradition.commentary.map((comm, idx) => (
                        <li key={idx} className="text-slate-300 text-sm leading-relaxed font-serif pl-3 border-l-2 border-slate-600 italic">
                            "{comm}"
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

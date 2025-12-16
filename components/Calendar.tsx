import React from 'react';
import { AstroData, MoonPhase } from '../types';
import { calculateAstroData } from '../services/astronomyService';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
    currentDate: Date;
    onDateSelect: (date: Date) => void;
    onMonthChange: (date: Date) => void;
    selectedDate: Date;
}

export const Calendar: React.FC<CalendarProps> = ({ currentDate, onDateSelect, onMonthChange, selectedDate }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday

    const days = [];
    // Padding for empty start days
    for (let i = 0; i < startDayOfWeek; i++) {
        days.push(null);
    }
    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
        days.push(new Date(year, month, d));
    }

    const handlePrevMonth = () => onMonthChange(new Date(year, month - 1, 1));
    const handleNextMonth = () => onMonthChange(new Date(year, month + 1, 1));

    const isToday = (d: Date) => {
        const now = new Date();
        return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    };

    const isSelected = (d: Date) => {
        return d.getDate() === selectedDate.getDate() && d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear();
    };

    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-2xl font-serif text-slate-100">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-7 text-center mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-xs font-bold text-slate-500 uppercase tracking-widest py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-px bg-slate-800 border border-slate-800 flex-1">
                {days.map((date, index) => {
                    if (!date) return <div key={`empty-${index}`} className="bg-slate-900/50" />;
                    
                    const astro = calculateAstroData(date);
                    const isNew = astro.phase === MoonPhase.NEW;
                    const isFull = astro.phase === MoonPhase.FULL;
                    const selected = isSelected(date);
                    const today = isToday(date);

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => onDateSelect(date)}
                            className={`
                                relative p-2 h-24 md:h-32 flex flex-col items-start justify-between transition-colors
                                ${selected ? 'bg-slate-800 ring-1 ring-slate-400 z-10' : 'bg-slate-900 hover:bg-slate-800'}
                                ${today ? 'bg-slate-800/80' : ''}
                            `}
                        >
                            <span className={`text-sm font-medium ${today ? 'text-amber-400' : 'text-slate-400'}`}>
                                {date.getDate()}
                            </span>
                            
                            <div className="self-center mt-2">
                                {/* Minimal Phase Indicator */}
                                <div className={`w-3 h-3 rounded-full ${isFull ? 'bg-slate-100 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : isNew ? 'border border-slate-600 bg-slate-950' : 'bg-slate-600'}`}></div>
                            </div>
                            
                            <div className="w-full text-center">
                                {isFull && <span className="text-[10px] uppercase tracking-tighter text-slate-300 block">Full</span>}
                                {isNew && <span className="text-[10px] uppercase tracking-tighter text-slate-500 block">New</span>}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

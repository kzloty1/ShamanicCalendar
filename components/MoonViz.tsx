import React from 'react';

interface MoonVizProps {
    illumination: number; // 0 to 100
    phaseAge: number; // days
}

export const MoonViz: React.FC<MoonVizProps> = ({ illumination, phaseAge }) => {
    // Simple visual approximation
    // Shadow moves from right to left (Northern Hemisphere standard)
    // New Moon (Age 0) -> Full (Age 14) -> New (Age 29)
    
    const isWaxing = phaseAge < 14.8;
    const offset = illumination / 100;
    
    // We can simulate the shadow using an ellipse
    // cx moves
    
    // Better simplified approach:
    // Masking. 
    // New Moon: Full shadow.
    // Waxing Crescent: Shadow receding from right.
    
    // Let's use a simpler distinct circle approach with a path
    // Or render a static SVG based on the prop to keep it robust
    
    const r = 40;
    const cx = 50;
    const cy = 50;

    // Calculate control point for the curve
    // If illumination is 50%, curve is straight line (0).
    // If 0% or 100%, curve matches circle edge.
    
    // Scale -1 to 1 based on phase
    // New (0) -> Waxing Quarter (0.5 illum) -> Full (1.0 illum) -> Waning Quarter (0.5) -> New (0)
    
    // Direction calculation
    let curveX = 0;
    let sweep = 0;
    
    // This is purely aesthetic approximation
    // To properly draw a moon phase is complex with just one path. 
    // We will use a shadow circle overlay approach.
    
    return (
        <div className="w-24 h-24 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                <circle cx="50" cy="50" r="45" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                {/* Lit part */}
                <path 
                    d={getMoonPath(phaseAge)} 
                    fill="#f1f5f9" 
                    className="transition-all duration-500"
                />
            </svg>
        </div>
    );
};

// Helper to draw the path of the lit portion
function getMoonPath(age: number): string {
    // Highly simplified path logic for visual indication
    // Northern hemisphere view
    const r = 45;
    const c = 50;
    
    if (age <= 1 || age >= 28.5) {
        // New Moon - almost no light
        return `M ${c} ${c} Z`; // Empty
    }
    
    if (age >= 13.8 && age <= 15.8) {
        // Full Moon
        return `M ${c} ${c-r} A ${r} ${r} 0 1 1 ${c} ${c+r} A ${r} ${r} 0 1 1 ${c} ${c-r}`;
    }
    
    // Quarter / Gibbous / Crescent logic
    const isWaxing = age < 14.8;
    // Normalize to -1 (new) to 1 (full)
    // Actually easier to just map the curve of the terminator
    // The terminator is an semi-ellipse.
    
    // This is hard to perfect in vanilla calc without a library, returning a simple circle for full and masked for others.
    // For the sake of "AESTHETICS", let's use a blurred circle for the "Light" and offset it.
    
    // Wait, strictly accurate path:
    // M 50 5 A 45 45 0 1 [1 if waxing else 0] 50 95 ... terminator curve ...
    
    const direction = isWaxing ? 1 : 0;
    
    // Calculate width of the ellipse for the terminator
    // age 0 -> 15: progress 0 -> 1
    const progress = isWaxing ? age / 14.8 : (29.5 - age) / 14.8;
    const xRadius = r * (2 * progress - 1);
    
    const sweep1 = isWaxing ? 1 : 0;
    // The outer arc is always half a circle on the lit side
    // Waxing: Right side is lit.
    // Waning: Left side is lit.
    
    if (isWaxing) {
        return `M ${c} ${c-r} A ${r} ${r} 0 0 1 ${c} ${c+r} A ${Math.abs(xRadius)} ${r} 0 0 ${xRadius > 0 ? 1 : 0} ${c} ${c-r}`;
    } else {
         return `M ${c} ${c-r} A ${r} ${r} 0 0 0 ${c} ${c+r} A ${Math.abs(xRadius)} ${r} 0 0 ${xRadius > 0 ? 0 : 1} ${c} ${c-r}`;
    }
}

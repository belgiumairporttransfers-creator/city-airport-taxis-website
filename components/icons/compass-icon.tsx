import React from "react";

export const CompassIcon = ({ width = 140, height = 140, className = "" }: { width?: number | string, height?: number | string, className?: string }) => (
    <svg 
        width={width} 
        height={height} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
);

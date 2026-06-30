import React from 'react';
import { cn } from '@/lib/utils';

interface AddReturnButtonProps {
    active: boolean;
    onToggle: () => void;
    addLabel: string;
    removeLabel: string;
    className?: string;
}

export function AddReturnButton({
    active,
    onToggle,
    addLabel,
    removeLabel,
    className,
}: AddReturnButtonProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={cn(
                'flex min-h-[76px] h-[76px] w-full cursor-pointer items-center justify-center rounded-md border border-border bg-white text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-gray-50',
                className
            )}
            aria-label={active ? removeLabel : addLabel}
        >
            {active ? removeLabel : addLabel}
        </button>
    );
}

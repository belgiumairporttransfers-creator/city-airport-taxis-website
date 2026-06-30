import React from 'react';
import { cn } from '@/lib/utils';

interface AddStopButtonProps {
    onAdd: () => void;
    className?: string;
    label?: string;
}

export const AddStopButton: React.FC<AddStopButtonProps> = ({
    onAdd,
    className,
    label
}) => {
    const displayLabel = label || 'Add Stop';

    return (
        <button
            type="button"
            onClick={onAdd}
            className={cn(
                'flex h-[60px] w-full cursor-pointer items-center justify-center rounded-md border border-border bg-white text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-gray-50',
                className
            )}
            aria-label="Add a stop to your journey"
        >
            {displayLabel}
        </button>
    );
};

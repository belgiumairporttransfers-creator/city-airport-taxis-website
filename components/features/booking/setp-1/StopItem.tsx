import { Input } from '@/components/features/form/Input';
import React from 'react';
import { formatPrice } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface StopItemProps {
    index: number;
    onRemove: (index: number) => void;
    stopFeePerStop?: number;
}

export const StopItem: React.FC<StopItemProps> = ({
    index,
    onRemove,
    stopFeePerStop = 0,
}) => {
    const t = useTranslations('common.booking_form.stops');

    return (
        <div className="relative min-w-0">
            <Input
                name={`stops.${index}.address`}
                type="location"
                label={`${t('stop')} ${index + 1}${stopFeePerStop > 0 ? ` (${formatPrice(stopFeePerStop)} ${t('extra')})` : ''}`}
                placeholder={t('placeholder')}
                onRemove={() => onRemove(index)}
            />
        </div>
    );
};

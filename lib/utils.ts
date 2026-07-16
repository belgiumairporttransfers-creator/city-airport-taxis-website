import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { addMinutes, parse, format, isValid, parseISO } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { loadGoogleMaps } from "@/lib/google-maps-loader";
import { AIRPORT_KEYWORDS } from "@/constants/airports";
import { TRAIN_KEYWORDS } from "@/constants/trains";
import { CURRENCY_SYMBOL, DEFAULT_TIMEZONE } from "@/constants/app-default";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPrice(value: number | undefined | null, currencySign: string = CURRENCY_SYMBOL): string {
    const numericValue = Number(value ?? 0);
    const safeValue = Number.isFinite(numericValue) ? numericValue : 0;
    return `${currencySign}${safeValue.toFixed(2)}`;
}
export function formatDate(dateStr: string | undefined): string {
    if (!dateStr) return "—";
    try {
        const isoDate = parseISO(dateStr);
        if (isValid(isoDate)) return format(isoDate, "MM/dd/yyyy");
        const fallbackDate = parse(dateStr, "yyyy-MM-dd", new Date());
        if (isValid(fallbackDate)) return format(fallbackDate, "MM/dd/yyyy");
        return dateStr;
    } catch {
        return dateStr || "—";
    }
}
export function formatDistance(distance: number | undefined | null): string | null {
    if (!distance) return null;
    return `${distance.toFixed(1)} km`;
}


export const getInitials = (value: string, fallback = "AU"): string => {
    const computed = value
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return computed || fallback;
};

type LocationFieldName = "pickupAddress" | "deliveryAddress";

interface LocationFormAccessor {
    getValues: (name: LocationFieldName) => string;
    setValue: (
        name: LocationFieldName,
        value: string,
        options?: { shouldDirty?: boolean; shouldValidate?: boolean }
    ) => void;
}

const isPlusCodeAddress = (address: string) => /^[A-Z0-9]{4,}\+[A-Z0-9]{2,}/i.test(address.trim());

const getBestGeocodedAddress = (results: google.maps.GeocoderResult[] | null | undefined) => {
    if (!results?.length) return null;

    const preferredTypes = [
        "street_address",
        "premise",
        "subpremise",
        "route",
        "intersection",
        "establishment",
    ];

    const nonPlusCodeResults = results.filter(
        (result) => result.formatted_address && !isPlusCodeAddress(result.formatted_address)
    );

    const preferredResult = nonPlusCodeResults.find((result) =>
        result.types?.some((type) => preferredTypes.includes(type))
    );

    return preferredResult?.formatted_address ?? nonPlusCodeResults[0]?.formatted_address ?? null;
};

export const swapPickupAndDelivery = (form: LocationFormAccessor): void => {
    const pickupAddress = form.getValues("pickupAddress");
    const deliveryAddress = form.getValues("deliveryAddress");

    form.setValue("pickupAddress", deliveryAddress, { shouldDirty: true });
    form.setValue("deliveryAddress", pickupAddress, { shouldDirty: true });
};

const reverseGeocodeWithGoogle = async (
    lat: number,
    lng: number
): Promise<string | null> => {
    await loadGoogleMaps();

    if (!window.google?.maps?.Geocoder) return null;

    return new Promise((resolve) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK") {
                resolve(getBestGeocodedAddress(results));
                return;
            }
            resolve(null);
        });
    });
};

const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by this browser."));
            return;
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        });
    });
};

export const getCurrentLocationErrorMessage = (error: GeolocationPositionError): string => {
    if (error.code === error.PERMISSION_DENIED) {
        return "Location permission denied. Please allow access and try again.";
    }
    return "Could not get your current location.";
};

export const isGeolocationError = (error: unknown): error is GeolocationPositionError => {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as { code: unknown }).code === "number"
    );
};

export const resolvePickupAddressFromCurrentLocation = async (): Promise<string> => {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const geocodedAddress = await reverseGeocodeWithGoogle(latitude, longitude);

    return geocodedAddress ?? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
};


export const isAirportAddress = (address: string): boolean => {
    if (!address) return false;
    const lowerAddress = address.toLowerCase();
    return AIRPORT_KEYWORDS.some((keyword) => lowerAddress.includes(keyword));
};

export const isTrainStationAddress = (address: string): boolean => {
    if (!address) return false;
    const lowerAddress = address.toLowerCase();
    return TRAIN_KEYWORDS.some((keyword) => lowerAddress.includes(keyword));
};


const resolveDurationLabel = (duration: unknown): string | null => {
    if (typeof duration === "string") {
        const trimmed = duration.trim();
        return trimmed || null;
    }

    if (duration && typeof duration === "object") {
        const value = Number((duration as { duration?: unknown }).duration);
        if (Number.isFinite(value) && value > 0) {
            return `${value} Hour${value > 1 ? "s" : ""}`;
        }
    }

    return null;
};

export function formatDuration(duration: unknown, durationMinutes: number | undefined | null): string | null {
    const resolvedDuration = resolveDurationLabel(duration);
    if (resolvedDuration) return resolvedDuration;
    if (typeof durationMinutes === "number") {
        const hrs = Math.floor(durationMinutes / 60);
        const mins = durationMinutes % 60;
        return hrs > 0 ? `${hrs} h ${mins} mins` : `${mins} mins`;
    }
    return null;
}

interface AddressInfo {
    name: string;
    detail: string;
}

export function parseAddress(address: string | undefined | null): AddressInfo {
    if (!address) return { name: "", detail: "" };
    const parts = address.split(",");
    if (parts.length > 1) {
        return {
            name: parts[0].trim(),
            detail: parts.slice(1).join(",").trim(),
        };
    }
    return { name: address, detail: "" };
}

export function formatDisplayTime(time: string | undefined): string {
    if (!time?.trim()) return "—";

    try {
        let date = parse(time, "HH:mm", new Date());
        if (!isValid(date)) {
            date = parse(time, "hh:mm a", new Date());
        }
        if (!isValid(date)) return time;
        return format(date, "hh:mm a");
    } catch {
        return time;
    }
}

export function calculateArrivalTime(time: string | undefined, durationMinutes: number | undefined): string {
    if (!time || typeof durationMinutes !== "number") return "—";
    try {
        let date = parse(time, "hh:mm a", new Date());
        if (!isValid(date)) {
            date = parse(time, "HH:mm", new Date());
        }
        if (!isValid(date)) return "—";

        const arrivalDate = addMinutes(date, durationMinutes);
        return format(arrivalDate, "hh:mm a");
    } catch {
        return "—";
    }
}



interface HourlyDurationSelectOption {
    label: string;
    value: string;
}

/** Build unique duration select options from active hourly pricing durations. */
export const getHourlyDurationSelectOptions = (
    items: Array<{ duration: number }> | null | undefined
): HourlyDurationSelectOption[] => {
    if (!items?.length) return [];

    const seen = new Set<number>();
    const options: HourlyDurationSelectOption[] = [];

    [...items]
        .map((item) => Number(item.duration))
        .filter((duration) => Number.isFinite(duration) && duration > 0)
        .sort((a, b) => a - b)
        .forEach((duration) => {
            if (seen.has(duration)) return;
            seen.add(duration);
            options.push({
                label: `${duration} Hour${duration > 1 ? "s" : ""}`,
                value: JSON.stringify({ duration }),
            });
        });

    return options;
};

export const validateBookingTime = (
    date: string,
    time: string,
    minBookingMinutes: number
): { isValid: boolean; timeDisplay?: string } => {
    if (!date || !time || !minBookingMinutes) return { isValid: true };

    try {
        const pickupDateTime = fromZonedTime(`${date} ${time}`, DEFAULT_TIMEZONE);
        const now = new Date();
        const minNoticeMs = minBookingMinutes * 60 * 1000;

        if (pickupDateTime.getTime() - now.getTime() < minNoticeMs) {
            const hours = minBookingMinutes / 60;
            const timeDisplay = hours >= 1
                ? `${hours % 1 === 0 ? hours : hours.toFixed(1)} hours`
                : `${minBookingMinutes} minutes`;

            return { isValid: false, timeDisplay };
        }

        return { isValid: true };
    } catch {
        return { isValid: true };
    }
};
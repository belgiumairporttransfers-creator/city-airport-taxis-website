"use client";

import { loadGoogleMaps } from "../google-maps-loader";


export interface LatLng {
    lat: number;
    lng: number;
}

export interface DistanceResult {
    distanceMiles: number;
    distanceKm: number;
    distanceText: string;
    durationMinutes: number;
    durationText: string;
}

export interface TotalDistanceResult {
    totalDistanceMiles: number;
    totalDistanceKm: number;
    totalDistanceText: string;
    totalDurationMinutes: number;
    totalDurationText: string;
    legs: DistanceResult[];
}

function kmToMiles(km: number): number {
    return km * 0.621371;
}

function formatMiles(miles: number): string {
    return `${miles.toFixed(1)} mi`;
}

function formatDuration(minutes: number): string {
    if (minutes < 60) {
        return `${Math.round(minutes)} mins`;
    }
    const hrs = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return mins > 0 ? `${hrs} hr ${mins} mins` : `${hrs} hr`;
}

export async function calculateDistance(
    origin: string,
    destination: string
): Promise<DistanceResult> {
    await loadGoogleMaps();

    return new Promise((resolve, reject) => {
        if (!window.google?.maps) {
            reject(new Error("Google Maps is not loaded"));
            return;
        }

        const service = new google.maps.DistanceMatrixService();

        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
            },
            (response, status) => {
                if (status !== google.maps.DistanceMatrixStatus.OK || !response) {
                    reject(new Error(`Distance Matrix API failed: ${status}`));
                    return;
                }

                const element = response.rows[0]?.elements[0];

                if (!element || element.status !== "OK") {
                    reject(
                        new Error(
                            `Could not calculate distance: ${element?.status ?? "NO_RESULT"}`
                        )
                    );
                    return;
                }

                const distanceKm = element.distance.value / 1000;
                const distanceMiles = kmToMiles(distanceKm);
                const durationMinutes = element.duration.value / 60;

                resolve({
                    distanceMiles: Math.round(distanceMiles * 10) / 10,
                    distanceKm: Math.round(distanceKm * 10) / 10,
                    distanceText: formatMiles(distanceMiles),
                    durationMinutes: Math.round(durationMinutes),
                    durationText: formatDuration(durationMinutes),
                });
            }
        );
    });
}

export async function calculateTotalDistance(
    addresses: string[]
): Promise<TotalDistanceResult> {
    if (addresses.length < 2) {
        throw new Error("At least 2 addresses are required to calculate distance");
    }

    const legPromises: Promise<DistanceResult>[] = [];

    for (let i = 0; i < addresses.length - 1; i++) {
        legPromises.push(calculateDistance(addresses[i], addresses[i + 1]));
    }

    const legs = await Promise.all(legPromises);

    const totalDistanceMiles = legs.reduce((sum, l) => sum + l.distanceMiles, 0);
    const totalDistanceKm = legs.reduce((sum, l) => sum + l.distanceKm, 0);
    const totalDurationMinutes = legs.reduce(
        (sum, l) => sum + l.durationMinutes,
        0
    );

    return {
        totalDistanceMiles: Math.round(totalDistanceMiles * 10) / 10,
        totalDistanceKm: Math.round(totalDistanceKm * 10) / 10,
        totalDistanceText: formatMiles(totalDistanceMiles),
        totalDurationMinutes: Math.round(totalDurationMinutes),
        totalDurationText: formatDuration(totalDurationMinutes),
        legs,
    };
}

"use client"

import * as React from "react"
import { cn, isAirportAddress, isTrainStationAddress } from "@/lib/utils"
import { loadGoogleMaps } from "@/lib/google-maps-loader"
import { Plane, Train, Loader2 } from "lucide-react"
import { LocationDotIcon } from "@/components/icons/location-dot-icon"

export interface LocationInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
    label?: string
    error?: boolean
}

/** Biases Place Autocomplete to Belgium (approximate bounding box). */
const BELGIUM_BOUNDS: google.maps.LatLngBoundsLiteral = {
    north: 51.55,
    south: 49.45,
    west: 2.45,
    east: 6.45,
}

export const LocationInput = React.forwardRef<HTMLInputElement, LocationInputProps>(
    ({ value, onChange, placeholder, className, label, error }, ref) => {
        const [predictions, setPredictions] = React.useState<google.maps.places.AutocompletePrediction[]>([])
        const [isOpen, setIsOpen] = React.useState(false)
        const [loading, setLoading] = React.useState(false)

        const containerRef = React.useRef<HTMLDivElement>(null)
        const inputRef = React.useRef<HTMLInputElement | null>(null)
        const serviceRef = React.useRef<google.maps.places.AutocompleteService | null>(null)
        const placesServiceRef = React.useRef<google.maps.places.PlacesService | null>(null)

        React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)
        // Initialize Services
        React.useEffect(() => {
            const initServices = async () => {
                try {
                    await loadGoogleMaps()

                    if (window.google?.maps?.places && !serviceRef.current) {
                        serviceRef.current = new window.google.maps.places.AutocompleteService()
                        const dummy = document.createElement('div')
                        placesServiceRef.current = new window.google.maps.places.PlacesService(dummy)
                    }
                } catch (err) {
                    console.error("Failed to load Google Maps Services", err)
                }
            }
            void initServices()
        }, [])

        // Handle Input Change & Fetch Predictions
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value
            onChange(newValue)

            if (!newValue || newValue.length < 2) {
                setPredictions([])
                setIsOpen(false)
                return
            }

            if (serviceRef.current) {
                setLoading(true)
                serviceRef.current.getPlacePredictions(
                    {
                        input: newValue,
                        bounds: BELGIUM_BOUNDS,
                        componentRestrictions: { country: "be" },
                    },
                    (results, status) => {
                        setLoading(false)
                        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                            setPredictions(results)
                            setIsOpen(true)
                        } else {
                            setPredictions([])
                        }
                    }
                )
            }
        }

        // Handle Prediction Click
        const handleSelect = (prediction: google.maps.places.AutocompletePrediction) => {
            if (placesServiceRef.current) {
                placesServiceRef.current.getDetails(
                    {
                        placeId: prediction.place_id,
                        fields: ["formatted_address", "name", "address_components", "types", "geometry"]
                    },
                    (place, status) => {
                        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                            const isNamedPlace = place.types?.some((type: string) =>
                                ['airport', 'lodging', 'establishment', 'point_of_interest'].includes(type)
                            )

                            let nextValue = ""
                            if (isNamedPlace && place.name && place.formatted_address) {
                                // If name is already in address, don't duplicate
                                if (place.formatted_address.toLowerCase().includes(place.name.toLowerCase())) {
                                    nextValue = place.formatted_address
                                } else {
                                    nextValue = `${place.name}, ${place.formatted_address}`
                                }
                            } else {
                                nextValue = place.formatted_address || place.name || ""
                            }

                            onChange(nextValue)
                            setIsOpen(false)
                        }
                    }
                )
            }
        }

        // Close on Click Outside
        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpen(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }, [])

        const getIcon = (description: string) => {
            if (isAirportAddress(description)) return <Plane className="w-5 h-5 text-gray-700" />
            if (isTrainStationAddress(description)) return <Train className="w-5 h-5 text-gray-700" />
            return <LocationDotIcon size={20} className="text-gray-400" />
        }

        return (
            <div ref={containerRef} className={cn("relative w-full", className)}>
                <div
                    className={cn(
                        "flex min-h-[76px] flex-col justify-center rounded-md bg-[#EEEEEE] px-4 py-3",
                        error && "ring-1 ring-error"
                    )}
                >
                    {label ? (
                        <p className="mb-1.5 text-sm font-medium text-foreground">{label}</p>
                    ) : null}
                    <div className="flex items-center gap-2.5">
                        <LocationDotIcon
                            size={16}
                            className={error ? "text-red-500" : "text-gray-500"}
                        />
                        <input
                            type="text"
                            ref={inputRef}
                            value={value}
                            onChange={handleInputChange}
                            onFocus={() => value.length >= 2 && predictions.length > 0 && setIsOpen(true)}
                            placeholder={placeholder}
                            autoComplete="off"
                            className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-foreground placeholder:text-gray-500 focus:outline-none focus:ring-0 md:text-base md:placeholder:text-base"
                        />
                    </div>
                </div>

                {isOpen && predictions.length > 0 && (
                    <div
                        key="location-autocomplete-dropdown"
                        suppressHydrationWarning
                        className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200"
                    >
                        <div className="max-h-[320px] overflow-y-auto">
                            {predictions.map((prediction) => {
                                const mainText = prediction.structured_formatting.main_text
                                const secondaryText = prediction.structured_formatting.secondary_text

                                return (
                                    <button
                                        key={prediction.place_id}
                                        type="button"
                                        onClick={() => handleSelect(prediction)}
                                        className={cn(
                                            "w-full flex items-start gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
                                        )}
                                    >
                                        <div className="mt-1 flex-shrink-0">
                                            {getIcon(prediction.description)}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span
                                                suppressHydrationWarning
                                                className="text-[13px] font-bold text-gray-900 truncate"
                                            >
                                                {mainText}
                                            </span>
                                            {secondaryText && (
                                                <span
                                                    suppressHydrationWarning
                                                    className="text-sm text-gray-500 truncate"
                                                >
                                                    {secondaryText}
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <span suppressHydrationWarning className="text-sm text-gray-400 font-semibold">powered by</span>
                                <span suppressHydrationWarning className="text-sm font-semibold tracking-tight uppercase text-secondary">City Airport Taxi</span>
                            </div>
                            {loading && <Loader2 className="w-3 h-3 animate-spin text-gray-400" />}
                        </div>
                    </div>
                )}
            </div>
        )
    }
)

LocationInput.displayName = "LocationInput"
"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { useBookingStore } from "@/store/use-booking-store";
import { loadGoogleMaps } from "@/lib/google-maps-loader";
import { formatDisplayTime, parseAddress } from "@/lib/utils";

const PRIMARY_COLOR = "#000000";
const SECONDARY_COLOR = "#6B9AF2";

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
];

const PIN_HEIGHT = 22;
const PIN_WIDTH = 18;

type RouteLabelOptions = {
  categoryLabel: string;
  locationName: string;
  time: string;
  accentColor: string;
  labelAlign: "left" | "right";
  showPlaneIcon?: boolean;
};

function createRouteLabelOverlay(
  position: google.maps.LatLng,
  options: RouteLabelOptions
): google.maps.OverlayView {
  return new (class extends google.maps.OverlayView {
    private container: HTMLDivElement | null = null;

    onAdd() {
      const container = document.createElement("div");
      container.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        pointer-events: none;
        z-index: 10;
      `;

      // ── Pin ────────────────────────────────────────────────────────────────
      const pin = document.createElement("div");
      pin.style.cssText = `
        position: absolute;
        left: 0;
        bottom: 0;
        transform: translateX(-50%);
        line-height: 0;
      `;
      pin.innerHTML = `
      <svg
        width="${PIN_WIDTH}"
        height="${PIN_HEIGHT}"
        viewBox="0 0 18 22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 0C4.03 0 0 4.03 0 9c0 5.9 9 13 9 13s9-7.1 9-13c0-4.97-4.03-9-9-9z"
          fill="${options.accentColor}"
        />
        <circle cx="9" cy="9" r="3.5" fill="white" />
      </svg>
      `;

      // ── Label card ─────────────────────────────────────────────────────────
      const CARD_GAP = 6; // px gap between card bottom and pin top

      const label = document.createElement("div");
      // Hidden on mobile; pins remain visible on all breakpoints
      label.className = "hidden sm:flex";
      label.style.cssText = `
        position: absolute;
        bottom: ${PIN_HEIGHT + CARD_GAP}px;
        align-items: stretch;
        overflow: hidden;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
        background-color: white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        min-width: 220px;
        max-width: 320px;
        white-space: nowrap;
      `;

      if (options.labelAlign === "left") {
        // Card starts at the pin centre → grows rightward
        label.style.left = `${-(PIN_WIDTH / 2)}px`;
      } else {
        // Card ends at the pin centre → grows leftward
        label.style.right = `${-(PIN_WIDTH / 2)}px`;
      }

      // Text content
      const content = document.createElement("div");
      content.style.cssText = `
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 6px 10px;
        flex: 1;
        overflow: hidden;
        min-width: 0;
      `;

      const category = document.createElement("span");
      category.style.cssText = `
        display: block;
        font-size: 9px;
        font-weight: 500;
        color: #9ca3af;
        line-height: 1;
      `;
      category.textContent = options.categoryLabel;

      const nameRow = document.createElement("div");
      nameRow.style.cssText = `
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 2px;
        overflow: hidden;
      `;

      if (options.showPlaneIcon) {
        const plane = document.createElement("span");
      
        plane.style.cssText = `
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:16px;
          line-height:1;
          color:#111827;
          flex-shrink:0;
          margin-right:4px;
        `;
      
        plane.textContent = "✈";
      
        nameRow.appendChild(plane);
      }

      const name = document.createElement("span");
      name.style.cssText = `
        font-size: 12px;
        font-weight: 700;
        color: #111827;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `;
      name.textContent = options.locationName;
      nameRow.appendChild(name);

      content.appendChild(category);
      content.appendChild(nameRow);

      // Time badge
      const timeBadge = document.createElement("div");
      timeBadge.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        font-size: 11px;
        font-weight: 600;
        color: white;
        white-space: nowrap;
        min-width: 64px;
        flex-shrink: 0;
        background-color: ${options.accentColor};
      `;
      timeBadge.textContent = options.time;

      label.appendChild(content);
      label.appendChild(timeBadge);

      container.appendChild(pin);
      container.appendChild(label);
      this.container = container;

      this.getPanes()?.overlayMouseTarget.appendChild(container);
    }

    draw() {
      if (!this.container) return;
      const projection = this.getProjection();
      const point = projection?.fromLatLngToDivPixel(position);
      if (!point) return;

      /**
       * Place the zero-size container so that its origin (0, 0) sits exactly
       * on the map point.  The pin's tip is at bottom:0 of the pin div, which
       * is at bottom:0 of the container — i.e. also at the map point. ✓
       */
      this.container.style.left = `${point.x}px`;
      this.container.style.top  = `${point.y}px`;
    }

    onRemove() {
      this.container?.remove();
      this.container = null;
    }
  })();
}

const getCarIcon = (): google.maps.Icon => ({
  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="14" height="14" rx="4" ry="4" fill="${SECONDARY_COLOR}" stroke="#ffffff" stroke-width="2"/>
    </svg>
  `)}`,
  scaledSize: new google.maps.Size(20, 20),
  anchor: new google.maps.Point(10, 10),
});

function AnimatedRouteMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const animatedMarkerRef = useRef<google.maps.Marker | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const overlaysRef = useRef<google.maps.OverlayView[]>([]);

  const category = useBookingStore((state) => state.category);
  const step1 = useBookingStore((state) => state.step1);
  const routeData = useBookingStore((state) => state.routeData);

  const pickupAddress = step1?.pickupAddress ?? "";
  const deliveryAddress = step1?.deliveryAddress ?? "";
  const pickupTime = formatDisplayTime(step1?.pickupTime);
  const dropOffTime = routeData?.estTime ?? "—";

  const pickupLocation = useMemo(
    () => parseAddress(pickupAddress).name || pickupAddress,
    [pickupAddress]
  );
  const dropOffLocation = useMemo(
    () => parseAddress(deliveryAddress).name || deliveryAddress,
    [deliveryAddress]
  );

  const isValidTrip =
    (category === "one-way" || category === "return-trip") &&
    pickupAddress.trim() &&
    deliveryAddress.trim();

  useEffect(() => {
    let cancelled = false;

    const clearOverlays = () => {
      overlaysRef.current.forEach((overlay) => overlay.setMap(null));
      overlaysRef.current = [];
    };

    const initMap = async () => {
      if (!isValidTrip || !mapRef.current) return;

      await loadGoogleMaps();
      if (cancelled || !window.google?.maps || !mapRef.current) return;

      clearOverlays();

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 50.8503, lng: 4.3517 },
        zoom: 11,
        disableDefaultUI: true,
        styles: MAP_STYLES,
      });
      mapInstanceRef.current = map;

      const directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        preserveViewport: true,
        polylineOptions: {
          strokeColor: SECONDARY_COLOR,
          strokeWeight: 5,
          strokeOpacity: 1,
        },
      });
      directionsRenderer.setMap(map);
      directionsRendererRef.current = directionsRenderer;

      new google.maps.DirectionsService().route(
        {
          origin: pickupAddress,
          destination: deliveryAddress,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status !== "OK" || !result || cancelled) return;

          directionsRenderer.setDirections(result);
          const route = result.routes?.[0];
          if (!route) return;

          if (route.bounds) {
            map.fitBounds(route.bounds, {
              top: 120,
              right: 80,
              bottom: 80,
              left: 80,
            });
          }

          const points: google.maps.LatLng[] = [];
          route.legs?.forEach((leg) =>
            leg.steps?.forEach((step) => step.path?.forEach((point) => points.push(point)))
          );

          const firstLeg = route.legs?.[0];
          const lastLeg = route.legs?.[route.legs.length - 1];

          if (firstLeg?.start_location) {
            const pickupOverlay = createRouteLabelOverlay(firstLeg.start_location, {
              categoryLabel: "Pick up",
              locationName: pickupLocation,
              time: pickupTime,
              accentColor: PRIMARY_COLOR,
              labelAlign: "left",
              showPlaneIcon: routeData?.isAirportSelected,
            });
            pickupOverlay.setMap(map);
            overlaysRef.current.push(pickupOverlay);
          }

          if (lastLeg?.end_location) {
            const dropOffOverlay = createRouteLabelOverlay(lastLeg.end_location, {
              categoryLabel: "Drop-off",
              locationName: dropOffLocation,
              time: dropOffTime,
              accentColor: SECONDARY_COLOR,
              labelAlign: "right",
            });
            dropOffOverlay.setMap(map);
            overlaysRef.current.push(dropOffOverlay);
          }

          if (!points.length) return;

          const animatedMarker = new google.maps.Marker({
            position: points[0],
            map,
            icon: getCarIcon(),
            zIndex: 1000,
            optimized: false,
          });

          animatedMarkerRef.current = animatedMarker;

          const animationDurationMs = 10000;
          let startedAt = 0;
          const lastIndex = points.length - 1;

          const animate = (time: number) => {
            if (cancelled || !animatedMarkerRef.current) return;
            if (!startedAt) startedAt = time;

            const progress = Math.min((time - startedAt) / animationDurationMs, 1);
            const targetIdx = Math.floor(progress * lastIndex);

            if (points[targetIdx]) {
              animatedMarkerRef.current.setPosition(points[targetIdx]);
            }

            if (progress >= 1) startedAt = time;
            animationFrameRef.current = requestAnimationFrame(animate);
          };
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      );
    };

    initMap();

    return () => {
      cancelled = true;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (animatedMarkerRef.current) animatedMarkerRef.current.setMap(null);
      if (directionsRendererRef.current) directionsRendererRef.current.setMap(null);
      clearOverlays();
      mapInstanceRef.current = null;
    };
  }, [
    isValidTrip,
    pickupAddress,
    deliveryAddress,
    pickupLocation,
    dropOffLocation,
    pickupTime,
    dropOffTime,
    routeData?.isAirportSelected,
  ]);

  if (!isValidTrip) return null;

  return (
    <div className="w-full">
      <div className="relative h-[300px] overflow-hidden rounded-none border-0 shadow-none sm:h-[420px] lg:rounded-sm lg:border lg:border-border">
        <div ref={mapRef} className="h-full w-full" />
      </div>
    </div>
  );
}

export default AnimatedRouteMap;
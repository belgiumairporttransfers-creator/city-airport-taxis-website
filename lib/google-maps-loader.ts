"use client";

let googleMapsPromise: Promise<void> | null = null;

/**
 * Ensures Google Maps is loaded.
 * In this enterprise setup, the script is loaded in the layout via next/script.
 * This utility provides a synchronization point for components to wait for the API.
 */
export function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser."));
  }

  // If already loaded, resolve immediately
  if (window.google?.maps?.places) {
    return Promise.resolve();
  }

  // If already waiting, return the existing promise
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  // Create a new promise that polls for the google object
  googleMapsPromise = new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      if (window.google?.maps?.places) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 100);

    // Safety timeout: stop checking after 15 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      if (window.google?.maps?.places) {
        resolve();
      } else {
        // We resolve anyway to allow the component to handle the missing API gracefully
        // or you can reject if you want strict error handling.
        resolve();
      }
    }, 15000);
  });

  return googleMapsPromise;
}

/**
 * Service Worker Registration Script
 * Registers service worker for PWA offline functionality
 */

(function() {
    'use strict';

    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
        // Wait for page to load
        window.addEventListener('load', () => {
            registerServiceWorker();
        });
    } else {
        console.warn('[PWA] Service Workers are not supported in this browser');
    }

    async function registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js', {
                scope: '/'
            });

            console.log('[PWA] Service Worker registered successfully:', registration.scope);

            // Check for updates periodically
            setInterval(() => {
                registration.update();
            }, 60000); // Check every minute

            // Listen for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available
                        console.log('[PWA] New service worker available');
                        showUpdateNotification();
                    } else if (newWorker.state === 'activated') {
                        console.log('[PWA] Service Worker activated');
                    }
                });
            });

            // Listen for controller change (when new SW takes control)
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('[PWA] Service Worker controller changed - reloading page');
                window.location.reload();
            });

        } catch (error) {
            console.error('[PWA] Service Worker registration failed:', error);
        }
    }

    function showUpdateNotification() {
        // Show a notification that update is available
        if (confirm('Update tersedia untuk VoxSilva! Muat ulang halaman sekarang?')) {
            window.location.reload();
        }
    }

    // Expose registration function globally if needed
    window.registerServiceWorker = registerServiceWorker;
})();


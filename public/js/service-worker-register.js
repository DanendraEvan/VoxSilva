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

            // Check for updates more frequently
            setInterval(() => {
                registration.update();
            }, 30000); // Check every 30 seconds

            // Listen for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available - auto reload
                        console.log('[PWA] New service worker available - auto reloading');
                        // Auto reload setelah 1 detik (tanpa confirm)
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else if (newWorker.state === 'activated') {
                        console.log('[PWA] Service Worker activated');
                        // Auto reload ketika service worker baru diaktifkan
                        if (navigator.serviceWorker.controller) {
                            setTimeout(() => {
                                window.location.reload();
                            }, 500);
                        }
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

    // Check for updates on page visibility change (when user switches tabs back)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && 'serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistration().then(registration => {
                if (registration) {
                    registration.update();
                }
            });
        }
    });

    // Expose registration function globally if needed
    window.registerServiceWorker = registerServiceWorker;
})();


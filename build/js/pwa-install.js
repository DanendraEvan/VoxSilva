/**
 * PWA Installer - Handles Progressive Web App installation
 * Provides native-like install experience for users
 */

class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.installButton = null;
        
        this.init();
    }

    init() {
        // Check if already installed
        this.checkInstallStatus();
        
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('[PWA] beforeinstallprompt event fired');
            
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            
            // Stash the event so it can be triggered later
            this.deferredPrompt = e;
            
            // Show install button
            this.showInstallButton();
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', (e) => {
            console.log('[PWA] App was installed');
            this.isInstalled = true;
            this.hideInstallButton();
            this.showInstalledMessage();
        });

        // Check if running as PWA
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            console.log('[PWA] Running as installed PWA');
            this.isInstalled = true;
            this.hideInstallButton();
        }

        // Register service worker
        this.registerServiceWorker().then(() => {
            // After service worker is registered, check if we should show button
            // Even if beforeinstallprompt hasn't fired yet
            setTimeout(() => {
                if (!this.isInstalled && this.deferredPrompt) {
                    this.showInstallButton();
                } else if (!this.isInstalled) {
                    // Try to show button anyway - browser might show install option
                    const button = this.getInstallButton();
                    if (button && button.id === 'pwa-install-nav-btn') {
                        button.style.display = 'flex';
                        console.log('[PWA] Install button shown (fallback - service worker ready)');
                    }
                }
            }, 2000);
        });
    }

    checkInstallStatus() {
        // Check if app is already installed
        if ('getInstalledRelatedApps' in navigator) {
            navigator.getInstalledRelatedApps().then((relatedApps) => {
                if (relatedApps && relatedApps.length > 0) {
                    this.isInstalled = true;
                    console.log('[PWA] App is already installed');
                    this.hideInstallButton();
                }
            }).catch(err => {
                console.log('[PWA] getInstalledRelatedApps not supported or error:', err);
            });
        }
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/service-worker.js');
                console.log('[PWA] Service Worker registered successfully:', registration);

                // Listen for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New update available
                            this.showUpdateAvailable();
                        }
                    });
                });

                return registration;
            } catch (error) {
                console.error('[PWA] Service Worker registration failed:', error);
                return null;
            }
        }
        return null;
    }

    getInstallButton() {
        // Check if button already exists in HTML (bottom nav button - priority)
        let button = document.getElementById('pwa-install-nav-btn');
        
        // If not found, check for dashboard card button
        if (!button) {
            button = document.getElementById('pwa-install-card-btn');
        }
        
        // If not found, check for floating button
        if (!button) {
            button = document.getElementById('pwa-install-btn');
        }
        
        // If still not found, create a floating button
        if (!button) {
            button = this.createInstallButton();
        }
        
        return button;
    }

    createInstallButton() {
        // Create floating install button as fallback
        const button = document.createElement('button');
        button.id = 'pwa-install-btn';
        button.innerHTML = `
            <i class="fas fa-download"></i>
            <span>Install App</span>
        `;
        button.className = 'pwa-install-button';
        button.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            background: linear-gradient(135deg, #31694E 0%, #2d5a44 100%);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 14px 28px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(49, 105, 78, 0.4);
            z-index: 9999;
            display: none;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            font-family: 'Inter', sans-serif;
        `;

        // Add click event
        button.addEventListener('click', () => this.installApp());

        document.body.appendChild(button);
        return button;
    }

    showInstallButton() {
        if (this.isInstalled) {
            this.hideInstallButton();
            return;
        }

        this.installButton = this.getInstallButton();
        
        if (this.installButton) {
            // Check button type to set display correctly
            if (this.installButton.id === 'pwa-install-card-btn') {
                // Dashboard card button - always visible if exists
                this.installButton.style.display = 'flex';
            } else if (this.installButton.classList.contains('nav-item') || 
                       this.installButton.classList.contains('pwa-install-nav')) {
                // Bottom nav button
                this.installButton.style.display = 'flex';
            } else {
                // Floating button
                this.installButton.style.display = 'flex';
            }
            
            // Add click listener if not already added
            if (!this.installButton.hasAttribute('data-pwa-listener')) {
                this.installButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.installApp();
                });
                this.installButton.setAttribute('data-pwa-listener', 'true');
            }
            
            console.log('[PWA] Install button shown');
        }
    }

    hideInstallButton() {
        if (this.installButton) {
            // Don't hide if it's a dashboard card button - it's part of the UI
            if (this.installButton.id === 'pwa-install-card-btn') {
                return;
            }
            
            // Hide bottom nav button or floating button
            if (this.installButton.id === 'pwa-install-nav-btn' || 
                this.installButton.id === 'pwa-install-btn') {
                this.installButton.style.display = 'none';
            }
        }
    }

    async installApp() {
        if (!this.deferredPrompt) {
            console.log('[PWA] No deferred prompt available');
            this.showManualInstallInstructions();
            return;
        }

        try {
            // Show the install prompt
            this.deferredPrompt.prompt();

            // Wait for the user to respond to the prompt
            const { outcome } = await this.deferredPrompt.userChoice;
            
            console.log(`[PWA] User response to install prompt: ${outcome}`);

            if (outcome === 'accepted') {
                console.log('[PWA] User accepted the install prompt');
                this.hideInstallButton();
            } else {
                console.log('[PWA] User dismissed the install prompt');
            }

            // Clear the deferred prompt
            this.deferredPrompt = null;
        } catch (error) {
            console.error('[PWA] Error during install:', error);
            this.showManualInstallInstructions();
        }
    }

    showManualInstallInstructions() {
        const message = '⚠️ Install Prompt Tidak Tersedia\n\n' +
            '📱 CARA INSTALL MANUAL:\n\n' +
            'CARA 1 (Paling Mudah):\n' +
            '1. Lihat address bar (baris URL di atas)\n' +
            '2. Cari ikon "Install" di kanan address bar\n' +
            '3. Klik ikon tersebut, lalu pilih "Install"\n\n' +
            'CARA 2:\n' +
            '1. Klik menu (⋮) di pojok kanan atas browser\n' +
            '2. Cari opsi "Install VoxSilva" atau "Install App"\n' +
            '3. Klik untuk install\n\n' +
            '💡 Tips:\n' +
            '• Hard refresh (Ctrl+Shift+R) untuk clear cache\n' +
            '• Kunjungi halaman beberapa kali\n' +
            '• Gunakan Chrome/Edge versi terbaru';
        
        if (typeof alert !== 'undefined') {
            alert(message);
        } else {
            console.log(message);
        }
    }

    showInstalledMessage() {
        // Show notification if function exists
        if (typeof showNotification === 'function') {
            showNotification('Aplikasi berhasil diinstall!', 'success');
        } else {
            console.log('[PWA] App installed successfully');
        }
    }

    showUpdateAvailable() {
        if (confirm('Update tersedia! Muat ulang halaman?')) {
            window.location.reload();
        }
    }

    // Static method to initialize PWA installer
    static init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                new PWAInstaller();
            });
        } else {
            new PWAInstaller();
        }
    }
}

// Auto-initialize when script loads
PWAInstaller.init();

// Export for manual initialization if needed
window.PWAInstaller = PWAInstaller;

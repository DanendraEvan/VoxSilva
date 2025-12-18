// ============================================
// MONITORING.JS - Firebase Realtime Database
// ============================================
// Single Source of Truth untuk data monitoring
// Digunakan oleh monitoring.html dan ai-chat.js

// Global state untuk data monitoring
window.monitoringData = {
    records: [],
    stats: {
        human: 0,
        nonHuman: 0,
        chainsaw: 0,
        suspicious: 0,
        movement: 0
    },
    charts: {
        human: null,
        chainsaw: null
    }
};

// ============================================
// FIREBASE INITIALIZATION
// ============================================
let app = null;
let database = null;

async function initFirebase() {
    if (app && database) {
        return { app, database };
    }

    try {
        // Import Firebase v9 Modular SDK
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const { getDatabase } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');

        // Firebase Configuration
        const firebaseConfig = {
            apiKey: "AIzaSyC9ow9fcq01nDV0StB9XmHkPvHB7lQ-Bec",
            authDomain: "vox-silva.firebaseapp.com",
            databaseURL: "https://vox-silva-default-rtdb.asia-southeast1.firebasedatabase.app/",
            projectId: "vox-silva",
            storageBucket: "vox-silva.firebasestorage.app",
            messagingSenderId: "442099079570",
            appId: "1:442099079570:web:efc1254dc393e7f591c94b",
            measurementId: "G-D6K6ZMVQBG"
        };

        // Initialize Firebase
        app = initializeApp(firebaseConfig);
        database = getDatabase(app);

        console.log('✅ Firebase initialized');
        return { app, database };
    } catch (error) {
        console.error('❌ Error initializing Firebase:', error);
        throw error;
    }
}

// ============================================
// PROCESS MONITORING DATA
// ============================================
function processMonitoringData(records) {
    const stats = {
        human: 0,
        nonHuman: 0,
        chainsaw: 0,
        suspicious: 0,
        movement: 0
    };

    // Process each record
    records.forEach(record => {
        // Count human activity
        if (record.activity === 'person' || record.cam === 'person') {
            stats.human++;
        }

        // Count non-human activity
        if (record.activity === 'non_person' || record.cam === 'non_person') {
            stats.nonHuman++;
        }

        // Count chainsaw detections (bisa dari field chainsaw atau activity === 'chainsaw')
        if ((record.chainsaw && record.chainsaw > 0) || record.activity === 'chainsaw') {
            stats.chainsaw++;
        }

        // Count suspicious activity (chainsaw atau movement detected)
        const hasChainsaw = (record.chainsaw && record.chainsaw > 0) || record.activity === 'chainsaw';
        const hasMovement = record.mpu_xyz && detectMovementFromXYZ(record.mpu_xyz);
        
        if (hasChainsaw || hasMovement) {
            stats.suspicious++;
        }

        // Detect movement from accelerometer data (mpu_xyz)
        if (record.mpu_xyz && detectMovementFromXYZ(record.mpu_xyz)) {
            stats.movement++;
        }
    });

    return stats;
}

// Helper function to detect movement from MPU XYZ data
function detectMovementFromXYZ(mpu_xyz) {
    try {
        // Parse "x,y,z" string
        const [x, y, z] = mpu_xyz.split(',').map(parseFloat);
        
        // Calculate magnitude
        const magnitude = Math.sqrt(x * x + y * y + z * z);
        
        // Threshold for movement detection (adjust as needed)
        const MOVEMENT_THRESHOLD = 0.5;
        
        return magnitude > MOVEMENT_THRESHOLD;
    } catch (error) {
        console.error('Error parsing MPU XYZ:', error);
        return false;
    }
}

// ============================================
// REALTIME LISTENER
// ============================================
async function setupRealtimeListener() {
    try {
        const { database } = await initFirebase();
        const { ref, onValue } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');

        const monitoringRef = ref(database, 'monitoring');

        // Setup realtime listener
        onValue(monitoringRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                
                // Convert object to array
                const records = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));

                // Update global state
                window.monitoringData.records = records;
                window.monitoringData.stats = processMonitoringData(records);

                console.log('🔄 Realtime update:', window.monitoringData.stats);

                // Update UI
                updateStatCards();
                updateCharts();

                // Dispatch event for other modules (like ai-chat.js)
                window.dispatchEvent(new CustomEvent('monitoringDataUpdated', {
                    detail: window.monitoringData
                }));
            } else {
                console.log('⚠️ No data found at /monitoring');
                // Reset to zero
                window.monitoringData.records = [];
                window.monitoringData.stats = {
                    human: 0,
                    nonHuman: 0,
                    chainsaw: 0,
                    suspicious: 0,
                    movement: 0
                };
                updateStatCards();
                updateCharts();
            }
        }, (error) => {
            console.error('❌ Error in realtime listener:', error);
        });

        console.log('👂 Realtime listener set up for /monitoring');
    } catch (error) {
        console.error('❌ Error setting up realtime listener:', error);
    }
}

// ============================================
// UPDATE STAT CARDS
// ============================================
function updateStatCards() {
    const stats = window.monitoringData.stats;

    // Helper function to update element
    const updateElement = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value !== null && value !== undefined ? value : 0;
        }
    };

    // Update each stat card
    updateElement('human-count', stats.human);
    updateElement('non-human-count', stats.nonHuman);
    updateElement('chainsaw-count', stats.chainsaw);
}

// ============================================
// UPDATE CHARTS
// ============================================
function updateCharts() {
    const records = window.monitoringData.records;
    const stats = window.monitoringData.stats;

    // Group data by date for charts
    const dateGroups = {};
    records.forEach(record => {
        // Get date from record (bisa dari field date atau timestamp)
        let date;
        if (record.date) {
            date = record.date;
        } else if (record.timestamp) {
            // Handle both seconds and milliseconds timestamp
            const timestamp = record.timestamp > 1000000000000 ? record.timestamp : record.timestamp * 1000;
            date = new Date(timestamp).toISOString().split('T')[0];
        } else {
            // Default to today if no date/timestamp
            date = new Date().toISOString().split('T')[0];
        }
        
        if (!dateGroups[date]) {
            dateGroups[date] = {
                human: 0,
                nonHuman: 0,
                chainsaw: 0
            };
        }

        // Count human activity
        if (record.activity === 'person' || record.cam === 'person') {
            dateGroups[date].human++;
        }
        
        // Count non-human activity
        if (record.activity === 'non_person' || record.cam === 'non_person') {
            dateGroups[date].nonHuman++;
        }
        
        // Count chainsaw (bisa dari field chainsaw atau activity === 'chainsaw')
        if ((record.chainsaw && record.chainsaw > 0) || record.activity === 'chainsaw') {
            dateGroups[date].chainsaw++;
        }
    });

    // Sort dates
    const sortedDates = Object.keys(dateGroups).sort();
    const humanData = sortedDates.map(date => dateGroups[date].human);
    const nonHumanData = sortedDates.map(date => dateGroups[date].nonHuman);
    const chainsawData = sortedDates.map(date => dateGroups[date].chainsaw);
    const dateLabels = sortedDates.map(date => {
        const d = new Date(date);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    });

    // Update Human vs Non-Human Chart
    if (window.monitoringData.charts.human) {
        window.monitoringData.charts.human.data.labels = dateLabels;
        window.monitoringData.charts.human.data.datasets[0].data = humanData;
        window.monitoringData.charts.human.data.datasets[1].data = nonHumanData;
        window.monitoringData.charts.human.update();
    }

    // Update Chainsaw Chart
    if (window.monitoringData.charts.chainsaw) {
        window.monitoringData.charts.chainsaw.data.labels = dateLabels;
        window.monitoringData.charts.chainsaw.data.datasets[0].data = chainsawData;
        window.monitoringData.charts.chainsaw.update();
    }
}

// ============================================
// INITIALIZE CHARTS
// ============================================
function initCharts() {
    // Human vs Non-Human Chart
    const humanCtx = document.getElementById('human-chart');
    if (humanCtx && !window.monitoringData.charts.human) {
        window.monitoringData.charts.human = new Chart(humanCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Aktivitas Manusia',
                        data: [],
                        backgroundColor: '#3b82f6',
                        borderColor: '#2563eb',
                        borderWidth: 2
                    },
                    {
                        label: 'Aktivitas Non-Manusia',
                        data: [],
                        backgroundColor: '#10b981',
                        borderColor: '#059669',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Chainsaw Chart
    const chainsawCtx = document.getElementById('chainsaw-chart');
    if (chainsawCtx && !window.monitoringData.charts.chainsaw) {
        window.monitoringData.charts.chainsaw = new Chart(chainsawCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Chainsaw Terdeteksi',
                    data: [],
                    backgroundColor: '#ef4444',
                    borderColor: '#dc2626',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// ============================================
// GET MONITORING SUMMARY (for AI Chat)
// ============================================
function getMonitoringSummary() {
    const stats = window.monitoringData.stats;
    const records = window.monitoringData.records;
    
    // Get today's date
    const today = new Date().toISOString().split('T')[0];
    
    // Filter today's records
    const todayRecords = records.filter(record => {
        let recordDate;
        if (record.date) {
            recordDate = record.date;
        } else if (record.timestamp) {
            const timestamp = record.timestamp > 1000000000000 ? record.timestamp : record.timestamp * 1000;
            recordDate = new Date(timestamp).toISOString().split('T')[0];
        } else {
            return false;
        }
        return recordDate === today;
    });

    // Count today's stats
    const todayStats = processMonitoringData(todayRecords);

    // Get latest chainsaw detection
    const latestChainsaw = records
        .filter(r => (r.chainsaw && r.chainsaw > 0) || r.activity === 'chainsaw')
        .sort((a, b) => {
            const timeA = a.timestamp || 0;
            const timeB = b.timestamp || 0;
            return timeB - timeA;
        })[0];

    return {
        overall: {
            human: stats.human,
            nonHuman: stats.nonHuman,
            chainsaw: stats.chainsaw,
            suspicious: stats.suspicious,
            movement: stats.movement,
            totalRecords: records.length
        },
        today: {
            human: todayStats.human,
            nonHuman: todayStats.nonHuman,
            chainsaw: todayStats.chainsaw,
            suspicious: todayStats.suspicious,
            movement: todayStats.movement,
            totalRecords: todayRecords.length
        },
        latestChainsaw: latestChainsaw ? {
            date: latestChainsaw.date || new Date(latestChainsaw.timestamp * 1000 || latestChainsaw.timestamp).toISOString().split('T')[0],
            time: latestChainsaw.timestamp ? new Date(latestChainsaw.timestamp > 1000000000000 ? latestChainsaw.timestamp : latestChainsaw.timestamp * 1000).toLocaleTimeString('id-ID') : 'N/A',
            deviceId: latestChainsaw.deviceId || 'N/A',
            count: latestChainsaw.chainsaw || 0
        } : null,
        hasChainsaw: stats.chainsaw > 0,
        hasSuspicious: stats.suspicious > 0
    };
}

// Make function available globally
window.getMonitoringSummary = getMonitoringSummary;

// ============================================
// INITIALIZE MONITORING
// ============================================
async function initMonitoring() {
    try {
        // Initialize Firebase
        await initFirebase();

        // Initialize charts
        initCharts();

        // Setup realtime listener
        await setupRealtimeListener();

        console.log('✅ Monitoring initialized');
    } catch (error) {
        console.error('❌ Error initializing monitoring:', error);
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMonitoring);
} else {
    initMonitoring();
}


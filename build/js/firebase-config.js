// /js/firebase-config.js - VERSION SCRIPT BUKAN MODULE

(function() {
    // Konfigurasi Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyC9ow9fcq01nDV0StB9XmHkPvHB7lQ-Bec",
        authDomain: "vox-silva.firebaseapp.com",
        projectId: "vox-silva",
        storageBucket: "vox-silva.firebasestorage.app",
        messagingSenderId: "442099079570",
        appId: "1:442099079570:web:efc1254dc393e7f591c94b",
        measurementId: "G-D6K6ZMVQBG",
        databaseURL: "https://vox-silva-default-rtdb.asia-southeast1.firebasedatabase.app" // Realtime Database URL dengan region yang benar
    };

    // Inisialisasi Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore(); // Firestore untuk data lainnya
    const database = firebase.database(); // Realtime Database untuk monitoring (akan menggunakan databaseURL dari config)
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    // Station and Device Management for Firestore
    const firebaseDB = {
        // ============================
        // STATION FUNCTIONS - FIRESTORE
        // ============================
        
        // Add a new station to Firestore
        async addStation(stationData) {
            try {
                const docRef = await db.collection('stations').add({
                    ...stationData,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                console.log('✅ Station added to Firestore with ID:', docRef.id);
                return docRef.id;
            } catch (error) {
                console.error('❌ Error adding station to Firestore:', error);
                throw error;
            }
        },

        // Add a device to a station in Firestore
        async addDevice(stationId, deviceData) {
            try {
                // Pastikan stationId valid
                if (!stationId) {
                    throw new Error('Station ID is required');
                }
                
                // Add to devices subcollection
                const docRef = await db.collection('stations').doc(stationId)
                    .collection('devices').add({
                        ...deviceData,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        stationId: stationId
                    });
                
                // Update station's devices count
                await db.collection('stations').doc(stationId).update({
                    deviceCount: firebase.firestore.FieldValue.increment(1),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                console.log('✅ Device added to Firestore with ID:', docRef.id);
                return docRef.id;
            } catch (error) {
                console.error('❌ Error adding device to Firestore:', error);
                throw error;
            }
        },

        // Listen for station changes in Firestore
        listenStations(callback) {
            return db.collection('stations')
                .orderBy('createdAt', 'desc')
                .onSnapshot((snapshot) => {
                    const stations = {};
                    snapshot.forEach((doc) => {
                        stations[doc.id] = {
                            id: doc.id,
                            ...doc.data()
                        };
                    });
                    callback(stations);
                }, (error) => {
                    console.error('Error listening to stations:', error);
                    callback({});
                });
        },

        // Get a single station from Firestore
        async getStation(stationId) {
            try {
                const doc = await db.collection('stations').doc(stationId).get();
                if (doc.exists) {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                }
                return null;
            } catch (error) {
                console.error('Error getting station from Firestore:', error);
                throw error;
            }
        },

        // ============================
        // DEVICE FUNCTIONS - FIRESTORE
        // ============================
        
        // Get all devices for a station
        async getDevices(stationId) {
            try {
                const snapshot = await db.collection('stations').doc(stationId)
                    .collection('devices').get();
                
                const devices = [];
                snapshot.forEach((doc) => {
                    devices.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                return devices;
            } catch (error) {
                console.error('Error getting devices:', error);
                throw error;
            }
        },

        // Get station by name
        async getStationByName(stationName) {
            try {
                const stationsSnapshot = await db.collection('stations')
                    .where('name', '==', stationName)
                    .limit(1)
                    .get();
                
                if (!stationsSnapshot.empty) {
                    const stationDoc = stationsSnapshot.docs[0];
                    return {
                        id: stationDoc.id,
                        ...stationDoc.data()
                    };
                }
                return null;
            } catch (error) {
                console.error('Error getting station by name:', error);
                throw error;
            }
        },

        // Update device status
        async updateDeviceStatus(stationId, deviceId, status) {
            try {
                await db.collection('stations').doc(stationId)
                    .collection('devices').doc(deviceId).update({
                        status: status,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                return true;
            } catch (error) {
                console.error('Error updating device status:', error);
                throw error;
            }
        },

        // ============================
        // MONITORING DATA - FIRESTORE
        // ============================
        
        // Save monitoring data
        async saveMonitoringData(deviceId, data) {
            try {
                const docRef = await db.collection('monitoring').add({
                    deviceId: deviceId,
                    ...data,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                return docRef.id;
            } catch (error) {
                console.error('Error saving monitoring data to Firestore:', error);
                throw error;
            }
        },

        // Get monitoring data for a device
        getMonitoringData(deviceId, callback) {
            return db.collection('monitoring')
                .where('deviceId', '==', deviceId)
                .orderBy('timestamp', 'desc')
                .limit(50)
                .onSnapshot((snapshot) => {
                    const data = [];
                    snapshot.forEach((doc) => {
                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    callback(data);
                });
        },

        // ============================
        // USER MANAGEMENT - FIRESTORE
        // ============================
        
        // Save user data to Firestore
        async saveUserData(userId, userData) {
            try {
                await db.collection('users').doc(userId).set({
                    ...userData,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
                return true;
            } catch (error) {
                console.error('Error saving user data to Firestore:', error);
                throw error;
            }
        },

        // Get user data
        async getUserData(userId) {
            try {
                const doc = await db.collection('users').doc(userId).get();
                if (doc.exists) {
                    return doc.data();
                }
                return null;
            } catch (error) {
                console.error('Error getting user data:', error);
                throw error;
            }
        }
    };

    // Make functions available globally
    window.firebaseApp = {
        auth,
        firestore: db, // Expose Firestore
        database: database, // Expose Realtime Database
        firebaseDB,
        
        // Authentication functions (tetap sama)
        async login(email, password) {
            try {
                const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
                
                // Log user login to Firestore
                await db.collection('user_logs').add({
                    userId: userCredential.user.uid,
                    action: 'login',
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                return { success: true, user: userCredential.user };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Google Sign-In
        async signInWithGoogle() {
            try {
                const result = await firebase.auth().signInWithPopup(googleProvider);
                const user = result.user;
                
                // Save/Update user data to Firestore
                await db.collection('users').doc(user.uid).set({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName || 'User',
                    photoURL: user.photoURL || '',
                    provider: 'google.com',
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
                
                return { success: true, user };
            } catch (error) {
                console.error('Google Sign-In Error:', error);
                return { 
                    success: false, 
                    error: error.message || 'Failed to sign in with Google' 
                };
            }
        },

        async signup(email, password, userData) {
            try {
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;
                
                // Save user data to Firestore
                await db.collection('users').doc(user.uid).set({
                    email: user.email,
                    ...userData,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                return { success: true, user };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        async logout() {
            try {
                // Log logout action
                const user = firebase.auth().currentUser;
                if (user) {
                    await db.collection('user_logs').add({
                        userId: user.uid,
                        action: 'logout',
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }
                
                await firebase.auth().signOut();
                return { success: true };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        // Check auth state
        onAuthStateChanged(callback) {
            return firebase.auth().onAuthStateChanged((user) => {
                callback(user);
            });
        }
    };

    // Initialize auth state listener
    window.firebaseApp.onAuthStateChanged((user) => {
        if (user) {
            console.log('✅ User is signed in:', user.email);
            
            // Update user's last seen (use set with merge to avoid error if doc doesn't exist)
            db.collection('users').doc(user.uid).set({
                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true }).catch(error => {
                console.warn('Warning updating user last seen:', error);
            });
        } else {
            console.log('🔴 User is signed out');
        }
    });

    // Check auth state and redirect if needed
    firebase.auth().onAuthStateChanged((user) => {
        const currentPath = window.location.pathname;
        const isLoginPage = currentPath.endsWith('login.html');
        const isIndexPage = currentPath.endsWith('index.html');
        const isRegisterPage = currentPath.endsWith('daftar.html');

        if (user) {
            if (isLoginPage || isRegisterPage) {
                window.location.href = 'dashboard.html';
            }
        } else {
            if (!isLoginPage && !isIndexPage && !isRegisterPage) {
                window.location.href = 'login.html';
            }
        }
    });

    // Make sure firebaseDB is available globally
    window.firebaseDB = firebaseDB;
    
    console.log('🔥 Firebase Firestore initialized successfully');
    console.log('🔥 Firebase Realtime Database initialized successfully');
    console.log('window.firebaseDB available');
    console.log('window.firebaseApp.database available');

    // Dispatch event when Firebase is ready
    const event = new Event('firebaseAppReady');
    window.dispatchEvent(event);

})();
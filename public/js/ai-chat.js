// ============================================
// AI-CHAT.JS - AI Chat dengan Data Realtime
// ============================================
// Membaca data dari monitoring.js (single source of truth)

// ============================================
// AI RESPONSE HANDLER
// ============================================
async function getAIResponse(userMessage) {
    // Get current monitoring data
    const summary = window.getMonitoringSummary ? window.getMonitoringSummary() : null;

    // Convert message to lowercase for easier matching
    const message = userMessage.toLowerCase().trim();

    // Check for chainsaw-related questions
    if (message.includes('chainsaw') || message.includes('gergaji')) {
        if (summary && summary.hasChainsaw) {
            const latest = summary.latestChainsaw;
            return `⚠️ **Chainsaw Terdeteksi!**\n\n` +
                   `📊 Total deteksi: ${summary.overall.chainsaw}\n` +
                   `📅 Hari ini: ${summary.today.chainsaw}\n` +
                   (latest ? `🕐 Terakhir terdeteksi: ${latest.date} pukul ${latest.time}\n` +
                            `📱 Device: ${latest.deviceId}\n` +
                            `🔢 Jumlah: ${latest.count}` : '') +
                   `\n⚠️ **Tindakan yang disarankan:**\n` +
                   `1. Segera verifikasi lokasi deteksi\n` +
                   `2. Kirim tim patroli ke area tersebut\n` +
                   `3. Periksa rekaman audio/video jika tersedia`;
        } else {
            return `✅ **Tidak ada chainsaw terdeteksi**\n\n` +
                   `Saat ini tidak ada aktivitas chainsaw yang terdeteksi di sistem monitoring. Kondisi hutan aman.`;
        }
    }

    // Check for activity-related questions
    if (message.includes('aktivitas') || message.includes('activity') || 
        message.includes('hari ini') || message.includes('today')) {
        if (summary) {
            return `📊 **Ringkasan Aktivitas Hari Ini:**\n\n` +
                   `👤 Aktivitas Manusia: ${summary.today.human}\n` +
                   `🐾 Aktivitas Non-Manusia: ${summary.today.nonHuman}\n` +
                   `🪓 Chainsaw Terdeteksi: ${summary.today.chainsaw}\n` +
                   `⚠️ Aktivitas Mencurigakan: ${summary.today.suspicious}\n` +
                   `📱 Perpindahan Device: ${summary.today.movement}\n` +
                   `\n📈 **Total Keseluruhan:**\n` +
                   `👤 Manusia: ${summary.overall.human}\n` +
                   `🐾 Non-Manusia: ${summary.overall.nonHuman}\n` +
                   `🪓 Chainsaw: ${summary.overall.chainsaw}\n` +
                   `⚠️ Mencurigakan: ${summary.overall.suspicious}\n` +
                   `📱 Perpindahan: ${summary.overall.movement}\n` +
                   `\n📋 Total Record: ${summary.overall.totalRecords}`;
        } else {
            return `⚠️ Data monitoring belum tersedia. Silakan tunggu beberapa saat.`;
        }
    }

    // Check for suspicious activity questions
    if (message.includes('mencurigakan') || message.includes('suspicious') ||
        message.includes('bahaya') || message.includes('danger')) {
        if (summary && summary.hasSuspicious) {
            return `⚠️ **Aktivitas Mencurigakan Terdeteksi!**\n\n` +
                   `📊 Total aktivitas mencurigakan: ${summary.overall.suspicious}\n` +
                   `📅 Hari ini: ${summary.today.suspicious}\n` +
                   `\n⚠️ **Kategori aktivitas mencurigakan:**\n` +
                   `- Deteksi chainsaw\n` +
                   `- Perpindahan device yang tidak biasa\n` +
                   `\n🔍 **Tindakan yang disarankan:**\n` +
                   `1. Periksa detail aktivitas di dashboard monitoring\n` +
                   `2. Verifikasi lokasi dan waktu kejadian\n` +
                   `3. Kirim tim investigasi jika diperlukan`;
        } else {
            return `✅ **Tidak ada aktivitas mencurigakan**\n\n` +
                   `Saat ini tidak ada aktivitas mencurigakan yang terdeteksi. Semua dalam kondisi normal.`;
        }
    }

    // Check for human activity questions
    if (message.includes('manusia') || message.includes('human') ||
        message.includes('orang') || message.includes('person')) {
        if (summary) {
            return `👤 **Aktivitas Manusia:**\n\n` +
                   `📊 Total: ${summary.overall.human}\n` +
                   `📅 Hari ini: ${summary.today.human}\n` +
                   `\n📈 **Perbandingan:**\n` +
                   `👤 Manusia: ${summary.overall.human}\n` +
                   `🐾 Non-Manusia: ${summary.overall.nonHuman}`;
        }
    }

    // Check for movement questions
    if (message.includes('perpindahan') || message.includes('movement') ||
        message.includes('device') || message.includes('sensor')) {
        if (summary) {
            return `📱 **Perpindahan Device:**\n\n` +
                   `📊 Total perpindahan terdeteksi: ${summary.overall.movement}\n` +
                   `📅 Hari ini: ${summary.today.movement}\n` +
                   `\n💡 **Informasi:**\n` +
                   `Perpindahan dideteksi menggunakan sensor accelerometer (MPU XYZ). ` +
                   `Jika ada perpindahan yang tidak biasa, segera periksa kondisi device.`;
        }
    }

    // Check for general status questions
    if (message.includes('kondisi') || message.includes('status') ||
        message.includes('bagaimana') || message.includes('how')) {
        if (summary) {
            const status = summary.hasChainsaw || summary.hasSuspicious ? '⚠️ PERHATIAN' : '✅ AMAN';
            return `${status} **Status Monitoring Hutan:**\n\n` +
                   `📊 **Ringkasan:**\n` +
                   `👤 Aktivitas Manusia: ${summary.overall.human}\n` +
                   `🐾 Aktivitas Non-Manusia: ${summary.overall.nonHuman}\n` +
                   `🪓 Chainsaw: ${summary.overall.chainsaw} ${summary.hasChainsaw ? '⚠️' : '✅'}\n` +
                   `⚠️ Mencurigakan: ${summary.overall.suspicious} ${summary.hasSuspicious ? '⚠️' : '✅'}\n` +
                   `📱 Perpindahan: ${summary.overall.movement}\n` +
                   `\n${summary.hasChainsaw || summary.hasSuspicious ? 
                       '⚠️ **Ada aktivitas yang memerlukan perhatian!** Silakan periksa detail di dashboard.' :
                       '✅ **Semua dalam kondisi normal.** Tidak ada aktivitas mencurigakan.'}`;
        }
    }

    // Default response
    return `Saya adalah AI Assistant untuk monitoring hutan VoxSilva.\n\n` +
           `Saya dapat membantu Anda dengan:\n` +
           `• Informasi tentang aktivitas chainsaw\n` +
           `• Ringkasan aktivitas hari ini\n` +
           `• Status aktivitas mencurigakan\n` +
           `• Informasi perpindahan device\n` +
           `• Kondisi umum monitoring\n\n` +
           `Coba tanyakan:\n` +
           `- "Apakah ada chainsaw?"\n` +
           `- "Aktivitas hari ini?"\n` +
           `- "Bagaimana kondisinya?"\n` +
           `- "Ada aktivitas mencurigakan?"`;
}

// ============================================
// INTEGRATION WITH EXISTING CHAT
// ============================================
// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', integrateWithChat);
} else {
    integrateWithChat();
}

function integrateWithChat() {
    // Don't override sendMessage - let chat.html handle it
    // Instead, enhance the Gemini prompt with monitoring data when available
    
    // Store original askGemini if it exists
    const originalAskGemini = window.askGemini;
    
    // Enhance Gemini responses with monitoring data
    if (typeof window.askGemini === 'function') {
        const enhancedAskGemini = async (userPrompt) => {
            try {
                // Get monitoring data if available
                const summary = window.getMonitoringSummary ? window.getMonitoringSummary() : null;
                
                // Enhance prompt with monitoring context if available
                let enhancedPrompt = userPrompt;
                if (summary) {
                    enhancedPrompt = `${userPrompt}\n\n[Context: Current monitoring data - Human: ${summary.overall.human}, Non-human: ${summary.overall.nonHuman}, Chainsaw: ${summary.overall.chainsaw}, Suspicious: ${summary.overall.suspicious}]`;
                }
                
                // Use original Gemini function
                if (originalAskGemini) {
                    return await originalAskGemini(enhancedPrompt);
                } else if (window.askGemini) {
                    return await window.askGemini(enhancedPrompt);
                }
            } catch (error) {
                console.error('Error in enhanced AI chat:', error);
                throw error;
            }
        };
        
        // Only enhance if original exists
        if (originalAskGemini) {
            window.askGemini = enhancedAskGemini;
        }
    }
    
    console.log('✅ AI Chat integrated with monitoring data (non-intrusive)');
}

// Make getAIResponse available globally
window.getAIResponse = getAIResponse;

// Listen for monitoring data updates
window.addEventListener('monitoringDataUpdated', () => {
    console.log('📊 Monitoring data updated, AI chat ready');
});

console.log('✅ AI Chat initialized with monitoring data integration');


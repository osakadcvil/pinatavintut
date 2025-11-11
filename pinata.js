// --- Logika Piñata dan Hujan Permen ---

const pinataContainer = document.getElementById('pinataContainer');
const statusMessage = document.getElementById('status-message');
const dropContainer = document.getElementById('drop-container');
const crackOverlay = document.getElementById('crackOverlay');
const finalMessageModal = document.getElementById('final-message-modal');

// Variabel status
let clickCount = 0;
let isDropping = false;
let dropInterval;

// Palet warna untuk permen (festif)
const candyColors = ['#ff6f69', '#ffcc5c', '#88d8b0', '#6b5b95', '#e0b7ff'];
const itemTypes = ['candy', 'coin', 'mini-cake'];

/**
 * Fungsi untuk meng-handle klik pada Piñata.
 */
function hitPinata() {
    // Abaikan klik jika sudah dalam status burst
    if (pinataContainer.classList.contains('burst')) {
        return;
    }
    
    clickCount++;

    if (clickCount === 1) {
        // Status 1: Piñata Retak
        pinataContainer.classList.add('cracked');
        statusMessage.textContent = "HAMPIR! Klik sekali lagi untuk mengeluarkan isinya!";
        
    } else if (clickCount >= 2) {
        // Status 2: Piñata Pecah & Hujan Permen Dimulai
        
        // Hapus kelas cracked dan tambahkan kelas burst (untuk menghilang)
        pinataContainer.classList.remove('cracked');
        pinataContainer.classList.add('burst');
        
        // Sembunyikan petunjuk klik
        pinataContainer.querySelector('.click-hint').style.opacity = '0';

        // Tampilkan modal pesan akhir
        finalMessageModal.classList.remove('hidden');
        
        statusMessage.textContent = "LIHAT! Kejutan Ulang Tahun Berjatuhan! 🥳";

        // Mulai hujan permen
        if (!isDropping) {
            startDrop();
        }
    }
}

/**
 * Fungsi untuk menghasilkan item yang jatuh (permen, kue, koin).
 */
function createFallingItem() {
    const item = document.createElement('div');
    const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];

    item.classList.add('falling-item');

    // Tentukan posisi X awal secara acak (dari mana item akan jatuh)
    const xStart = Math.random() * window.innerWidth; 
    item.style.left = `${xStart}px`;

    // Tentukan perpindahan X total (untuk variasi pergerakan)
    const xDrop = (Math.random() * 200) - 100; // -100px hingga 100px
    item.style.setProperty('--x', `${xDrop}px`);

    // Tentukan durasi jatuhan
    const duration = (Math.random() * 3) + 4; // 4s hingga 7s

    item.style.animation = `drop ${duration}s linear forwards`;
    item.style.animationDelay = `${Math.random() * 0.5}s`;
    
    // Terapkan gaya berdasarkan jenis item
    if (type === 'candy') {
        const color = candyColors[Math.floor(Math.random() * candyColors.length)];
        item.style.backgroundColor = color;
        item.style.borderRadius = '50%';
    } else if (type === 'coin') {
        item.style.backgroundColor = '#FFD700'; // Emas
        item.style.borderRadius = '50%';
        item.style.width = '12px';
        item.style.height = '12px';
        item.style.boxShadow = '0 0 5px rgba(255, 255, 0, 0.8)';
    } else if (type === 'mini-cake') {
        item.classList.add('mini-cake');
        // mini-cake styling is mostly in CSS
    }

    dropContainer.appendChild(item);

    // Hapus item setelah jatuh keluar dari layar
    setTimeout(() => {
        item.remove();
    }, duration * 1000);
}

/**
 * Mulai interval untuk menghasilkan hujan permen secara terus menerus.
 */
function startDrop() {
    isDropping = true;
    
    // Hujan deras di awal (burst)
    for (let i = 0; i < 50; i++) {
        createFallingItem();
    }
    
    // Lanjutkan hujan secara berkala
    dropInterval = setInterval(() => {
        // Hasilkan beberapa item setiap 100ms
        for (let i = 0; i < 5; i++) {
            createFallingItem();
        }
    }, 100);
}

/**
 * Tutup modal pesan akhir.
 */
function closeModal() {
    finalMessageModal.classList.add('hidden');
}

// Tambahkan closeModal ke global scope agar bisa diakses dari HTML
window.closeModal = closeModal;
window.hitPinata = hitPinata;

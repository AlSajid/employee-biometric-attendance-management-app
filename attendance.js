const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
    name: 'Biometric Attendance System',
    description: 'Biometric Attendance System',
    script: 'service.js',
});

svc.on('install', function () {
    svc.start();
});

svc.install();

// --- to install ---
// npm run build
// npm i -g node-windows
// npm i next
// node attendance.js

// --- to uninstall ---
//sc delete biometricattendancesystem
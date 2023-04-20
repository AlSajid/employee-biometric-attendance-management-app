var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name: 'Biometric Attendance System',
    description: 'Biometric Attendance System',
    script: 'D:\\projects\\biometric-attendance\\service.js',
});

svc.on('install', function () {
    svc.start();
});

svc.install();

// run node attendance.js to install the service
import ZKLib from './node_zklib/zklib.js';

export default async function connect(ips) {
    const connected = []

    for (let index = 0; index < ips.length; index++) {
        const ip = ips[index];

        var zkInstance = new ZKLib(ip, 4370, 1000, 4000, 0);

        const checkConnection = async () => {
            try {
                const socket = await zkInstance.createSocket()
                if (socket == "success") {
                    connected.push(ip)
                }
            }
            catch (e) {
                // console.log("Connection error", e);
            }
        }

        // Call the function and set a timeout
        const timer = setTimeout(() => {
            console.error('Operation timed out');
            // Execute the catch block if the operation timed out
            checkConnection.catch((err) => {
                console.error('An error occurred during catch:', err);
            });
        }, 1000);

        // Call the function and clear the timeout when it completes
        checkConnection().then(() => {
            clearTimeout(timer);
        }).catch((err) => {
            console.error('An error occurred:', err);
        });
    }

    return { connected, zkInstance };
}

